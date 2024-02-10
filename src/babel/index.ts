import type { NodePath } from '@babel/core';
import * as t from '@babel/types';

import { declare } from '@babel/helper-plugin-utils';
import jsx from '@babel/plugin-syntax-jsx';

import { cleanJSXText } from './utils.js';
import { SELF_CLOSING } from './constants.js';

import * as runtime from '../runtime/index.js';

export interface PluginOptions {
	runtimePath?: string;
}

export default declare<PluginOptions>((_api, options) => {
	const { runtimePath = '@intrnl/jsx-to-string/runtime' } = options;

	let isRuntimeRequired = false;
	let importIdent: t.Identifier | null = null;
	let nodes: t.Expression[] | null = null;

	const expr = (value: t.Expression) => {
		const idx = nodes!.length - 1;
		const last = nodes![idx] as t.StringLiteral;

		if (last.value) {
			nodes!.push(value);
		} else {
			nodes![idx] = value;
		}

		nodes!.push(t.stringLiteral(''));
	};

	const text = (value: string) => {
		const last = nodes![nodes!.length - 1] as t.StringLiteral;
		last.value += value;
	};

	const buildNodes = () => {
		const lastIndex = nodes!.length - 1;

		return nodes!.reduce((accu, next, index) => {
			if (index === lastIndex && next.type === 'StringLiteral' && !next.value) {
				return accu;
			}

			return t.binaryExpression('+', accu, next);
		});
	};

	const renderElement = (path: NodePath<t.JSXElement>) => {
		const node = path.node;

		const opening = path.get('openingElement');
		const openingNode = opening.node;

		const jsxTagName = openingNode.name;
		const attributes = opening.get('attributes');

		if (isJSXComponentName(jsxTagName)) {
			// <Button color='red'>Hello world</Button>
			// Button({ color: 'red', children: 'Hello world' })
			const ident = getComponentIdent(jsxTagName);
			const properties: t.ObjectExpression['properties'] = [];

			for (let idx = 0, len = attributes.length; idx < len; idx++) {
				const attr = attributes[idx];
				const attrNode = attr.node;

				if (attrNode.type === 'JSXSpreadAttribute') {
					const spread = t.spreadElement(attrNode.argument);
					properties.push(spread);
					continue;
				}

				const name = attrNode.name;
				const value = attrNode.value;
				let expr: t.Expression;

				if (value) {
					const type = value.type;

					if (type === 'JSXExpressionContainer') {
						const expression = value.expression;

						if (expression.type === 'JSXEmptyExpression') {
							continue;
						}

						expr = expression;
					} else {
						expr = value;
					}
				} else {
					expr = t.booleanLiteral(true);
				}

				const prop = t.objectProperty(t.stringLiteral(getAttributeName(name)), expr);
				properties.push(prop);
			}

			const children = node.children;
			const groupedChildren: Array<
				| t.SpreadElement
				| t.Expression
				| Array<t.JSXText | t.JSXFragment | t.JSXElement | t.JSXExpressionContainer>
			> = [];

			// children has JSXSpreadChild
			let hasSpreads = false;
			// children is now being grouped by JSXElement or JSXFragment, this wraps
			// JSXText and JSXExpression inside as well, resets on JSXSpreadChild
			let isGrouped = false;

			for (let idx = 0, len = children.length; idx < len; idx++) {
				const child = children[idx];

				const type = child.type;

				if (type === 'JSXSpreadChild') {
					hasSpreads = true;
					isGrouped = false;
					groupedChildren.push(t.spreadElement(child.expression));
				} else if (type === 'JSXElement' || type === 'JSXFragment') {
					if (isGrouped) {
						const array = groupedChildren[groupedChildren.length - 1] as Array<
							t.JSXText | t.JSXFragment | t.JSXElement | t.JSXExpressionContainer
						>;
						array.push(child);
					} else {
						isGrouped = true;
						groupedChildren.push([child]);
					}
				} else if (type === 'JSXText') {
					if (isGrouped) {
						const array = groupedChildren[groupedChildren.length - 1] as Array<
							t.JSXText | t.JSXFragment | t.JSXElement | t.JSXExpressionContainer
						>;
						array.push(child);
					} else {
						const str = cleanJSXText(child.value);
						if (str) {
							groupedChildren.push(t.stringLiteral(str));
						}
					}
				} else if (type === 'JSXExpressionContainer') {
					if (isGrouped) {
						const array = groupedChildren[groupedChildren.length - 1] as Array<
							t.JSXText | t.JSXFragment | t.JSXElement | t.JSXExpressionContainer
						>;
						array.push(child);
					} else {
						const expression = child.expression;

						if (expression.type !== 'JSXEmptyExpression') {
							groupedChildren.push(expression);
						}
					}
				}
			}

			if (groupedChildren.length > 0) {
				let expr: t.Expression;

				if (hasSpreads || groupedChildren.length > 1) {
					expr = t.arrayExpression(
						groupedChildren.map((child) => {
							if (Array.isArray(child)) {
								return t.jsxFragment(t.jsxOpeningFragment(), t.jsxClosingFragment(), child);
							}

							return child;
						}),
					);
				} else {
					const child = groupedChildren[0] as
						| t.Expression
						| Array<t.JSXText | t.JSXFragment | t.JSXElement | t.JSXExpressionContainer>;

					if (Array.isArray(child)) {
						expr = t.jsxFragment(t.jsxOpeningFragment(), t.jsxClosingFragment(), child);
					} else {
						expr = child;
					}
				}

				const prop = t.objectProperty(t.stringLiteral('children'), expr);

				properties.push(prop);
			}

			expr(
				t.callExpression(t.memberExpression(importIdent!, t.identifier('render')), [
					t.callExpression(ident, [t.objectExpression(properties)]),
				]),
			);
		} else {
			const tagName = getElementName(jsxTagName);

			text('<' + tagName);

			// We'll check if there's any dynamic/static properties in here
			let hasStatics = false;
			let hasDynamics = false;

			for (let idx = 0, len = attributes.length; idx < len; idx++) {
				const attr = attributes[idx];

				if (attr.type === 'JSXSpreadAttribute') {
					hasDynamics = true;
				} else {
					hasStatics = true;
				}

				if (hasStatics && hasDynamics) {
					break;
				}
			}

			if (hasDynamics) {
				const args: t.Expression[] = [];
				let statics: t.ObjectExpression['properties'] | undefined;

				for (let idx = 0, len = attributes.length; idx < len; idx++) {
					const attr = attributes[idx];
					const attrNode = attr.node;

					if (attrNode.type === 'JSXSpreadAttribute') {
						if (statics) {
							args.push(t.objectExpression(statics));
							statics = undefined;
						}

						args.push(attrNode.argument);
						continue;
					}

					if (!statics) {
						statics = [
							t.objectProperty(
								t.memberExpression(importIdent!, t.identifier('IS_STATIC')),
								t.numericLiteral(1),
								true,
							),
						];
					}

					const name = attrNode.name;
					const value = attrNode.value;
					let expr: t.Expression;

					if (value) {
						const type = value.type;

						if (type === 'JSXExpressionContainer') {
							const expression = value.expression;

							if (expression.type === 'JSXEmptyExpression') {
								continue;
							}

							expr = expression;
						} else {
							expr = value;
						}
					} else {
						expr = t.booleanLiteral(true);
					}

					const prop = t.objectProperty(t.stringLiteral(getAttributeName(name)), expr);
					statics.push(prop);
				}

				if (hasStatics) {
					expr(
						t.callExpression(
							t.memberExpression(importIdent!, t.identifier('attrs')),
							statics ? args.concat(t.objectExpression(statics)) : args,
						),
					);
				} else if (args.length > 1) {
					expr(
						t.callExpression(t.memberExpression(importIdent!, t.identifier('attrsDynamic')), [
							t.objectExpression(args.map((arg) => t.spreadElement(arg))),
						]),
					);
				} else {
					expr(t.callExpression(t.memberExpression(importIdent!, t.identifier('attrsDynamic')), args));
				}
			} else if (hasStatics) {
				let needsSpacing = true;

				for (let idx = 0, len = attributes.length; idx < len; idx++) {
					const attr = attributes[idx] as NodePath<t.JSXAttribute>;
					const attrNode = attr.node;

					const name = getAttributeName(attrNode.name);

					const value = attr.get('value');
					const valueNode = value.node;

					let evaluation: ReturnType<NodePath['evaluate']> | undefined;
					let express: t.Expression | undefined;

					if (valueNode) {
						if (value.type === 'JSXExpressionContainer') {
							const $value = value as NodePath<t.JSXExpressionContainer>;
							const expression = $value.get('expression');

							if (expression.type !== 'JSXEmptyExpression') {
								express = expression.node as t.Expression;
								evaluation = expression.evaluate();
							}
						} else if (value.type === 'StringLiteral') {
							const $valueNode = valueNode as t.StringLiteral;

							evaluation = { confident: true, value: $valueNode.value };
						} else {
							express = valueNode as Exclude<typeof valueNode, t.JSXExpressionContainer>;
						}
					} else {
						evaluation = { confident: true, value: true };
					}

					if (evaluation && evaluation.confident) {
						let value = evaluation.value;

						if (name === 'style' && typeof value === 'object' && value) {
							let str = '';
							let tmp: any;

							for (const prop in value) {
								if ((tmp = value[prop])) {
									str && (str += ';');
									str += prop + ':' + tmp;
								}
							}

							value = str;
						}

						let result = `${needsSpacing ? ' ' : ''}${name}`;
						let needsQuoting = false;

						if (value === true /* || value === '' */) {
							needsSpacing = true;
						} else {
							value = runtime.escape('' + value, true);

							for (let idx = 0, len = value.length; idx < len; idx++) {
								let char = value[idx];

								if (
									char === "'" ||
									char === '"' ||
									char === ' ' ||
									char === '\t' ||
									char === '\n' ||
									char === '\r' ||
									char === '`' ||
									char === '=' ||
									char === '<' ||
									char === '>'
								) {
									needsQuoting = true;
									break;
								}
							}

							if (needsQuoting) {
								needsSpacing = false;
								result += '="' + value + '"';
							} else {
								needsSpacing = true;
								result += '=' + value;
							}
						}

						text(result);
					} else if (name === 'style') {
						expr(t.callExpression(t.memberExpression(importIdent!, t.identifier('style')), [express!]));
					} else {
						expr(
							t.callExpression(t.memberExpression(importIdent!, t.identifier('attr')), [
								t.stringLiteral(name),
								express!,
							]),
						);
					}
				}
			}

			text('>');

			const startIndex = nodes!.length;
			const startLength = (nodes![startIndex - 1] as t.StringLiteral).value.length;
			renderChildren(path);

			if (
				startIndex !== nodes!.length ||
				(nodes![nodes!.length - 1] as t.StringLiteral).value.length !== startLength ||
				!SELF_CLOSING.has(tagName)
			) {
				text('</' + tagName + '>');
			}
		}
	};

	const BINARY_OPERATORS = new Set<t.BinaryExpression['operator']>([
		'!=',
		'!==',
		'==',
		'===',
		'>',
		'>=',
		'<',
		'<=',
		'in',
		'instanceof',
	]);

	const renderChildren = (path: NodePath<t.JSXElement | t.JSXFragment>) => {
		const children = path.get('children');

		for (let idx = 0, len = children.length; idx < len; idx++) {
			const child = children[idx];

			const node = child.node;
			const type = node.type;

			let expression: NodePath<t.Expression>;

			if (type === 'JSXText') {
				const str = cleanJSXText(node.value);
				const escaped = runtime.render(str);
				text(escaped);

				continue;
			} else if (type === 'JSXSpreadChild') {
				const $child = child as NodePath<t.JSXSpreadChild>;

				expr(
					t.callExpression(t.memberExpression(importIdent!, t.identifier('render')), [
						t.arrayExpression([t.spreadElement($child.node.expression)]),
					]),
				);

				continue;
			} else if (type === 'JSXExpressionContainer') {
				const $child = child as NodePath<t.JSXExpressionContainer>;
				const _expr = $child.get('expression');

				if (_expr.type === 'JSXEmptyExpression') {
					continue;
				}

				expression = _expr as NodePath<t.Expression>;
			} else {
				expression = child as NodePath<t.JSXElement | t.JSXFragment>;
			}

			const exprtype = expression.type;

			if (exprtype === 'JSXElement') {
				const $expression = expression as NodePath<t.JSXElement>;
				renderElement($expression);

				continue;
			} else if (exprtype === 'JSXFragment') {
				const $expression = expression as NodePath<t.JSXFragment>;
				renderChildren($expression);

				continue;
			} else if (exprtype === 'ConditionalExpression') {
				const $expression = expression as NodePath<t.ConditionalExpression>;

				const consequent = $expression.get('consequent');
				const alternate = $expression.get('alternate');

				const consType = consequent.type;
				const altType = alternate.type;

				let alteredConsequent: t.Expression | undefined;
				let alteredAlternate: t.Expression | undefined;

				if (consType === 'JSXElement' || consType === 'JSXFragment') {
					const $consequent = consequent as NodePath<t.JSXElement | t.JSXFragment>;
					alteredConsequent = handleJSXTransform($consequent);
				} else {
					const evaluation = consequent.evaluate();

					if (evaluation.confident) {
						const val = evaluation.value;
						const str = runtime.render(val);

						alteredConsequent = t.stringLiteral(str);
					}
				}

				if (altType === 'JSXElement' || altType === 'JSXFragment') {
					const $alternate = alternate as NodePath<t.JSXElement | t.JSXFragment>;
					alteredAlternate = handleJSXTransform($alternate);
				} else {
					const evaluation = alternate.evaluate();

					if (evaluation.confident) {
						const val = evaluation.value;
						const str = runtime.render(val);

						alteredAlternate = t.stringLiteral(str);
					}
				}

				if (alteredConsequent || alteredAlternate) {
					expr(
						t.conditionalExpression(
							$expression.node.test,
							alteredConsequent ||
								t.callExpression(t.memberExpression(importIdent!, t.identifier('render')), [consequent.node]),
							alteredAlternate ||
								t.callExpression(t.memberExpression(importIdent!, t.identifier('render')), [alternate.node]),
						),
					);

					continue;
				}
			} else if (exprtype === 'LogicalExpression') {
				const $expression = expression as NodePath<t.LogicalExpression>;

				const operator = $expression.node.operator;
				const leftNode = $expression.node.left;

				const right = $expression.get('right');
				const rightType = right.type;

				let alteredRight: t.Expression | undefined;

				if (operator === '&&' && isSupportedLogicalExpression(leftNode)) {
					if (rightType === 'JSXElement' || rightType === 'JSXFragment') {
						const $right = right as NodePath<t.JSXElement | t.JSXFragment>;
						alteredRight = handleJSXTransform($right);
					} else {
						const evaluation = right.evaluate();

						if (evaluation.confident) {
							const val = evaluation.value;
							const str = runtime.render(val);

							alteredRight = t.stringLiteral(str);
						}
					}
				}

				if (alteredRight) {
					expr(t.conditionalExpression(leftNode, alteredRight, t.stringLiteral('')));

					continue;
				}
			}

			const evaluation = expression.evaluate();

			if (evaluation.confident) {
				const val = evaluation.value;
				const str = runtime.render(val);

				text(str);
				continue;
			}

			expr(t.callExpression(t.memberExpression(importIdent!, t.identifier('render')), [expression.node]));
		}
	};

	const handleJSXTransform = (path: NodePath<t.JSXElement | t.JSXFragment>) => {
		const before = nodes;

		nodes = [t.stringLiteral('')];
		isRuntimeRequired = true;

		if (path.type === 'JSXFragment') {
			const $path = path as NodePath<t.JSXFragment>;
			renderChildren($path);
		} else {
			const $path = path as NodePath<t.JSXElement>;
			renderElement($path);
		}

		const expr = buildNodes();
		nodes = before;

		return expr;
	};

	const handleJSXVisit = (path: NodePath<t.JSXElement | t.JSXFragment>) => {
		const expr = handleJSXTransform(path);
		path.replaceWith(t.callExpression(t.memberExpression(importIdent!, t.identifier('html')), [expr]));
	};

	return {
		name: '@intrnl/babel-plugin-transform-jsx-to-html',
		inherits: jsx?.default ?? jsx,
		visitor: {
			Program: {
				enter(path) {
					isRuntimeRequired = false;
					importIdent = path.scope.generateUidIdentifier('');
				},
				exit(path) {
					if (isRuntimeRequired) {
						path.unshiftContainer(
							'body',
							t.importDeclaration([t.importNamespaceSpecifier(importIdent!)], t.stringLiteral(runtimePath)),
						);
					}
				},
			},

			JSXElement(path) {
				handleJSXVisit(path);
			},
			JSXFragment(path) {
				handleJSXVisit(path);
			},
		},
	};
});

