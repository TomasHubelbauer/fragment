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

## Running

See the [**online demo**](https://tomashubelbauer.github.io/fragment/)

## Contributing

The project is in its early stages, please check with me in case of interest: [tomas@hubelbauer.net](tomas@hubelbauer.net).

### Roadmap

- [ ] When we're exhausted target node count and still have fragment nodes, add all in bulk using `DocumentFragment` for perf
- [ ] Provide a way to use the library as an ES module without having to introduce build process in the lib
- [ ] Obtain and publish an NPM package for Fragment
- [ ] Split indices for target children and fragment children and implement skipping `false` by increasing only fragment index
- [ ] Fix the demo chart not sliding, not updating styles of the `div` elements
