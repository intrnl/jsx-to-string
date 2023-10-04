<Component>Hello world</Component>;

<Component>
	<div>Hello world</div>
</Component>;

<Component>
	<div>Hello</div> <div>World</div>
</Component>;

<Component>
	foo <div>bar</div> baz
</Component>;

<Component>
	foo <div>bar</div> baz <div>buzz</div>
</Component>;

<Component>
	foo <div>bar</div>
</Component>;

<Component>
	foo <div>bar</div> <div>baz</div>
</Component>;

<Component>
	<div>bar</div> baz
</Component>;

<Component>
	<div>foo</div> <div>bar</div> baz
</Component>;

<Component>{foo}</Component>;

<Component>foo {text}</Component>;

<Component>{text} bar</Component>;

<Component>foo {text} bar</Component>;

<Component>
	<div>foo</div> {text}
</Component>;

<Component>
	{text} <div>bar</div>
</Component>;

<Component>
	<div>foo</div> {text} <div>baz</div>
</Component>;

<Component value="John" />;

<Component value={value} />;

<Component value />;

<Component data-foo="Bar" />;

<Component data-foo={foo} />;

<Component data-foo />;

<Component {...props} />;

<Component {...before} value="John" />;

<Component {...before} value={value} />;

<Component {...before} value />;

<Component value="John" {...after} />;

<Component value={value} {...after} />;

<Component value {...after} />;

<Component {...before} value="John" {...after} />;

<Component {...before} value={value} {...after} />;

<Component {...before} value {...after} />;

<div>
	<Link>new</Link>
	{' | '}
	<Link>comments</Link>
	<Link>show</Link>
	{' | '}
	<Link>ask</Link>
	<Link>jobs</Link>
	{' | '}
	<Link>submit</Link>
</div>;

<Component>hello {...spread} world</Component>;

<Component>
	hello {...spread} <div></div> text
	<div></div> {...spread} <div></div> text <div></div>
</Component>;
