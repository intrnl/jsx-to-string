import * as _ from '@intrnl/jsx-to-string/runtime';
/*#__PURE__*/ _.html('Hello world');
/*#__PURE__*/ _.html('<div>Hello world</div>');
/*#__PURE__*/ _.html('Hello <span>World</span>');
/*#__PURE__*/ _.html('<span>Hello</span> world');
/*#__PURE__*/ _.html(_.render(foo));
/*#__PURE__*/ _.html(_.render(foo) + ' ' + _.render(bar));
/*#__PURE__*/ _.html(_.render(foo) + ' text ' + _.render(bar));
/*#__PURE__*/ _.html('text ' + _.render(foo));
/*#__PURE__*/ _.html(_.render(bar) + ' text');