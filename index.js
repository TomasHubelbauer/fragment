let mutated = false;
let counter = 0;
let delta = 0;

function onMutateButtonClick() {
    mutated = true;
    render();
}

function render() {
    reconcile(
        document.body,
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
            p('FPS: ' + delta)
        ),
    );
}

window.addEventListener('load', render);

let timestamp = performance.now();
window.requestAnimationFrame(function step(t) {
    counter++;
    delta = 1000 / (t - timestamp  );
    timestamp = t;
    render();
    window.requestAnimationFrame(step);
});
