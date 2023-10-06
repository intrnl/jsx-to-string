<div>{'hello world'}</div>;

<div>{0}</div>;

<div>{1}</div>;

<div>{true}</div>;

<div>{false}</div>;

<div>{null}</div>;

<div>{{ foo: 123 }}</div>;

<div>{{ foo: foo }}</div>;

<div>{<span>hello world</span>}</div>;

<div>{<>hello world</>}</div>;

<div>{bool ? 'hello' : 'world'}</div>;

<div>{bool ? <span>hello</span> : <strong>world</strong>}</div>;

<div>{bool ? <>hello</> : <>world</>}</div>;

{
	const node = <span>hello</span>;

	<div>
		<div>{node}</div>
	</div>;
}

{
	const node = <span>hello</span>;

	<div>
		<div>{node}</div>
		<div>{node}</div>
	</div>;
}
