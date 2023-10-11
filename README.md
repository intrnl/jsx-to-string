# jsx-to-string

This is a VDOM-less variant of [`jsx-to-html`](https://codeberg.org/intrnl/jsx-to-html), using a Babel transform to directly transform JSX into a string.

It means that this following code:

```jsx
const Card = ({ title, children }) => {
	return (
		<div class="card">
			<div class="card__title">{title}</div>
			<div class="card__body">{children}</div>
		</div>
	);
};

const App = () => {
	return (
		<>
			<h1>Hello!</h1>
			<Card title="Card title">
				<p>We're inside a card!</p>
			</Card>
		</>
	);
};

const result = <App />;

result.value;
```

Will be transformed into something like this:

```js
import * as _ from '@intrnl/jsx-to-string/runtime';

const Card = ({ title, children }) => {
	return _.html(
		'<div class=card><div class=card__title>' +
			_.render(title) +
			'</div><div class=card__body>' +
			_.render(children) +
			'</div></div>',
	);
};

const App = () => {
	return _.html(
		'<h1>Hello!</h1>' +
			_.render(
				Card({
					title: 'Card title',
					children: _.html("<p>We're inside a card!</p>"),
				}),
			),
	);
};
const result = _.html(_.render(App({})));

result.value;
// '<h1>Hello!</h1><div class=card><div class=card__title>Card title</div> ...'
```

With most of the JSX being turned into string concatenations, it's super fast. Components are turned into eager function calls, and the returned JSX values can be used as is without having to call `render` or `renderToString` on it.

## Inserting raw HTML

Raw HTML insertion can be done by using the `html` function, this returns a
`TrustedHTML` instance which prevents the string from being sanitized.

```jsx
import { html } from '@intrnl/jsx-to-string';

const raw = html('<span>world</span>');
const result = <div>Hello {raw}</div>;

result.value;
// '<div>Hello <span>world</span></div>'
```
