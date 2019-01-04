# Fragment

A JavaScript library for building UIs.

Similar to React in spirit, but works differently:

- A UI is rendered to DOM
- An update is issued and UI is rendered into a fragment
- Comparison against the existing DOM is made
- Differences are reconciled on the existing DOM elements
  - [ ] Subtree additions carried out using a fragment for better performance

## Installing

```js
<script src="https://cdn.jsdelivr.net/gh/TomasHubelbauer/fragment/lib.js"></script>
```

## Using

```js
// Basic tags come in the library, this is how you add support for any tag
const tag = (...attributesOrChildren) => create('tag', attributesOrChildren);

function render() {
    const content = div('Hello, world!', p('This is Fragment!'));
    const fragment = document.createDocumentFragment();
    fragment.appendChild(content);
    reconcile(fragment, document.body);
}
```

## Running

See the [**online demo**](https://tomashubelbauer.github.io/fragment/)

## Contributing

### Roadmap

- [ ] Do not attach handlers repeatedly (this may be a no-op tho so maybe is okay)
- [ ] When we're exhausted target node count and still have fragment nodes, add all in bulk using fragment
