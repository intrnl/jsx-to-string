import * as _ from '@intrnl/jsx-to-string/runtime';
/*#__PURE__*/ _.html('<div>hello world</div>');
/*#__PURE__*/ _.html('<div>0</div>');
/*#__PURE__*/ _.html('<div>1</div>');
/*#__PURE__*/ _.html('<div></div>');
/*#__PURE__*/ _.html('<div></div>');
/*#__PURE__*/ _.html('<div></div>');
/*#__PURE__*/ _.html('<div>' + _.render(value) + '</div>');
/*#__PURE__*/ _.html('<div>[object Object]</div>');
/*#__PURE__*/ _.html(
	'<div>' +
		_.render({
			foo: foo,
		}) +
		'</div>',
);
/*#__PURE__*/ _.html('<div><span>hello world</span></div>');
/*#__PURE__*/ _.html('<div>hello world</div>');
/*#__PURE__*/ _.html('<div>' + _.render(bool ? consequent : alternate) + '</div>');
/*#__PURE__*/ _.html('<div>' + (bool ? 'hello' : 'world') + '</div>');
/*#__PURE__*/ _.html('<div>' + (bool ? '<span>hello</span>' : '<strong>world</strong>') + '</div>');
/*#__PURE__*/ _.html('<div>' + (bool ? 'hello' : 'world') + '</div>');
/*#__PURE__*/ _.html('<div>' + (bool ? 'hello' : '') + '</div>');
/*#__PURE__*/ _.html('<div>' + (bool ? '<span>hello</span>' : '') + '</div>');
/*#__PURE__*/ _.html('<div>' + (bool ? 'hello' : '') + '</div>');
/*#__PURE__*/ _.html('<div>' + (bool ? '' : 'world') + '</div>');
/*#__PURE__*/ _.html('<div>' + (bool ? '' : '<strong>world</strong>') + '</div>');
/*#__PURE__*/ _.html('<div>' + (bool ? '' : 'world') + '</div>');
/*#__PURE__*/ _.html('<div>' + (bool ? 'hello' : _.render(expr)) + '</div>');
/*#__PURE__*/ _.html('<div>' + (bool ? '<span>hello</span>' : _.render(expr)) + '</div>');
/*#__PURE__*/ _.html('<div>' + (bool ? 'hello' : _.render(expr)) + '</div>');
/*#__PURE__*/ _.html('<div>' + (bool ? _.render(expr) : 'world') + '</div>');
/*#__PURE__*/ _.html('<div>' + (bool ? _.render(expr) : '<strong>world</strong>') + '</div>');
/*#__PURE__*/ _.html('<div>' + (bool ? _.render(expr) : 'world') + '</div>');
/*#__PURE__*/ _.html(
	'<div>' + (bool ? '<span>hello ' + _.render(name) + '</span>' : '<strong>world</strong>') + '</div>',
);
/*#__PURE__*/ _.html('<div>' + (bool ? 'hello ' + _.render(name) : 'world') + '</div>');
/*#__PURE__*/ _.html('<div>' + _.render(condition && expr) + '</div>');
/*#__PURE__*/ _.html('<div>' + _.render(condition && /*#__PURE__*/ _.html('<span>hello</span>')) + '</div>');
/*#__PURE__*/ _.html(
	'<div>' + (condition === true ? '<span>hello ' + _.render(name) + '</span>' : '') + '</div>',
);
/*#__PURE__*/ _.html('<div>' + (condition === true ? '<div>hello</div>' : '') + '</div>');
/*#__PURE__*/ _.html('<div>' + (!condition ? '<div>hello</div>' : '') + '</div>');
{
	const node = /*#__PURE__*/ _.html('<span>hello</span>');
	/*#__PURE__*/ _.html('<div><div>' + _.render(node) + '</div></div>');
}
{
	const node = /*#__PURE__*/ _.html('<span>hello</span>');
	/*#__PURE__*/ _.html('<div><div>' + _.render(node) + '</div><div>' + _.render(node) + '</div></div>');
}