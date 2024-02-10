import * as _ from '@intrnl/jsx-to-string/runtime';
/*#__PURE__*/ _.html('<input value= readonly disabled=>');
/*#__PURE__*/ _.html('<div draggable=true></div>');
/*#__PURE__*/ _.html('<div data-foo="&#34; \' < > &#38;"></div>');
/*#__PURE__*/ _.html('<div><label for=name></label><input id=name></div>');
/*#__PURE__*/ _.html(
	'<div><label' + _.attr('for', id + 'name') + '></label><input' + _.attr('id', id + 'name') + '></div>',
);
/*#__PURE__*/ _.html('<input' + _.attr('value', text) + '>');
/*#__PURE__*/ _.html('<div style="background-color: green"></div>');
/*#__PURE__*/ _.html('<div style="background-color: blue"></div>');
/*#__PURE__*/ _.html('<div' + _.style(style) + '></div>');
/*#__PURE__*/ _.html('<div style=background-color:red></div>');
/*#__PURE__*/ _.html(
	'<div' +
		_.style({
			'background-color': bgColor,
		}) +
		'></div>',
);
/*#__PURE__*/ _.html(
	'<div' +
		_.style({
			...style,
			'background-color': 'blue',
		}) +
		'></div>',
);
/*#__PURE__*/ _.html('<input' + _.attrsDynamic(props) + '>');
/*#__PURE__*/ _.html(
	'<input' +
		_.attrs(before, {
			[_.IS_STATIC]: 1,
			readonly: true,
		}) +
		'>',
);
/*#__PURE__*/ _.html(
	'<input' +
		_.attrs(before, {
			[_.IS_STATIC]: 1,
			readonly: readonly,
		}) +
		'>',
);
/*#__PURE__*/ _.html(
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
/*#__PURE__*/ _.html(
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
/*#__PURE__*/ _.html(
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
/*#__PURE__*/ _.html(
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
/*#__PURE__*/ _.html(
	'<input' +
		_.attrsDynamic({
			...before,
			...after,
		}) +
		'>',
);
/*#__PURE__*/ _.html(
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
/*#__PURE__*/ _.html(
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
/*#__PURE__*/ _.html(
	'<input' +
		_.attrsDynamic({
			value: value,
		}) +
		'>',
);
/*#__PURE__*/ _.html(
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
/*#__PURE__*/ _.html(
	'<input' +
		_.attrsDynamic({
			value: '',
		}) +
		'>',
);
/*#__PURE__*/ _.html(
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
/*#__PURE__*/ _.html('<input data-foo=foo data-bar=bar data-baz=baz>');
/*#__PURE__*/ _.html('<input data-foo=" foo"data-bar=bar data-baz=baz>');
/*#__PURE__*/ _.html('<input data-foo=foo data-bar=" bar"data-baz=baz>');
/*#__PURE__*/ _.html('<input data-foo=foo data-bar=bar data-baz=" baz">');
/*#__PURE__*/ _.html('<input data-foo=" foo"data-bar=" bar"data-baz=baz>');
/*#__PURE__*/ _.html('<input data-foo=" foo"data-bar=bar data-baz=" baz">');
/*#__PURE__*/ _.html('<input data-foo=foo data-bar=" bar"data-baz=" baz">');
/*#__PURE__*/ _.html('<input data-foo=" foo"data-bar=" bar"data-baz=" baz">');
/*#__PURE__*/ _.html('<input data-foo=foo' + _.attr('data-bar', bar) + ' data-baz=baz>');
/*#__PURE__*/ _.html('<input data-foo="foo "' + _.attr('data-bar', bar) + 'data-baz=baz>');
/*#__PURE__*/ _.html('<input data-foo="<">');
/*#__PURE__*/ _.html('<input data-foo=">">');
/*#__PURE__*/ _.html('<input data-foo=&#38;>');
/*#__PURE__*/ _.html('<input data-foo=&#34;>');
/*#__PURE__*/ _.html('<input data-foo="\'">');
/*#__PURE__*/ _.html('<input value= readonly>');
/*#__PURE__*/ _.html('<input style=background:red;font:inherit>');
/*#__PURE__*/ _.html('<input' + _.attr('value', value) + ' readonly disabled>');