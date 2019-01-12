# Fragment

Fragment is a JavaScript library for building user interfaces.

Fragment is similar to React, but can be used without compilation.
Your plain JavaScript projects served as static files can use Fragment to benefit from the
ability to update UIs by constructing new trees á la React, but without bundling.

Fragment doesn't support JSX, but does provide a set of helpers for easy tree building,
which attempts to bridge the gap. Unfortunately, JSX is not supportable in plain JavaScript.
(Everyone loves to have on E4X, but it would have been a great fit for something like this.)

## Installing

You can use Fragment as an ES module:

```js
import reconcile, { div } from 'https://cdn.jsdelivr.net/npm/fragmentui/lib.js';
```

We're also working on providing an NPM library for the project.

```sh
npm install fragmentui
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

- [ ] Consider making this a straight-up TypeScript project because JSDoc is just too unwieldy for something like this
  - It all depends on if I can get the GitHub releases & NPM pipeline to work as well as JSDelivr from npmjs.or for the lib file
- [ ] Fix TypeScript errors in the pipeline
- [ ] Set up an NPM release pipeline when they are available through YAML: https://stackoverflow.com/a/52323336/2715716
  - [ ] Until then do it in a build pipeline
  - [ ] Create a GitHub release as well
- [ ] When we've exhausted target node count and still have fragment nodes, add all in bulk using `DocumentFragment` for perf
- [ ] Obtain and publish an NPM package for Fragment
  - [ ] Await donation answer for `fragment`
  - [ ] Await donation answer for `fragmentjs`
- [ ] Add support for keys
  - Will fix chart in showcase sliding attributes from one to another instead of just removing first then appending a new `div`
  - Will fix `input` focus not moving with an element in a line if it changes within its set
- [ ] Create a demo comparing Fragment with React and Vue
- [ ] See if there is a good way to recognize binary attributes and allow setting them using booleans (`setAttribute`?)
  - [ ] Use `Element` methods instead of `setAttribute` to make binary attributes work - days later: which is it?
- [ ] Add a mechanism for rendering raw HTML
- [ ] Use a mutation observer to be able to tell the DOM has changed while reconciling but not by us and restart reconciliation
  - https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
- [ ] Document performance monitoring approaches used to determine the performance characteristics of Fragments (space & time)
