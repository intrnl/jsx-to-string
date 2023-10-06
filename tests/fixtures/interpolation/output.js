import * as _ from '@intrnl/jsx-to-string/runtime';
_.html('<div>hello world</div>');
_.html('<div>0</div>');
_.html('<div>1</div>');
_.html('<div></div>');
_.html('<div></div>');
_.html('<div></div>');
_.html('<div>[object Object]</div>');
_.html(
	'<div>' +
		_.render({
			foo: foo,
		}) +
		'</div>',
);
_.html('<div><span>hello world</span></div>');
_.html('<div>hello world</div>');
_.html('<div>' + (bool ? 'hello' : 'world') + '</div>');
_.html('<div>' + (bool ? '<span>hello</span>' : '<strong>world</strong>') + '</div>');
_.html('<div>' + (bool ? 'hello' : 'world') + '</div>');
_.html('<div>' + (bool ? 'hello' : '') + '</div>');
_.html('<div>' + (bool ? '<span>hello</span>' : '') + '</div>');
_.html('<div>' + (bool ? 'hello' : '') + '</div>');
_.html('<div>' + (bool ? '' : 'world') + '</div>');
_.html('<div>' + (bool ? '' : '<strong>world</strong>') + '</div>');
_.html('<div>' + (bool ? '' : 'world') + '</div>');
_.html('<div>' + (bool ? 'hello' : _.render(expr)) + '</div>');
_.html('<div>' + (bool ? '<span>hello</span>' : _.render(expr)) + '</div>');
_.html('<div>' + (bool ? 'hello' : _.render(expr)) + '</div>');
_.html('<div>' + (bool ? _.render(expr) : 'world') + '</div>');
_.html('<div>' + (bool ? _.render(expr) : '<strong>world</strong>') + '</div>');
_.html('<div>' + (bool ? _.render(expr) : 'world') + '</div>');
_.html('<div>' + (bool ? '<span>hello ' + _.render(name) + '</span>' : '<strong>world</strong>') + '</div>');
_.html('<div>' + (bool ? 'hello ' + _.render(name) : 'world') + '</div>');
_.html('<div>' + _.render(condition && expr) + '</div>');
_.html('<div>' + _.render(condition && _.html('<span>hello</span>')) + '</div>');
_.html(
	'<div>' + _.render(condition === true && _.html('<span>hello ' + _.render(name) + '</span>')) + '</div>',
);
_.html('<div>' + _.render(condition === true && _.html('<div>hello</div>')) + '</div>');
_.html('<div>' + _.render(!condition && _.html('<div>hello</div>')) + '</div>');
{
	const node = _.html('<span>hello</span>');
	_.html('<div><div>' + _.render(node) + '</div></div>');
}
{
	const node = _.html('<span>hello</span>');
	_.html('<div><div>' + _.render(node) + '</div><div>' + _.render(node) + '</div></div>');
}