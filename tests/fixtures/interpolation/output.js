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
_.html('<div>' + _.render(bool ? 'hello' : 'world') + '</div>');
_.html('<div>' + _.render(bool ? _.html('<span>hello</span>') : _.html('<strong>world</strong>')) + '</div>');
_.html('<div>' + _.render(bool ? _.html('hello') : _.html('world')) + '</div>');
_.html('<div>' + _.render(bool ? 'hello' : null) + '</div>');
_.html('<div>' + _.render(bool ? _.html('<span>hello</span>') : null) + '</div>');
_.html('<div>' + _.render(bool ? _.html('hello') : null) + '</div>');
_.html('<div>' + _.render(bool ? null : 'world') + '</div>');
_.html('<div>' + _.render(bool ? null : _.html('<strong>world</strong>')) + '</div>');
_.html('<div>' + _.render(bool ? null : _.html('world')) + '</div>');
_.html('<div>' + _.render(bool ? 'hello' : expr) + '</div>');
_.html('<div>' + _.render(bool ? _.html('<span>hello</span>') : expr) + '</div>');
_.html('<div>' + _.render(bool ? _.html('hello') : expr) + '</div>');
_.html('<div>' + _.render(bool ? expr : 'world') + '</div>');
_.html('<div>' + _.render(bool ? expr : _.html('<strong>world</strong>')) + '</div>');
_.html('<div>' + _.render(bool ? expr : _.html('world')) + '</div>');
_.html('<div>' + _.render(bool === true && _.html('<div>hello</div>')) + '</div>');
_.html('<div>' + _.render(!bool && _.html('<div>hello</div>')) + '</div>');
{
	const node = _.html('<span>hello</span>');
	_.html('<div><div>' + _.render(node) + '</div></div>');
}
{
	const node = _.html('<span>hello</span>');
	_.html('<div><div>' + _.render(node) + '</div><div>' + _.render(node) + '</div></div>');
}