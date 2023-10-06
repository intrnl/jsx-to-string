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

<div>{bool ? 'hello' : null}</div>;

<div>{bool ? <span>hello</span> : null}</div>;

<div>{bool ? <>hello</> : null}</div>;

<div>{bool ? null : 'world'}</div>;

<div>{bool ? null : <strong>world</strong>}</div>;

<div>{bool ? null : <>world</>}</div>;

<div>{bool ? 'hello' : expr}</div>;

<div>{bool ? <span>hello</span> : expr}</div>;

<div>{bool ? <>hello</> : expr}</div>;

<div>{bool ? expr : 'world'}</div>;

<div>{bool ? expr : <strong>world</strong>}</div>;

<div>{bool ? expr : <>world</>}</div>;

<div>{bool ? <span>hello {name}</span> : <strong>world</strong>}</div>;

<div>{bool ? <>hello {name}</> : <>world</>}</div>;

<div>{condition && expr}</div>;

<div>{condition && <span>hello</span>}</div>;

<div>{condition === true && <span>hello {name}</span>}</div>;

<div>{condition === true && <div>hello</div>}</div>;

<div>{!condition && <div>hello</div>}</div>;

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
