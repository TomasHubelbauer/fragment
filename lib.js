function reconcile(target, ...fragments) {
    // TODO: Make this `const` again once the TODO below has been addressed
    let count = Math.max(fragments.length, target.childNodes.length);
    // TODO: Keep the indices separately so that we can skip `false`, `null` etc in fragments by increasing the fragment index and retrying with the same target child    
    for (let index = 0; index < count; index++) {
        const fragmentChild = fragments[index];
        const targetChild = target.childNodes[index];
        if (fragmentChild === undefined) {
            if (targetChild === undefined) {
                throw new Error(`Count ${count} went out of bounds: ${fragments.length}, ${target.childNodes.length}`);
            } else {
                // TODO: .raiseEvent(document.createEvent('unmount'))
                targetChild.remove();
            }
        } else if (fragmentChild === false) {
            /* TODO: See the TODO comment above for how to get rid of this hack with separate indices for fragment and target */

            // Remote the `false` from fragments
            fragments.splice(index, 1);

            // Prevent increase of the `index`, we want to retry with it without the `false` fragment child
            index--;

            // Refresh the count now that we've messed with the children
            count = Math.max(fragments.length, target.childNodes.length);

            // Retry finally without the `false`
            continue;
        } else {
            if (targetChild === undefined) {
                // TODO: .raiseEvent(document.createEvent('mount'))
                target.appendChild(fragmentChild);
            } else {
                if (fragmentChild.nodeType === 1) {
                    if (targetChild.nodeType === 1) {
                        if (fragmentChild.tagName === targetChild.tagName) {
                            // TODO: Reconcile attributes
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
            // TODO: Find a better way to detect if an attribute name is an event
            if (key.startsWith('on')) {
                element.addEventListener(key.slice(2), attributes[key]);
            } else {
                const attribute = document.createAttribute(key);
                attribute.value = attributes[key];
                element.attributes.setNamedItem(attribute);
            }
        }
    }

    if (children !== undefined) {
        for (let child of children) {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (typeof child === 'number') {
                element.appendChild(document.createTextNode(child));
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