const isJSXComponentName = (node: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName): boolean => {
	const type = node.type;

	if (type === 'JSXIdentifier') {
		const code = node.name.charCodeAt(0);
		return code >= 65 && code <= 90;
	}

	if (type === 'JSXMemberExpression') {
		return true;
	}

	return false;
};

const getComponentIdent = (
	node: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName,
): t.Identifier | t.MemberExpression => {
	const type = node.type;

	if (type === 'JSXIdentifier') {
		return t.identifier(node.name);
	}

	if (type === 'JSXMemberExpression') {
		return t.memberExpression(getComponentIdent(node.object), getComponentIdent(node.property));
	}

	throw new Error(`unexpected ${type} node type`);
};

const getElementName = (node: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName): string => {
	const type = node.type;

	if (type === 'JSXIdentifier') {
		return node.name;
	}

	if (type === 'JSXNamespacedName') {
		return node.namespace + ':' + node.name;
	}

	throw new Error(`unexpected ${type} node type`);
};

const getAttributeName = (node: t.JSXIdentifier | t.JSXNamespacedName): string => {
	const type = node.type;

	if (type === 'JSXNamespacedName') {
		return node.namespace.name + ':' + node.name.name;
	}

	return node.name;
};

const isSupportedLogicalExpression = (node: t.Expression): boolean => {
	const type = node.type;

	if (type === 'UnaryExpression') {
		return node.operator === '!';
	}

	if (type === 'BinaryExpression') {
		const operator = node.operator;

		return (
			operator === '==' ||
			operator === '===' ||
			operator === '!=' ||
			operator === '!==' ||
			operator === '<' ||
			operator === '<=' ||
			operator === '>' ||
			operator === '>=' ||
			operator === 'in' ||
			operator === 'instanceof'
		);
	}

	return false;
};
