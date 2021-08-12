import * as fs from 'fs';
import glob from 'glob';
import path from 'path';
import ts from 'typescript';

const BASEDIR = 'build/extension';
const ISEXTENSION = true; // is your code for extension?

// list of gi modules and their name in imports.gi
const GIReplacements: Record<string, string> = {
	'@gi-types/gtk': 'Gtk',
	'@gi-types/st': 'St',
	'@gi-types/clutter': 'Clutter',
	'@gi-types/gobject': 'GObject',
	'@gi-types/glib': 'GLib',
	'@gi-types/gio': 'Gio',
	'@gi-types/shell': 'Shell',
	'@gi-types/meta': 'Meta',
};

/**
 * Create Property access expression for code string
 * @param context
 * @param access javascript code for which to create expression
 * @returns
 *
 * e.g., createAccessExpressionFor(context, 'obj.property')
 */
function createAccessExpressionFor(context: ts.TransformationContext, access: string): ts.Expression {
	const ids = access.split('.').filter(a => a.length > 0);
	if (ids.length === 0) {
		throw new Error(`can't create access expression for ${access}`);
	}

	let expression: ts.Expression = context.factory.createIdentifier(ids[0]);
	ids.slice(1).forEach(id => {
		expression = context.factory.createPropertyAccessExpression(
			expression,
			context.factory.createIdentifier(id),
		);
	});

	return expression;
}

/**
 * Create variable declaration expression
 * @param context
 * @param name name of variable
 * @param initializer variable initizlizer expression
 * @returns
 */
function createVariableDeclaration(
	context: ts.TransformationContext,
	name: string | ts.Identifier | ts.BindingName,
	initializer: ts.Expression | undefined,
): ts.VariableDeclaration {
	return context.factory.createVariableDeclaration(
		name,
		undefined,
		undefined,
		initializer,
	);
}

/**
 * Create variable declaration statement
 * @param context
 * @param name name of variable
 * @param initializer variable initizlizer expression
 * @param flags flags, e.g. ts.NodeFlags.Const
 * @returns
 */
function createVariableStatement(
	context: ts.TransformationContext,
	name: string | ts.Identifier | ts.BindingName,
	initializer?: ts.Expression,
	flags?: ts.NodeFlags,
): ts.VariableStatement {
	return context.factory.createVariableStatement(
		[],
		context.factory.createVariableDeclarationList(
			[createVariableDeclaration(context, name, initializer)],
			flags,
		),
	);
}

/**
 * Move all comments to node
 * @param node target node to move comments to
 * @param originalNode original node
 * @returns target node
 */
function moveComments<T extends ts.Node>(node: T, originalNode: ts.Node): T {
	if (node === undefined || originalNode === undefined) {
		return node;
	}
	node = ts.setSyntheticLeadingComments(node, ts.getSyntheticLeadingComments(originalNode));
	node = ts.setSyntheticTrailingComments(node, ts.getSyntheticTrailingComments(originalNode));
	return ts.setCommentRange(node, ts.getCommentRange(originalNode));
}

// printer to print code
const printer: ts.Printer = ts.createPrinter({ removeComments: false });

/**
 * typescript transformer to transform exports
 * @param context
 * @returns transformation function
 *
 * transformation function
 * 1. Removes 'export' modifier from function
 * 2. Convert exported ClassDeclaration into variable statement.
 * 	e.g., 'export class A {}' => 'var A = class A{};'
 * 3. Convert exported variables into 'var'
 * 	e.g., 'export const ABC = 8;' => 'var ABC = 8;'
 */
const transformExports: ts.TransformerFactory<ts.SourceFile> = context => {
	/* Remove 'export' modifier from function declaration */
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
				node.body || context.factory.createBlock([]),
			),
			node,
		);
	};

	/* convert exported class declaration to variable statement */
	const transformClass = (node: ts.ClassDeclaration, variables: string[]): ts.ClassDeclaration | ts.VariableStatement => {
		if (!node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
			return node;
		}

		variables.push(node.name?.text || '');
		return moveComments(
			createVariableStatement(
				context,
				node.name?.text || '',
				context.factory.createClassExpression(
					node.decorators,
					node.modifiers.filter(m => m.kind !== ts.SyntaxKind.ExportKeyword),
					node.name,
					node.typeParameters,
					node.heritageClauses,
					node.members,
				),
			),
			node,
		);
	};

	/* make all exported variables 'var' type */
	const tranformVariable = (node: ts.VariableStatement, variables: string[]): ts.VariableStatement => {
		if (!node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
			return node;
		}

		return moveComments(
			context.factory.createVariableStatement(
				[],
				node.declarationList.declarations.map(d => {
					if (d.name.kind == ts.SyntaxKind.Identifier) {
						variables.push((d.name as ts.Identifier).text);
					}
					return moveComments(createVariableDeclaration(context, d.name, d.initializer), d);
				}),
			),
			node,
		);
	};

	/* transformation function */
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
		// Add /* exported var1,var2 */ comment to before first statement
		if (variables.length && modifiedSourceFile.statements.length) {
			ts.addSyntheticLeadingComment(
				modifiedSourceFile.statements[0],
				ts.SyntaxKind.MultiLineCommentTrivia,
				` exported ${variables.join(', ')} `,
				true,
			);
		}

		return moveComments(modifiedSourceFile, sourceFile);
	};
};

