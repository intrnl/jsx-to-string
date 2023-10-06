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
_.html('<div>' + _.render(_.html('<span>hello world</span>')) + '</div>');
_.html('<div>' + _.render(_.html('hello world')) + '</div>');
_.html('<div>' + _.render(bool ? 'hello' : 'world') + '</div>');
_.html('<div>' + _.render(bool ? _.html('<span>hello</span>') : _.html('<strong>world</strong>')) + '</div>');
_.html('<div>' + _.render(bool ? _.html('hello') : _.html('world')) + '</div>');