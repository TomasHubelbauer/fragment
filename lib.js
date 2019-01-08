function reconcile(target, ...fragments) {
  let fragmentIndex = 0;
  let targetIndex = 0;
  while (fragmentIndex < fragments.length || targetIndex < target.childNodes.length) {
    const fragmentChild = fragments[fragmentIndex];
    const targetChild = target.childNodes[targetIndex];
    if (fragmentChild === undefined) {
      if (targetChild === undefined) {
        // TODO: See if we can freeze the target so we don't freak out if it changes from underneath us (e.g.: shrink the window on the perf graph)
        debugger;
        throw new Error(`Went out of bounds: ${fragmentIndex}/${fragments.length}, ${targetIndex}/${target.childNodes.length}`);
      } else {
        targetChild.remove();
      }
    } else if (fragmentChild === false) {
      // Move onto another fragment child but stay on the same target child
      fragmentIndex++;
      continue;
    } else {
      if (targetChild === undefined) {
        target.appendChild(fragmentChild);
        fragmentChild.dispatchEvent(new Event('mount'));
      } else {
        if (fragmentChild.nodeType === 1) {
          if (targetChild.nodeType === 1) {
            if (fragmentChild.tagName === targetChild.tagName) {
              if (fragmentChild.attributes.length > 0 || targetChild.attributes.length > 0) {
                for (let index = 0; index < fragmentChild.attributes.length; index++) {
                  const fragmentAttribute = fragmentChild.attributes[index];
                  const targetAttribute = targetChild.attributes.getNamedItem(fragmentAttribute.name);
                  if (targetAttribute === null) {
                    targetChild.setAttribute(fragmentAttribute.name, fragmentAttribute.value);
                  } else if (targetAttribute.value !== fragmentAttribute.value) {
                    targetAttribute.value = fragmentAttribute.value;
                  }
                }

                // Remove attributes that used to be but no longer are on the element
                for (let index = 0; index < targetChild.attributes.length; index++) {
                  const attribute = targetChild.attributes[index];
                  if (fragmentChild.attributes.getNamedItem(attribute.name) === null) {
                    targetChild.attributes.removeNamedItem(attribute.name);
                  }
                }
              }

              reconcile(targetChild, ...fragmentChild.childNodes);
            } else {
              // TODO: Use `replaceWith` once available in Safari: https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith#Browser_compatibility
              target.replaceChild(fragmentChild, targetChild);
            }
          } else if (targetChild.nodeType === 3) {
            // TODO: Use `replaceWith` once available in Safari: https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith#Browser_compatibility
            target.replaceChild(fragmentChild, targetChild);
          } else {
            throw new Error(`Unexpected node type ${targetChild.nodeType}`);
          }
        } else if (fragmentChild.nodeType === 3) {
          if (targetChild.textContent !== fragmentChild.textContent) {
            targetChild.textContent = fragmentChild.textContent
          }
        } else {
          throw new Error(`Unexpected node type ${fragmentChild.nodeType}`);
        }
      }

      fragmentIndex++;
      targetIndex++;
    }
  }
}

// TODO: Find out if `attributesOrChildren` can be made `...attributesOrChildren` here, too,
// but be careful about `const tag = (...attributesOrChildren) => create('tag', ...attributesOrChildren)` cloning the array (dunno if it would)
function create(tag, attributesOrChildren) {
  if (attributesOrChildren === undefined) {
    return (...attributesOrChildren) => create(tag, attributesOrChildren);
  }

  const element = document.createElement(tag);
  const [first, ...others] = attributesOrChildren;
  let attributes;
  let children;
  if (first === undefined) {
    // Ignore, no  children
    return element;
  } else if (first instanceof Array) {
    if (others.length === 0) {
      children = first;
    } else {
      throw new Error('Put array instead of object for props.');
    }
  } else if (typeof first === 'string') {
    children = attributesOrChildren;
  } else if (typeof first === 'number') {
    children = attributesOrChildren;
  } else if (first instanceof Node) {
    children = attributesOrChildren;
  } else if (typeof first === 'object' && others instanceof Array) {
    if (others.length === 1 && others[0] instanceof Array) {
      attributes = first;
      children = others[0];
    } else {
      attributes = first;
      children = others;
    }
  } else {
    throw new Error('Invalid combination of attributes and children argument values');
  }

  if (attributes !== undefined) {
    for (let key of Object.keys(attributes)) {
      const value = attributes[key];
      // TODO: Find a better way to detect if an attribute name is an event
      if (key.startsWith('on')) {
        element.addEventListener(key.slice(2), value);
      } else if (value !== undefined) {
        element.setAttribute(key, value);
      }
    }
  }

  if (children !== undefined) {
    for (let child of children) {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (typeof child === 'number') {
        element.appendChild(document.createTextNode(child.toString()));
      } else if (child instanceof Node) {
        element.appendChild(child);
      } else if (child === false || child === null || child === undefined) {
        // Ignore empty children
      } else {
        throw new Error('Invalid child');
      }
    }
  }

  return element;
}

// TODO: https://developer.mozilla.org/en-US/docs/Web/HTML/Element
const div = create('div');
const h1 = create('h1');
const h2 = create('h2');
const h3 = create('h3');
const h4 = create('h4');
const h5 = create('h5');
const h6 = create('h6');
const p = create('p');
const button = create('button');
const code = create('code');
const b = create('b');
const a = create('a');
const details = create('details');
const summary = create('summary');
const span = create('span');
