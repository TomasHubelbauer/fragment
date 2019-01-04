# Fragment

A JavaScript library for building UIs.

Similar to React in spirit, but works differently:

- A UI is rendered to DOM
- An update is issued and UI is rendered into a fragment
- Comparison against the existing DOM is made
- Differences are reconciled on the existing DOM elements
  - Subtree additions carried out using a fragment for better performance

This is an idea only at this point, it may be a bad one, too.