/**
 * typescript transformer to transform exports
 * @param context
 * @returns transformation function
 *
 * transformation function
 * 1. replaces @gi-types/* modules into imports.gi
 * 	e.g., "import St from '@gi-types/st';" => "const St = imports.gi.St;"
 * 2. Removes "import ... from 'gnome-shell'" statement.
 * 3. replaces local imports with statement compatible with extensions
 * 	e.g., in extension.js (top level)
 * 		"import { Indicator } from './indicator';" => "const { Indicator } = Me.imports.indicator;"
 * 		and it ensures "const Me = imports.misc.extensionUtils.getCurrentExtension();" is added before above statement.
 *
 */
const transformImports: ts.TransformerFactory<ts.SourceFile> = context => {

	/**
	 * Actual transformation function
	 * @param node ImportDeclaration node
	 * @param getModuleReplacement function which returns object with module expression and "const Me ...." statement is necessary
	 * 			e.g., getModuleReplacement('@gi-types/clutter') => {statement: undefined, module: Expression('imports.gi.Clutter')}
	 * 			e.g., getModuleReplacement('@gi-types/gobject') => {statement: Expression('const Me = ...'), module: Expression('imports.gi.GObject')}
	 * @returns returns either	throws when import declaration doesn't fit into above categories
	 * 							or returns list of variable statements or empty statement
	 */
	const transformImport = (
		node: ts.ImportDeclaration,
		getModuleReplacement: (module: string) => {
			statement?: ts.VariableStatement,
			module: ts.Expression
		} | null,
	): ts.ImportDeclaration | ts.VariableStatement[] | ts.EmptyStatement => {

		const module = node.moduleSpecifier as ts.StringLiteral;
		/* remove import from 'gnome-shell' statement */
		if (module.text === 'gnome-shell') {
			return moveComments(context.factory.createEmptyStatement(), node);
		}

		const replacement = getModuleReplacement(module.text);
		/* unknown import statement */
		if (!replacement) {
			throw new Error(`Unknown import statement '${node}'`);
		}

		const statements: ts.VariableStatement[] = [];
		if (replacement.statement) {
			/* 'const Me = ...' statement */
			statements.push(replacement.statement);
		}

		if (node.importClause?.name) {
			/* import whole module 'St' in 'import St from ...' or 'Gtk' in 'import Gtk, {} from ...'  */
			statements.push(createVariableStatement(
				context,
				node.importClause.name.text,
				replacement.module,
				ts.NodeFlags.Const,
			));
		}

		/* namespace imports e.g., 'import * as Clutter from ...' */
		node.importClause?.namedBindings?.forEachChild(binding => {
			if (binding.kind !== ts.SyntaxKind.Identifier) {
				if (binding.kind !== ts.SyntaxKind.ImportSpecifier)
					throw new Error(`Can't understand namespace import ${node}`);
				return;
			}
			const bindingId = binding as ts.Identifier;
			statements.push(createVariableStatement(
				context,
				bindingId.text,
				replacement.module,
				ts.NodeFlags.Const,
			));
		});

		/* named imports e.g., 'import { a, b } from ...' */
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
						undefined,
					);
				}),
			);
			/* replacing named imports with 'const { a, b } = ...' */
			statements.push(createVariableStatement(
				context,
				bindingName,
				replacement.module,
				ts.NodeFlags.Const,
			));
		}

		if (statements.length) {
			moveComments(statements[0], node);
			return statements;
		}
		else {
			throw new Error(`Can't understand import statement '${node}'`);
		}
	};

	/* transformation function */
	return sourceFile => {
		let addedMeStatement = false;

		/* function which returns object with module expression and "const Me ...." statement is necessary */
		const getModuleReplacement = (module: string): { statement?: ts.VariableStatement, module: ts.Expression } | null => {
			if (GIReplacements[module]) {
				/* GI import */
				return { module: createAccessExpressionFor(context, `imports.gi.${GIReplacements[module]}`) };
			}
			if (module.startsWith('.')) {
				/* local import */
				let statement: ts.VariableStatement | undefined = undefined;
				if (!addedMeStatement && ISEXTENSION) {
					addedMeStatement = true;
					//const Me = imports.misc.extensionUtils.getCurrentExtension();
					statement = createVariableStatement(
						context,
						'Me',
						context.factory.createCallExpression(
							createAccessExpressionFor(context, 'imports.misc.extensionUtils.getCurrentExtension'),
							[],
							[],
						),
						ts.NodeFlags.Const,
					);
				}

				/* path of imported module relative to root directory if extension */
				module = path.join(path.dirname(sourceFile.fileName), module);
				module = path.relative(BASEDIR, module);

				const moduleStrings = module.split('/').filter(m => m.length > 0);
				if (!moduleStrings.length) {
					throw new Error(`unable to resolve '${module}'`);
				}

				return {
					statement,
					module: createAccessExpressionFor(
						context,
						(ISEXTENSION ? 'Me.' : '') + `imports.${moduleStrings.join('.')}`,
					),
				};
			}

			/* unknown import */
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

/**
 * typescript transformer to transform exports
 * @param context
 * @returns transformation function
 *
 * transformation function
 * 1. Replace constructor with '_init' function.
 * 2. Replace 'super()' call with 'super._init' call.
 */
const transformGObjectClasses: ts.TransformerFactory<ts.SourceFile> = context => {
	/**
	 * replace 'super()' call
	 * @param node child node of function body
	 * @returns
	 */
	const replaceSuperCall = (node: ts.Node): ts.Node => {
		if (node.kind === ts.SyntaxKind.CallExpression) {
			const callNode = node as ts.CallExpression;
			if (callNode.expression.kind === ts.SyntaxKind.SuperKeyword) {
				return moveComments(
					context.factory.createCallExpression(
						context.factory.createPropertyAccessExpression(
							context.factory.createIdentifier('super'),
							context.factory.createIdentifier('_init'),
						),
						callNode.typeArguments,
						callNode.arguments,
					),
					node,
				);
			}
		}
		return moveComments(ts.visitEachChild(node, replaceSuperCall, context), node);
	};

	/**
	 * Replace constructor and super call
	 * @param node child of class expression
	 * @returns
	 */
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
					ts.visitEachChild(constructorNode.body, replaceSuperCall, context),
				),
				node,
			);
		}
		return node;
	};

	/* transformation function */
	return sourceFile => {
		const visitor = (node: ts.Node): ts.Node => {
			if (node.kind === ts.SyntaxKind.CallExpression) {
				const callNode = node as ts.CallExpression;

				if (callNode.expression.kind === ts.SyntaxKind.Identifier) {
					/* '... = registerClass(...)' call, e.g, registerClass was named import */
					if ((callNode.expression as ts.Identifier).text !== 'registerClass') {
						return moveComments(ts.visitEachChild(node, visitor, context), node);
					}
				}
				else if (callNode.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
					/* '... = <module>.registerClass(...)' call, e.g, GObject.registerClass(...) after importing GObject class */
					const id = callNode.expression as ts.PropertyAccessExpression;

					if (
						id.expression.kind !== ts.SyntaxKind.Identifier ||
						id.name.kind !== ts.SyntaxKind.Identifier ||
						(id.name as ts.Identifier).text !== 'registerClass'
					) {
						return moveComments(ts.visitEachChild(node, visitor, context), node);
					}
				}
				else {
					return moveComments(ts.visitEachChild(node, visitor, context), node);
				}

				if (callNode.arguments.length === 2 && callNode.arguments[1].kind === ts.SyntaxKind.ClassExpression) {
					// second argument is class expression, registerClass({}, class {}) call
					return moveComments(
						context.factory.createCallExpression(
							callNode.expression,
							callNode.typeArguments,
							[
								callNode.arguments[0],
								moveComments(ts.visitEachChild(callNode.arguments[1], transformConstructor, context), callNode.arguments[1]),
							],
						),
						node,
					);
				}
				if (callNode.arguments.length === 1 && callNode.arguments[0].kind === ts.SyntaxKind.ClassExpression) {
					// first argument is class expression, registerClass(class {}) call
					return moveComments(
						context.factory.createCallExpression(
							callNode.expression,
							callNode.typeArguments,
							[
								moveComments(ts.visitEachChild(callNode.arguments[0], transformConstructor, context), callNode.arguments[0]),
							],
						),
						node,
					);
				}

				throw new Error(
					`registerClass(${printer.printNode(ts.EmitHint.Unspecified, node, sourceFile)})` +
					'can\'t have more than 2 argument and last argument should be class expression',
				);
			}

			return moveComments(ts.visitEachChild(node, visitor, context), node);
		};

		return moveComments(ts.visitEachChild(sourceFile, visitor, context), sourceFile);
	};
};

const matches = new glob.GlobSync(`${BASEDIR}/**/*.js`);
matches.found.forEach(file => {
	console.log(`transpiling file: ${file}`);

	const text = fs.readFileSync(file).toString();
	let sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.ES2018, true, ts.ScriptKind.JS);
	sourceFile = ts.transform(sourceFile, [transformExports, transformImports, transformGObjectClasses]).transformed[0];
	fs.writeFileSync(file, printer.printFile(sourceFile));
});