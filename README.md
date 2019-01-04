# Fragment

A JavaScript library for building UIs.

Similar to React in spirit, but works differently:

- A UI is rendered to DOM
- An update is issued and UI is rendered into a fragment
- Comparison against the existing DOM is made
- Differences are reconciled on the existing DOM elements
  - [ ] Subtree additions carried out using a fragment for better performance

## Running

See the [**online demo**](https://tomashubelbauer.github.io/fragment/)

## Contributing

### Roadmap

- [ ] Do not attach handlers repeatedly (this may be a no-op tho so maybe is okay)
- [ ] When we're exhausted target node count and still have fragment nodes, add all in bulk using fragment
