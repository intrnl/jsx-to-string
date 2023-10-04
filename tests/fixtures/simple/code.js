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
