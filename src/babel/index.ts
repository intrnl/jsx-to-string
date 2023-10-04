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
						const val = evaluation.value;
						const result = name !== 'style' ? runtime.attr(name, val) : runtime.style(val);

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

	const renderChildren = (path: NodePath<t.JSXElement | t.JSXFragment>) => {
		const children = path.get('children');

		for (let idx = 0, len = children.length; idx < len; idx++) {
			const child = children[idx];

			const node = child.node;
			const type = node.type;

			if (type === 'JSXText') {
				const str = cleanJSXText(node.value);
				const escaped = runtime.render(str);
				text(escaped);
			} else if (type === 'JSXElement') {
				const $child = child as NodePath<t.JSXElement>;
				renderElement($child);
			} else if (type === 'JSXFragment') {
				const $child = child as NodePath<t.JSXFragment>;
				renderChildren($child);
			} else if (type === 'JSXSpreadChild') {
				const $child = child as NodePath<t.JSXSpreadChild>;

				expr(
					t.callExpression(t.memberExpression(importIdent!, t.identifier('render')), [
						t.arrayExpression([t.spreadElement($child.node.expression)]),
					]),
				);
			} else if (type === 'JSXExpressionContainer') {
				const $child = child as NodePath<t.JSXExpressionContainer>;

				const expression = $child.get('expression');
				if (expression.type === 'JSXEmptyExpression') {
					continue;
				}

				const $expression = expression as NodePath<t.Expression>;
				const evaluation = $expression.evaluate();

				if (evaluation.confident) {
					const val = evaluation.value;
					const str = runtime.render(val);

					text(str);
				} else {
					expr(
						t.callExpression(t.memberExpression(importIdent!, t.identifier('render')), [$expression.node]),
					);
				}
			}
		}
	};

	const handleJSXVisit = (path: NodePath<t.JSXElement | t.JSXFragment>) => {
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
		path.replaceWith(t.callExpression(t.memberExpression(importIdent!, t.identifier('html')), [expr]));

		nodes = before;
	};

	return {
		name: '@intrnl/babel-plugin-transform-jsx-to-html',
		inherits: jsx,
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
