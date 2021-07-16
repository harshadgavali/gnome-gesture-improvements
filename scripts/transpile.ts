// import * as acorn from 'acorn';
import * as fs from 'fs';
import glob from 'glob';
import path from 'path';
// import { BlockList } from 'net';
import ts from 'typescript';

const GIReplacements: Record<string, string> = {
	'@gi-types/gtk': 'Gtk',
	'@gi-types/st': 'St',
	'@gi-types/clutter': 'Clutter',
	'@gi-types/gobject': 'GObject',
	'@gi-types/glib': 'GLib',
	'@gi-types/gio': 'Gio',
	'@gi-types/shell': 'Shell',
	'@gi-types/meta': 'Meta'
};

function createAccessExpressionFor(context: ts.TransformationContext, access: string) {
	const ids = access.split('.').filter(a => a.length > 0);
	if (ids.length === 0) {
		throw new Error(`can't create access expression for ${access}`);
	}

	let expression: ts.Expression = context.factory.createIdentifier(ids[0]);
	ids.slice(1).forEach(id => {
		expression = context.factory.createPropertyAccessExpression(
			expression,
			context.factory.createIdentifier(id)
		);
	});

	return expression;
}

function createVariableDeclaration(context: ts.TransformationContext, name: string | ts.Identifier | ts.BindingName, initializer: ts.Expression | undefined): ts.VariableDeclaration {
	return context.factory.createVariableDeclaration(
		name,
		undefined,
		undefined,
		initializer
	);
}

function createVariableStatement(
	context: ts.TransformationContext,
	name: string | ts.Identifier | ts.BindingName,
	initializer?: ts.Expression,
	flags?: ts.NodeFlags
): ts.VariableStatement {
	return context.factory.createVariableStatement(
		[],
		context.factory.createVariableDeclarationList(
			[createVariableDeclaration(context, name, initializer)],
			flags
		)
	);
}

function moveComments<T extends ts.Node>(node: T, originalNode: ts.Node): T {
	node = ts.setSyntheticLeadingComments(node, ts.getSyntheticLeadingComments(originalNode));
	node = ts.setSyntheticTrailingComments(node, ts.getSyntheticTrailingComments(originalNode));
	return ts.setCommentRange(node, ts.getCommentRange(originalNode));
}

const printer: ts.Printer = ts.createPrinter({ removeComments: false });

const transformExports: ts.TransformerFactory<ts.SourceFile> = context => {
	const tranformFunction = (node: ts.FunctionDeclaration, variables: string[]): ts.FunctionDeclaration => {
		if (!node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
			return node;
		}

		variables.push(node.name?.text || '');
		return moveComments(
			context.factory.createFunctionDeclaration(
				node.decorators,
				node.modifiers.filter(m => m.kind !== ts.SyntaxKind.ExportKeyword),
				node.asteriskToken,
				node.name,
				node.typeParameters,
				node.parameters,
				node.type,
				node.body || context.factory.createBlock([])
			),
			node
		);
	};

	const transformClass = (node: ts.ClassDeclaration, variables: string[]): ts.ClassDeclaration | ts.VariableStatement => {
		if (!node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
			return node;
		}

		variables.push(node.name?.text || '');
		return moveComments(
			createVariableStatement(context,
				node.name?.text || '',
				context.factory.createClassExpression(
					node.decorators,
					node.modifiers.filter(m => m.kind !== ts.SyntaxKind.ExportKeyword),
					node.name,
					node.typeParameters,
					node.heritageClauses,
					node.members
				)
			),
			node
		);
	};

	const tranformVariable = (node: ts.VariableStatement, variables: string[]): ts.VariableStatement => {
		if (!node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
			return node;
		}

		return context.factory.createVariableStatement([],
			node.declarationList.declarations.map(d => {
				if (d.name.kind == ts.SyntaxKind.Identifier) {
					variables.push((d.name as ts.Identifier).text);
				}
				return moveComments(createVariableDeclaration(context, d.name, d.initializer), d);
			})
		);
	};

	return sourceFile => {
		const variables: string[] = [];
		const visitor = (node: ts.Node): ts.Node => {
			switch (node.kind) {
			case ts.SyntaxKind.ClassDeclaration:
				return transformClass(node as ts.ClassDeclaration, variables);
			case ts.SyntaxKind.FunctionDeclaration:
				return tranformFunction(node as ts.FunctionDeclaration, variables);
			case ts.SyntaxKind.VariableStatement:
				return tranformVariable(node as ts.VariableStatement, variables);
			default:
				return node;
			}
		};
		const modifiedSourceFile = ts.visitEachChild(sourceFile, visitor, context);
		if (variables.length && modifiedSourceFile.statements.length) {

			ts.addSyntheticLeadingComment(
				modifiedSourceFile.statements[0],
				ts.SyntaxKind.MultiLineCommentTrivia,
				` exported ${variables.join(', ')} `,
				true
			);
		}

		return moveComments(modifiedSourceFile, sourceFile);
	};
};

