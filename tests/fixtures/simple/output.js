import * as _ from '@intrnl/jsx-to-string/runtime';
const Card = ({ title, children }) => {
	return /*#__PURE__*/ _.html(
		'<div class=card><div class=card__title>' +
			_.render(title) +
			'</div><div class=card__body>' +
			_.render(children) +
			'</div></div>',
	);
};
const App = () => {
	return /*#__PURE__*/ _.html(
		'<h1>Hello!</h1>' +
			_.render(
				Card({
					title: 'Card title',
					children: /*#__PURE__*/ _.html("<p>We're inside a card!</p>"),
				}),
			),
	);
};
const result = /*#__PURE__*/ _.html(_.render(App({})));