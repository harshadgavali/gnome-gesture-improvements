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

const printer: ts.Printer = ts.createPrinter({ removeComments: false });

const transformExports: ts.TransformerFactory<ts.SourceFile> = context => {
	const tranformFunction = (node: ts.FunctionDeclaration, variables: string[]): ts.FunctionDeclaration | ts.VariableStatement => {
		if (!node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
			return node;
		}

		variables.push(node.name?.text || '');
		return createVariableStatement(context,
			node.name?.text || '',
			context.factory.createFunctionExpression(
				node.modifiers.filter(m => m.kind !== ts.SyntaxKind.ExportKeyword),
				node.asteriskToken,
				node.name,
				node.typeParameters,
				node.parameters,
				node.type,
				node.body || context.factory.createBlock([])
			),
		);
	};

	const transformClass = (node: ts.ClassDeclaration, variables: string[]): ts.ClassDeclaration | ts.VariableStatement => {
		if (!node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
			return node;
		}

		variables.push(node.name?.text || '');
		return createVariableStatement(context,
			node.name?.text || '',
			context.factory.createClassExpression(
				node.decorators,
				node.modifiers.filter(m => m.kind !== ts.SyntaxKind.ExportKeyword),
				node.name,
				node.typeParameters,
				node.heritageClauses,
				node.members
			)
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
				return createVariableDeclaration(context, d.name, d.initializer);
			})
		);
	};

	return sourceFile => {
		const variables: string[] = [];
		const visitor = (node: ts.Node): ts.Node => {
			// console.log(node.kind, `\t# ${ts.SyntaxKind[node.kind]}`);

			let varNode: ts.Node;
			switch (node.kind) {
			case ts.SyntaxKind.ClassDeclaration:
				varNode = transformClass(node as ts.ClassDeclaration, variables);
				// console.log(printer.printNode(ts.EmitHint.Unspecified, varNode, sourceFile));
				return varNode;
			case ts.SyntaxKind.FunctionDeclaration:
				varNode = tranformFunction(node as ts.FunctionDeclaration, variables);
				// console.log(printer.printNode(ts.EmitHint.Unspecified, varNode, sourceFile));
				return varNode;
			case ts.SyntaxKind.VariableStatement:
				varNode = tranformVariable(node as ts.VariableStatement, variables);
				// console.log(printer.printNode(ts.EmitHint.Unspecified, varNode, sourceFile));
				return varNode;
			}

			return node;
		};
		sourceFile = ts.visitEachChild(sourceFile, visitor, context);

		if (variables.length) {
			ts.addSyntheticLeadingComment(
				sourceFile,
				ts.SyntaxKind.MultiLineCommentTrivia,
				`exported ${variables.join(',')}`,
				true
			);
		}
		return sourceFile;
	};
};

// local, gi and shell imports
const transformImports: ts.TransformerFactory<ts.SourceFile> = context => {

	const transformImport = (node: ts.ImportDeclaration, getModuleReplacement: (module: string) => { statement?: ts.VariableStatement, module: ts.Expression } | null): ts.ImportDeclaration | ts.VariableStatement[] => {
		const module = node.moduleSpecifier as ts.StringLiteral;
		if (module.text === 'gnome-shell') {
			return [];
		}
		const replacement = getModuleReplacement(module.text);

		if (!replacement) {
			return node;
		}
		// module.flags
		const statements: ts.VariableStatement[] = [];
		if (replacement.statement) {
			statements.push(replacement.statement);
		}

		// console.log(node.importClause);

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

		return statements;
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
		return ts.visitEachChild(sourceFile, visitor, context);
	};
};

const transformGObjectClasses: ts.TransformerFactory<ts.SourceFile> = context => {
	const replaceSuperCall = (node: ts.Node): ts.Node => {
		if (node.kind === ts.SyntaxKind.CallExpression) {
			const callNode = node as ts.CallExpression;
			if (callNode.expression.kind === ts.SyntaxKind.SuperKeyword) {
				return context.factory.createCallExpression(
					context.factory.createPropertyAccessExpression(
						context.factory.createIdentifier('super'),
						context.factory.createIdentifier('_init')
					),
					callNode.typeArguments,
					callNode.arguments
				);
			}
		}
		return ts.visitEachChild(node, replaceSuperCall, context);
	};

	const transformConstructor = (node: ts.Node): ts.Node => {
		if (node.kind === ts.SyntaxKind.Constructor) {
			const constructorNode = node as ts.ConstructorDeclaration;

			return context.factory.createMethodDeclaration(
				constructorNode.decorators,
				constructorNode.modifiers,
				constructorNode.asteriskToken,
				'_init',
				constructorNode.questionToken,
				constructorNode.typeParameters,
				constructorNode.parameters,
				constructorNode.type,
				ts.visitEachChild(constructorNode.body, replaceSuperCall, context)
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
					// console.log(`id kind: ${ts.SyntaxKind[id.expression.kind]}`);
					if (id.expression.kind !== ts.SyntaxKind.Identifier || id.name.kind !== ts.SyntaxKind.Identifier) return node;
					if ((id.name as ts.Identifier).text !== 'registerClass')
						return node;
				}
				else return node;

				// console.log(`tranform classes, registerClass(${callNode.arguments.map(a => ts.SyntaxKind[a.kind]).join(', ')})`);
				
				// second argument is class expression
				if (callNode.arguments.length === 2 && callNode.arguments[1].kind === ts.SyntaxKind.ClassExpression) {
					return context.factory.createCallExpression(
						callNode.expression,
						callNode.typeArguments,
						[
							callNode.arguments[0],
							ts.visitEachChild(callNode.arguments[1], transformConstructor, context)
						]
					);
				}
				if (callNode.arguments.length === 1 && callNode.arguments[0].kind === ts.SyntaxKind.ClassExpression) {
					// console.log('calling transformConstructor');
					
					return context.factory.createCallExpression(
						callNode.expression,
						callNode.typeArguments,
						[
							ts.visitEachChild(callNode.arguments[0], transformConstructor, context)
						]
					);
				}
				
				return node;
			}
			return ts.visitEachChild(node, visitor, context);
		};

		return ts.visitEachChild(sourceFile, visitor, context);
	};
};

const matches = new glob.GlobSync('build/src/**/*.js');
matches.found.forEach(file => {
	// console.log(file);

	const text = fs.readFileSync(file).toString();
	const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.ES2018);
	// const sourceFile = program.getSourceFile(file);
	// sourceFile?.forEachChild(node => {
	//     console.log(ts.SyntaxKind[node.kind]);
	//     if (node.kind === ts.SyntaxKind.ClassDeclaration) {
	//         const classNode = node as ts.ClassDeclaration;
	//         const exportMod = classNode.modifiers?.filter(mod => mod.kind === ts.SyntaxKind.ExportKeyword);
	//         if (exportMod) {
	//             console.log(printer.printNode(ts.EmitHint.Unspecified, node, sourceFile));
	//         }
	//     }
	// })

	const result = ts.transform(sourceFile,
		[transformExports, transformImports, transformGObjectClasses],
		{
			removeComments: false
		});
	// result.transformed[0]

	// console.log(result.transformed.length);
	fs.writeFileSync(file, printer.printFile(result.transformed[0]));
	// console.log(printer.printFile(result.transformed[0]));
	// console.log(result.transformed[0].text);

	// console.log();

});