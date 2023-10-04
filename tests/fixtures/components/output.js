import * as _ from '@intrnl/jsx-to-string/runtime';
_.html(
	_.render(
		Component({
			children: 'Hello world',
		}),
	),
);
_.html(
	_.render(
		Component({
			children: _.html('<div>Hello world</div>'),
		}),
	),
);
_.html(
	_.render(
		Component({
			children: _.html('<div>Hello</div> <div>World</div>'),
		}),
	),
);
_.html(
	_.render(
		Component({
			children: ['foo ', _.html('<div>bar</div> baz')],
		}),
	),
);
_.html(
	_.render(
		Component({
			children: ['foo ', _.html('<div>bar</div> baz <div>buzz</div>')],
		}),
	),
);
_.html(
	_.render(
		Component({
			children: ['foo ', _.html('<div>bar</div>')],
		}),
	),
);
_.html(
	_.render(
		Component({
			children: ['foo ', _.html('<div>bar</div> <div>baz</div>')],
		}),
	),
);
_.html(
	_.render(
		Component({
			children: _.html('<div>bar</div> baz'),
		}),
	),
);
_.html(
	_.render(
		Component({
			children: _.html('<div>foo</div> <div>bar</div> baz'),
		}),
	),
);
_.html(
	_.render(
		Component({
			children: foo,
		}),
	),
);
_.html(
	_.render(
		Component({
			children: ['foo ', text],
		}),
	),
);
_.html(
	_.render(
		Component({
			children: [text, ' bar'],
		}),
	),
);
_.html(
	_.render(
		Component({
			children: ['foo ', text, ' bar'],
		}),
	),
);
_.html(
	_.render(
		Component({
			children: _.html('<div>foo</div> ' + _.render(text)),
		}),
	),
);
_.html(
	_.render(
		Component({
			children: [text, ' ', _.html('<div>bar</div>')],
		}),
	),
);
_.html(
	_.render(
		Component({
			children: _.html('<div>foo</div> ' + _.render(text) + ' <div>baz</div>'),
		}),
	),
);
_.html(
	_.render(
		Component({
			value: 'John',
		}),
	),
);
_.html(
	_.render(
		Component({
			value: value,
		}),
	),
);
_.html(
	_.render(
		Component({
			value: true,
		}),
	),
);
_.html(
	_.render(
		Component({
			'data-foo': 'Bar',
		}),
	),
);
_.html(
	_.render(
		Component({
			'data-foo': foo,
		}),
	),
);
_.html(
	_.render(
		Component({
			'data-foo': true,
		}),
	),
);
_.html(
	_.render(
		Component({
			...props,
		}),
	),
);
_.html(
	_.render(
		Component({
			...before,
			value: 'John',
		}),
	),
);
_.html(
	_.render(
		Component({
			...before,
			value: value,
		}),
	),
);
_.html(
	_.render(
		Component({
			...before,
			value: true,
		}),
	),
);
_.html(
	_.render(
		Component({
			value: 'John',
			...after,
		}),
	),
);
_.html(
	_.render(
		Component({
			value: value,
			...after,
		}),
	),
);
_.html(
	_.render(
		Component({
			value: true,
			...after,
		}),
	),
);
_.html(
	_.render(
		Component({
			...before,
			value: 'John',
			...after,
		}),
	),
);
_.html(
	_.render(
		Component({
			...before,
			value: value,
			...after,
		}),
	),
);
_.html(
	_.render(
		Component({
			...before,
			value: true,
			...after,
		}),
	),
);
_.html(
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
_.html(
	_.render(
		Component({
			children: ['hello ', ...spread, ' world'],
		}),
	),
);
_.html(
	_.render(
		Component({
			children: [
				'hello ',
				...spread,
				' ',
				_.html('<div></div> text<div></div> '),
				...spread,
				' ',
				_.html('<div></div> text <div></div>'),
			],
		}),
	),
);