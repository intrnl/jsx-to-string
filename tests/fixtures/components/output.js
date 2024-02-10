import * as _ from '@intrnl/jsx-to-string/runtime';
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: 'Hello world',
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: /*#__PURE__*/ _.html('<div>Hello world</div>'),
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: /*#__PURE__*/ _.html('<div>Hello</div> <div>World</div>'),
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: ['foo ', /*#__PURE__*/ _.html('<div>bar</div> baz')],
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: ['foo ', /*#__PURE__*/ _.html('<div>bar</div> baz <div>buzz</div>')],
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: ['foo ', /*#__PURE__*/ _.html('<div>bar</div>')],
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: ['foo ', /*#__PURE__*/ _.html('<div>bar</div> <div>baz</div>')],
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: /*#__PURE__*/ _.html('<div>bar</div> baz'),
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: /*#__PURE__*/ _.html('<div>foo</div> <div>bar</div> baz'),
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: foo,
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: ['foo ', text],
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: [text, ' bar'],
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: ['foo ', text, ' bar'],
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: /*#__PURE__*/ _.html('<div>foo</div> ' + _.render(text)),
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: [text, ' ', /*#__PURE__*/ _.html('<div>bar</div>')],
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: /*#__PURE__*/ _.html('<div>foo</div> ' + _.render(text) + ' <div>baz</div>'),
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			value: 'John',
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			value: value,
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			value: true,
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			'data-foo': 'Bar',
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			'data-foo': foo,
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			'data-foo': true,
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			...props,
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			...before,
			value: 'John',
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			...before,
			value: value,
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			...before,
			value: true,
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			value: 'John',
			...after,
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			value: value,
			...after,
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			value: true,
			...after,
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			...before,
			value: 'John',
			...after,
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			...before,
			value: value,
			...after,
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			...before,
			value: true,
			...after,
		}),
	),
);
/*#__PURE__*/ _.html(
	'<div>' +
		_.render(
			Link({
				children: 'new',
			}),
		) +
		' | ' +
		_.render(
			Link({
				children: 'comments',
			}),
		) +
		_.render(
			Link({
				children: 'show',
			}),
		) +
		' | ' +
		_.render(
			Link({
				children: 'ask',
			}),
		) +
		_.render(
			Link({
				children: 'jobs',
			}),
		) +
		' | ' +
		_.render(
			Link({
				children: 'submit',
			}),
		) +
		'</div>',
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: ['hello ', ...spread, ' world'],
		}),
	),
);
/*#__PURE__*/ _.html(
	_.render(
		Component({
			children: [
				'hello ',
				...spread,
				' ',
				/*#__PURE__*/ _.html('<div></div> text<div></div> '),
				...spread,
				' ',
				/*#__PURE__*/ _.html('<div></div> text <div></div>'),
			],
		}),
	),
);