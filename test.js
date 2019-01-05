const tests = [
    [create('element1', [ { props: true }, 'child' ]), '<element1 props="true">child</element1>'],
    [create('element2', [ { props: true }, [ 'child' ] ]), '<element2 props="true">child</element2>'],
    [create('element3', [ { props: true }, 'child1', 'child2' ]), '<element3 props="true">child1child2</element3>'],
    [create('element4', [ 'child' ]), '<element4>child</element4>'],
    [create('element5', [ [ 'child' ] ]), '<element5>child</element5>'],
    [create('element6', [ 'child1', 'child2' ]), '<element6>child1child2</element6>'],
];

for (const test of tests) {
    const result = test[0].outerHTML;
    if (result !== test[1]) {
        console.error(result, '\n', test[1]);
    }
}