// local, gi and shell imports
const transformImports: ts.TransformerFactory<ts.SourceFile> = context => {

	const transformImport = (
		node: ts.ImportDeclaration,
		getModuleReplacement: (module: string) => {
			statement?: ts.VariableStatement,
			module: ts.Expression
		} | null
	): ts.ImportDeclaration | ts.VariableStatement[] | ts.EmptyStatement => {

		const module = node.moduleSpecifier as ts.StringLiteral;
		if (module.text === 'gnome-shell') {
			return moveComments(context.factory.createEmptyStatement(), node);
		}
		const replacement = getModuleReplacement(module.text);

		if (!replacement) {
			return node;
		}

		const statements: ts.VariableStatement[] = [];
		if (replacement.statement) {
			statements.push(replacement.statement);
		}

		if (node.importClause?.name) {
			statements.push(createVariableStatement(context,
				node.importClause.name.text,
				replacement.module,
				ts.NodeFlags.Const
			));
		}

		node.importClause?.namedBindings?.forEachChild(binding => {
			if (binding.kind !== ts.SyntaxKind.Identifier) {
				return;
			}
			const node = binding as ts.Identifier;
			statements.push(createVariableStatement(context,
				node.text,
				replacement.module,
				ts.NodeFlags.Const
			));
		});

		const namedBindings: string[] = [];

		node.importClause?.namedBindings?.forEachChild(binding => {
			if (binding.kind === ts.SyntaxKind.ImportSpecifier) {
				const node = binding as ts.ImportSpecifier;
				namedBindings.push(node.name.text);
			}
		});

		if (namedBindings.length) {
			const bindingName = context.factory.createObjectBindingPattern(
				namedBindings.map(name => {
					return context.factory.createBindingElement(
						undefined,
						undefined,
						name,
						undefined
					);
				})
			);
			statements.push(createVariableStatement(context,
				bindingName,
				replacement.module,
				ts.NodeFlags.Const
			));
		}

		if (statements.length) {
			moveComments(statements[0], node);
			return statements;
		}

		return node;
	};

	return sourceFile => {
		let addedMeStatement = false;
		const getModuleReplacement = (module: string): { statement?: ts.VariableStatement, module: ts.Expression } | null => {
			if (GIReplacements[module]) {
				return { module: createAccessExpressionFor(context, `imports.gi.${GIReplacements[module]}`) };
			}
			if (module.startsWith('.')) {
				let statement: ts.VariableStatement | undefined = undefined;
				if (!addedMeStatement) {
					addedMeStatement = true;
					//const Me = imports.misc.extensionUtils.getCurrentExtension();
					statement = createVariableStatement(context,
						'Me',
						context.factory.createCallExpression(
							createAccessExpressionFor(context, 'imports.misc.extensionUtils.getCurrentExtension'),
							[], []
						),
						ts.NodeFlags.Const
					);
				}

				module = path.join(path.dirname(sourceFile.fileName), module);
				module = path.relative('build/src', module);

				const moduleStrings = module.split('/').filter(m => m.length > 0);
				if (!moduleStrings.length) {
					throw new Error(`unable to resolve ${module}`);
				}

				return {
					statement,
					module: createAccessExpressionFor(context, `Me.imports.${moduleStrings.join('.')}`)
				};
			}

			return null;
		};
		const visitor = (node: ts.Node): ts.Node | ts.Node[] => {
			if (node.kind !== ts.SyntaxKind.ImportDeclaration) {
				return node;
			}

			return transformImport(node as ts.ImportDeclaration, getModuleReplacement);
		};

		return moveComments(ts.visitEachChild(sourceFile, visitor, context), sourceFile);
	};
};

