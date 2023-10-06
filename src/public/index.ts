export * from '../types.js';
export { html } from '../runtime/index.js';

export const repeat = <T, R>(array: T[], mapper: (value: T, idx: number, array: T[]) => R): R[] => {
	let idx = 0;
	let len = array.length;

	let out = new Array(len);

	for (; idx < len; idx++) {
		out[idx] = mapper(array[idx], idx, array);
	}

	return out;
};
