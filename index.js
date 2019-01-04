let mutated = false;
let counter = 0;
let difference = 0;

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

function onMutateButtonClick() {
    mutated = true;
    render();
}

function render() {
    const content = div([
        h1('Hello, world!'),
        div(
            p('This is an experimental project'),
            // This could be improved by only changing the text and not the element
            mutated
                ? p('This change to DOM has been calculated')
                : p('Click the button to see what it does'),
            !mutated && button({ onclick: onMutateButtonClick }, 'Mutate the document'),
            // TODO: Allow numbers in
            p(
                'Counter: ',
                // TODO: See why `b` keeps flashing in the Inspector, probably is getting replaced? Or does it flash because the textContent changes?
                b(counter.toString())
            ),
            p(
                a({ href: 'https://github.com/TomasHubelbauer/fragment/', target: '_blank' }, 'See the source code on GitHub'),
            ),
            p('FPS: ' + difference)
        )
    ]);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(content);
    reconcile(fragment, document.body);
}

window.addEventListener('load', render);

let timestamp = performance.now();
window.requestAnimationFrame(function step(t) {
    counter++;
    difference = 1000 / (t - timestamp  );
    timestamp = t;
    render();
    window.requestAnimationFrame(step);
});