const transformGObjectClasses: ts.TransformerFactory<ts.SourceFile> = context => {
	const replaceSuperCall = (node: ts.Node): ts.Node => {
		if (node.kind === ts.SyntaxKind.CallExpression) {
			const callNode = node as ts.CallExpression;
			if (callNode.expression.kind === ts.SyntaxKind.SuperKeyword) {
				return moveComments(
					context.factory.createCallExpression(
						context.factory.createPropertyAccessExpression(
							context.factory.createIdentifier('super'),
							context.factory.createIdentifier('_init')
						),
						callNode.typeArguments,
						callNode.arguments
					),
					node
				);
			}
		}
		return moveComments(ts.visitEachChild(node, replaceSuperCall, context), node);
	};

	const transformConstructor = (node: ts.Node): ts.Node => {
		if (node.kind === ts.SyntaxKind.Constructor) {
			const constructorNode = node as ts.ConstructorDeclaration;

			return moveComments(
				context.factory.createMethodDeclaration(
					constructorNode.decorators,
					constructorNode.modifiers,
					constructorNode.asteriskToken,
					'_init',
					constructorNode.questionToken,
					constructorNode.typeParameters,
					constructorNode.parameters,
					constructorNode.type,
					ts.visitEachChild(constructorNode.body, replaceSuperCall, context)
				),
				node
			);
		}
		return node;
	};

	return sourceFile => {
		const visitor = (node: ts.Node): ts.Node => {
			if (node.kind === ts.SyntaxKind.CallExpression) {
				const callNode = node as ts.CallExpression;

				if (callNode.expression.kind === ts.SyntaxKind.Identifier) {
					// registerClass()
					if ((callNode.expression as ts.Identifier).text !== 'registerClass')
						return node;
				}
				else if (callNode.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
					// GObject.registerClass()
					const id = callNode.expression as ts.PropertyAccessExpression;
					if (id.expression.kind !== ts.SyntaxKind.Identifier || id.name.kind !== ts.SyntaxKind.Identifier) return node;
					if ((id.name as ts.Identifier).text !== 'registerClass')
						return node;
				}
				else return node;

				// second argument is class expression
				if (callNode.arguments.length === 2 && callNode.arguments[1].kind === ts.SyntaxKind.ClassExpression) {
					return moveComments(
						context.factory.createCallExpression(
							callNode.expression,
							callNode.typeArguments,
							[
								callNode.arguments[0],
								moveComments(ts.visitEachChild(callNode.arguments[1], transformConstructor, context), callNode.arguments[1])
							]
						),
						node
					);
				}
				if (callNode.arguments.length === 1 && callNode.arguments[0].kind === ts.SyntaxKind.ClassExpression) {
					return moveComments(
						context.factory.createCallExpression(
							callNode.expression,
							callNode.typeArguments,
							[
								moveComments(ts.visitEachChild(callNode.arguments[0], transformConstructor, context), callNode.arguments[0])
							]
						),
						node
					);
				}
				return node;
			}
			return moveComments(ts.visitEachChild(node, visitor, context), node);
		};

		return moveComments(ts.visitEachChild(sourceFile, visitor, context), sourceFile);
	};
};

const matches = new glob.GlobSync('build/src/**/*.js');
matches.found.forEach(file => {
	console.log(file);

	const text = fs.readFileSync(file).toString();
	let sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.ES2018, true, ts.ScriptKind.JS);
	sourceFile = ts.transform(sourceFile, [transformExports, transformImports, transformGObjectClasses]).transformed[0];
	fs.writeFileSync(file, printer.printFile(sourceFile));
});