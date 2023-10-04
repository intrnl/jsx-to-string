export class TrustedHTML {
	constructor(public readonly value: string) {}
}

export type JSXText = string | number;
export type JSXChild = JSXText | TrustedHTML;

export type JSXNodeArray = JSXNode[];
export type JSXNode = JSXChild | JSXNodeArray | boolean | null | undefined;

export interface Component<P = {}> {
	(props: P): TrustedHTML | null;
}
