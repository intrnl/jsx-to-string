import * as _ from '@intrnl/jsx-to-string/runtime';
_.html('<input value= readonly disabled=>');
_.html('<div draggable=true></div>');
_.html('<div data-foo="&#34; \' < > &#38;"></div>');
_.html('<div><label for=name></label><input id=name></div>');
_.html(
	'<div><label' + _.attr('for', id + 'name') + '></label><input' + _.attr('id', id + 'name') + '></div>',
);
_.html('<input' + _.attr('value', text) + '>');
_.html('<div style="background-color: green"></div>');
_.html('<div style="background-color: blue"></div>');
_.html('<div' + _.style(style) + '></div>');
_.html('<div style=background-color:red></div>');
_.html(
	'<div' +
		_.style({
			'background-color': bgColor,
		}) +
		'></div>',
);
_.html(
	'<div' +
		_.style({
			...style,
			'background-color': 'blue',
		}) +
		'></div>',
);
_.html('<input' + _.attrsDynamic(props) + '>');
_.html(
	'<input' +
		_.attrs(before, {
			[_.IS_STATIC]: 1,
			readonly: true,
		}) +
		'>',
);
_.html(
	'<input' +
		_.attrs(before, {
			[_.IS_STATIC]: 1,
			readonly: readonly,
		}) +
		'>',
);
_.html(
	'<input' +
		_.attrs(
			{
				[_.IS_STATIC]: 1,
				readonly: true,
			},
			after,
		) +
		'>',
);
_.html(
	'<input' +
		_.attrs(
			{
				[_.IS_STATIC]: 1,
				readonly: readonly,
			},
			after,
		) +
		'>',
);
_.html(
	'<input' +
		_.attrs(
			before,
			{
				[_.IS_STATIC]: 1,
				readonly: true,
			},
			after,
		) +
		'>',
);
_.html(
	'<input' +
		_.attrs(
			before,
			{
				[_.IS_STATIC]: 1,
				readonly: readonly,
			},
			after,
		) +
		'>',
);
_.html(
	'<input' +
		_.attrsDynamic({
			...before,
			...after,
		}) +
		'>',
);
_.html(
	'<input' +
		_.attrs(
			before,
			{
				[_.IS_STATIC]: 1,
				readonly: true,
			},
			after,
			{
				[_.IS_STATIC]: 1,
				disabled: true,
			},
		) +
		'>',
);
_.html(
	'<input' +
		_.attrs(
			before,
			{
				[_.IS_STATIC]: 1,
				readonly: readonly,
			},
			after,
			{
				[_.IS_STATIC]: 1,
				disabled: disabled,
			},
		) +
		'>',
);
_.html(
	'<input' +
		_.attrsDynamic({
			value: value,
		}) +
		'>',
);
_.html(
	'<input' +
		_.attrsDynamic({
			...{
				value: value,
			},
			...{
				disabled: disabled,
			},
		}) +
		'>',
);
_.html(
	'<input' +
		_.attrsDynamic({
			value: '',
		}) +
		'>',
);
_.html(
	'<input' +
		_.attrsDynamic({
			...{
				value: '',
			},
			...{
				disabled: true,
			},
		}) +
		'>',
);
_.html('<input data-foo=foo data-bar=bar data-baz=baz>');
_.html('<input data-foo=" foo"data-bar=bar data-baz=baz>');
_.html('<input data-foo=foo data-bar=" bar"data-baz=baz>');
_.html('<input data-foo=foo data-bar=bar data-baz=" baz">');
_.html('<input data-foo=" foo"data-bar=" bar"data-baz=baz>');
_.html('<input data-foo=" foo"data-bar=bar data-baz=" baz">');
_.html('<input data-foo=foo data-bar=" bar"data-baz=" baz">');
_.html('<input data-foo=" foo"data-bar=" bar"data-baz=" baz">');
_.html('<input data-foo=foo' + _.attr('data-bar', bar) + ' data-baz=baz>');
_.html('<input data-foo="foo "' + _.attr('data-bar', bar) + 'data-baz=baz>');
_.html('<input data-foo="<">');
_.html('<input data-foo=">">');
_.html('<input data-foo=&#38;>');
_.html('<input data-foo=&#34;>');
_.html('<input data-foo="\'">');