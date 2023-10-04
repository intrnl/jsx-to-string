import { type JSXNode, TrustedHTML } from '../types.js';

export const html = (str: string): TrustedHTML => {
	return new TrustedHTML(str);
};

export const escape = (str: string, attr: boolean) => {
	let escaped = '';
	let last = 0;

	for (let idx = 0, len = str.length; idx < len; idx++) {
		const char = str.charCodeAt(idx);

		if (char === 38 || (attr ? char === 34 : char === 60)) {
			escaped += str.substring(last, idx) + ('&#' + char + ';');
			last = idx + 1;
		}
	}

	return escaped + str.substring(last);
};

const $isArray = Array.isArray;
const UNSAFE_NAME = /[\s\\/='"\0<>]/;

export const render = (node: JSXNode) => {
	if (node == null || node === false || node === true) {
		return '';
	}

	if (node instanceof TrustedHTML) {
		return node.value;
	}

	if ($isArray(node)) {
		let rendered = '';

		for (let idx = 0, len = node.length; idx < len; idx++) {
			const child = node[idx];

			if (child == null || child === true || child === false || child === '') {
				continue;
			}

			rendered += render(child);
		}

		return rendered;
	}

	if (typeof node === 'function') {
		return '';
	}

	return escape('' + node, false);
};

export const attr = (name: string, value: any) => {
	if (value != null && value !== false && typeof value !== 'function') {
		if (value === true /*  || value === '' */) {
			return ' ' + name;
		} else {
			return ' ' + name + '="' + escape('' + value, true) + '"';
		}
	}

	return '';
};

export const style = (value: string | Record<string, string>) => {
	let result = '';

	if (typeof value === 'string') {
		result = value;
	} else {
		for (const prop in value) {
			const val = value[prop];
			result += prop + ':' + val + ';';
		}
	}

	return attr('style', result);
};

export const IS_STATIC = Symbol();

export const attrs = (...sources: Record<string, any>[]) => {
	const attrs: Record<string, any> = {};
	let rendered = '';

	for (let idx = 0, len = sources.length; idx < len; idx++) {
		const source = sources[idx];

		if (source && !(IS_STATIC in source)) {
			for (const name in source) {
				if (UNSAFE_NAME.test(name)) {
					const value = source[name];
					throw new Error(`Attribute "${name}" (${value}) is unsafe`);
				}
			}
		}

		Object.assign(attrs, source);
	}

	for (const name in attrs) {
		const value = attrs[name];

		if (name === 'style') {
			rendered += style(value);
		} else {
			rendered += attr(name, value);
		}
	}

	return rendered;
};

export const attrsDynamic = (attrs: Record<string, any>) => {
	let rendered = '';

	for (const name in attrs) {
		const value = attrs[name];

		if (UNSAFE_NAME.test(name)) {
			throw new Error(`Attribute "${name}" (${value}) is unsafe`);
		}

		if (name === 'style') {
			rendered += style(value);
		} else {
			rendered += attr(name, value);
		}
	}

	return rendered;
};
