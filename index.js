let mutated = false;
let counter = 0;
let deltaCount = 0;
let deltas = [];

function onMutateButtonClick() {
    mutated = true;
    render();
}

function onWorkButtonClick() {
    const title = document.title;
    for (let index = 0; index < 1000; index++) {
        document.title = index;
        document.title = title;
    }
}

function render() {
    const tpf = deltas.reduce((accumulator, current) => accumulator + current, 0) / deltas.length;
    reconcile(
        document.body,
        h1('Fragment'),
        p(
            'Welcome to Fragment! Fragment is a JavaScript library for building user interfaces. ',
            a({ href: 'https://github.com/TomasHubelbauer/fragment/', target: '_blank' }, 'Find out more including the source code on GitHub'),
        ),
        p('Fragment is similar to React in that it applies changes to DOM based on the difference between the two trees.'),
        p(
            'The main difference is that VDOM is not used (the current tree is captured in DOM) and JSX is not used. ',
            'Unfortunately, it is not possible to support JSX in plain JavaScript and one of the design goals of Fragment is to allow using it without a build process. ',
            'There are, however, helper functions (like ',
            code('div'),
            ', ',
            code('p'),
            ' etc…',
            ') exported in the library itself, which give you a nice and convenient way to build DOM UI tress.'
        ),
        h2('Demonstration'),
        p('You might want to check out the DOM Inspector developer tool and the updates it highlights as you go to press the demo button'),
        p(mutated
            ? 'The button has been pressed and the DOM has been updated accordingly.'
            : 'This line will change to reflect that you\'ve pressed the button.'
        ),
        !mutated && button({ onclick: onMutateButtonClick }, 'Demonstrate an update through DOM mutation'),
        h2('Performance'),
        p('Performance is not one of the primary goals of this library, but I am keeping an eye on it and will make changes to keep the library performant.'),
        p(
            code('requestAnimationFrame'),
            ' counter: ',
            b(counter.toString()),
        ),
        p(
            'Time per frame: ',
            b(Math.round(tpf)),
            ` ms over ${deltas.length} samples`
        ),
        p(
            'Frames per second: ',
            b(Math.round(1000 / tpf)),
            ` FPS over ${deltas.length} samples`
        ),
        div(
            ...deltas.map(delta => div({ style: `background: orange; display: inline-flex; height: ${Math.min(1000 / delta, 60)}px; margin: 1px; width: 2px;` })),
        ),
        button({ onclick: onWorkButtonClick }, 'Do work to slow down the FPS to show on the graph'),
    );
}

window.addEventListener('load', _ => {
    render();

    let timestamp = performance.now();
    window.requestAnimationFrame(function step(t) {
        counter++;
        const deltaCount = Math.floor(document.body.clientWidth / 4);
        document.title = deltas.length + ' ' + deltaCount + ' ' + timestamp;
        if (deltas.push(t - timestamp) > deltaCount) {
            for (let index = 0; index < deltas.length - deltaCount; index++) {
                deltas.shift();
            }
        }

        timestamp = t;
        render();
        window.requestAnimationFrame(step);
    });
});
