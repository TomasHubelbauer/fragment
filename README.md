# Fragment

Fragment is a JavaScript library for building user interfaces.

Fragment is similar to React, but can be used without compilation.
Your plain JavaScript projects served as static files can use Fragment to benefit from the
ability to update UIs by constructing new trees á la React, but without bundling.

Fragment doesn't support JSX, but does provide a set of helpers for easy tree building,
which attempts to bridge the gap. Unfortunately, JSX is not supportable in plain JavaScript.
(Everyone loves to have on E4X, but it would have been a great fit for something like this.)

## Installing

You can just link Fragment using a plain `script` tag.

```js
<script src="https://cdn.jsdelivr.net/gh/TomasHubelbauer/fragment/lib.js"></script>
```

We're working on making it available as an ES module as well:

```js
import reconcile, div from 'https://cdn.jsdelivr.net/gh/TomasHubelbauer/fragment/lib.js';
```

We're also working on providing an NPM library for the project.

```sh
npm install fragment
```

## Using

```js
// Basic tags like `div`, `p` etc. come with the library, this is how you add support for any tag
const tag = create('tag'); // Use like `tag(...attributesAndOrChildren)`

function render() {
    reconcile(
        // The target DOM node to apply the changes to
        document.body,
        // The rest of the arguments are the top-level nodes in the new rootless tree
        div(
            'Hello, world!',
            p('This is Fragment!'),
        )
    );
}
```

## Testing

[
  ![](https://tomashubelbauer.visualstudio.com/fragment/_apis/build/status/fragment-CI?branchName=master)
](https://tomashubelbauer.visualstudio.com/fragment/_build/latest?definitionId=13?branchName=master)

## Running

See the [**online demo**](https://tomashubelbauer.github.io/fragment/)

## Contributing

The project is in its early stages, please check with me in case of interest: [tomas@hubelbauer.net](tomas@hubelbauer.net).

### Roadmap

- [ ] Fix TypeScript errors in the pipeline
- [ ] Set up a release pipeline when they are available through YAML: https://stackoverflow.com/a/52323336/2715716
- [ ] Add TypeScript typings for use with `types` and consider providing as an ES module and NPM library only
- [ ] When we've exhausted target node count and still have fragment nodes, add all in bulk using `DocumentFragment` for perf
- [ ] Provide a way to use the library as an ES module without having to introduce build process in the lib
- [ ] Obtain and publish an NPM package for Fragment
- [ ] Split indices for target children and fragment children and implement skipping `false` by increasing only fragment index
- [ ] Fix the demo chart not sliding, not updating styles of the `div` elements
- [ ] Create a demo comparing Fragment with React and Vue
- [ ] Find a way to preserve focus on an element if it moves up or down among its neighbors (better diff)
- [ ] See if there is a good way to recognize binary attributes and allow setting them using booleans
- [ ] Add a mechanism for rendering raw HTML
- [ ] Find out if it is possible to freeze the target to avoid it changed while being worked on in `reconcile` (rendering e.g. `count` invalid)
- [ ] Set up a TypeScript type checking pipeline based on QR channel example
- [ ] Introduce keys and use them in reconciliation to preserve elements across sets not shift attribute updates
- [ ] Document performance monitoring approaches used to determine the performance characteristics of Fragments (space & time)
- [ ] Use `Element` methods instead of `setAttribute` to make binary attributes work
