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

#### Infrastructure

- [ ] Use [TypeScript type comments](https://github.com/TomasHubelbauer/ts-comment-types) instead of lame JSDoc
- [ ] Set up an [`.npmignore`](https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package) for `publish` to use
- [ ] Tag releases manually for now and plan to tag the `master` branch automatically from the pipeline using the GitHub API
- [ ] Set up creating automatic GitHub releases: https://developer.github.com/v3/repos/releases/#create-a-release
- [ ] See if we can derive new version number from existing tags in the pipeline (can we get the tag in pipeline variables?)
- [ ] Change the deployment part of the pipeline to Release once YAML is supported: https://stackoverflow.com/a/52323336/2715716
- [ ] Fix the remaining TypeScript errors in the pipeline
- [ ] Await to see if either `fragment` or `fragmentjs` package name will be donated and migrate to it if either

#### Development

- [ ] Change to "partial VDOM" - input fragments are plain objects and we convert to DOM in reconcile, but we read from real DOM
- [ ] When we've exhausted target node count and still have fragment nodes, add all in bulk using `DocumentFragment` for perf
- [ ] Add support for keys
  - Will fix chart in showcase sliding attributes from one to another instead of just removing first then appending a new `div`
  - Will fix `input` focus not moving with an element in a line if it changes within its set
- [ ] See if there is a good way to recognize binary attributes and allow setting them using booleans (`setAttribute`?)
  - [ ] Use `Element` methods instead of `setAttribute` to make binary attributes work - days later: which is it?
- [ ] Use a mutation observer to be able to tell the DOM has changed while reconciling but not by us and restart reconciliation
  - https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

#### Future

- [ ] Create a demo comparing Fragment with React and Vue
- [ ] Add a mechanism for rendering raw HTML
- [ ] Document performance monitoring approaches used to determine the performance characteristics of Fragments (space & time)
- [ ] Add a license file
