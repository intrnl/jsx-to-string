import * as _ from '@intrnl/jsx-to-string/runtime';
/*#__PURE__*/ _.html('<div></div>');
/*#__PURE__*/ _.html('<div><div></div></div>');
/*#__PURE__*/ _.html('<div><span>foo</span> bar <span>baz</span></div>');
/*#__PURE__*/ _.html('<div><style>div { color: red; }</style></div>');
/*#__PURE__*/ _.html('<div><span><a></a></span><span></span></div>');
/*#__PURE__*/ _.html('<div><div><table><tbody></tbody></table></div><div></div></div>');
/*#__PURE__*/ _.html(
	'<div><div><footer><div></div></footer></div><div><button><span>0</span></button></div></div>',
);
/*#__PURE__*/ _.html('<div>" \' &#60; > &#38;</div>');
/*#__PURE__*/ _.html('<input>');
/*#__PURE__*/ _.html('<input>');
/*#__PURE__*/ _.html('<input><div></div></input>');
/*#__PURE__*/ _.html('<div></div>');
/*#__PURE__*/ _.html('<div></div>');