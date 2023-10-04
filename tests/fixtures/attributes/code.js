<input value="" readonly disabled="" />;

<div draggable="true"></div>;

<div data-foo="&quot; ' < > &"></div>;

<div>
	<label for={'name'}></label>
	<input id={'name'} />
</div>;

<div>
	<label for={id + 'name'}></label>
	<input id={id + 'name'} />
</div>;

<input value={text} />;

<div style="background-color: green"></div>;

<div style={'background-color: blue'}></div>;

<div style={style}></div>;

<div style={{ 'background-color': 'red' }}></div>;

<div style={{ 'background-color': bgColor }}></div>;

<div style={{ ...style, 'background-color': 'blue' }}></div>;

<input {...props} />;

<input {...before} readonly />;

<input {...before} readonly={readonly} />;

<input readonly {...after} />;

<input readonly={readonly} {...after} />;

<input {...before} readonly {...after} />;

<input {...before} readonly={readonly} {...after} />;

<input {...before} {...after} />;

<input {...before} readonly {...after} disabled />;

<input {...before} readonly={readonly} {...after} disabled={disabled} />;

<input {...{ value: value }} />;

<input {...{ value: value }} {...{ disabled: disabled }} />;

<input {...{ value: '' }} />;

<input {...{ value: '' }} {...{ disabled: true }} />;

<input data-foo="foo" data-bar="bar" data-baz="baz" />;

<input data-foo=" foo" data-bar="bar" data-baz="baz" />;

<input data-foo="foo" data-bar=" bar" data-baz="baz" />;

<input data-foo="foo" data-bar="bar" data-baz=" baz" />;

<input data-foo=" foo" data-bar=" bar" data-baz="baz" />;

<input data-foo=" foo" data-bar="bar" data-baz=" baz" />;

<input data-foo="foo" data-bar=" bar" data-baz=" baz" />;

<input data-foo=" foo" data-bar=" bar" data-baz=" baz" />;

<input data-foo="foo" data-bar={bar} data-baz="baz" />;

<input data-foo="foo " data-bar={bar} data-baz="baz" />;

<input data-foo="<" />;

<input data-foo=">" />;

<input data-foo="&" />;

<input data-foo='"' />;

<input data-foo="'" />;
