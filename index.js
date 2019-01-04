let mutated = false;
let counter = 0;

// TODO: Find out if `attributesOrChildren` can be made `...attributesOrChildren` here, too,
// but be careful about `const tag = (...attributesOrChildren) => create('tag', ...attributesOrChildren)` cloning the array (dunno if it would)
function create(tag, attributesOrChildren) {
    const element = document.createElement(tag);
    const [first, ...others] = attributesOrChildren;
    let attributes;
    let children;
    if (first instanceof Array) {
        if (others.length === 0) {
            children = first;
        } else {
            throw new Error('Put array instead of object for props.');
        }
    } else if (typeof first === 'string') {
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

const tests = [
    [create('element1', [ { props: true }, 'child' ]), '<element1 props="true">child</element1>'],
    [create('element2', [ { props: true }, [ 'child' ] ]), '<element2 props="true">child</element2>'],
    [create('element3', [ { props: true }, 'child1', 'child2' ]), '<element3 props="true">child1child2</element3>'],
    [create('element4', [ 'child' ]), '<element4>child</element4>'],
    [create('element5', [ [ 'child' ] ]), '<element5>child</element5>'],
    [create('element6', [ 'child1', 'child2' ]), '<element6>child1child2</element6>'],
];

for (const test of tests) {
    const result = test[0].outerHTML;
    if (result !== test[1]) {
        console.error(result, '\n', test[1]);
    }
}

const div = (...attributesOrChildren) => create('div', attributesOrChildren);
const h1 = (...attributesOrChildren) => create('h1', attributesOrChildren);
const p = (...attributesOrChildren) => create('p', attributesOrChildren);
const button = (...attributesOrChildren) => create('button', attributesOrChildren);
const b = (...attributesOrChildren) => create('b', attributesOrChildren);

function onMutateButtonClick() {
    mutated = true;
    render();
}

function render() {
    const content = div([
        h1('Hello, world!'),
        div(
            p('This is an experimental project'),
            // This could be improved by only changing the text and not the element
            mutated
                ? p('This change to DOM has been calculated')
                : p('Click the button to see what it does'),
            !mutated && button({ onclick: onMutateButtonClick }, 'Mutate the document'),
            // TODO: Allow numbers in
            p(
                'Counter: ',
                // TODO: See why `b` keeps flashing in the Inspector, probably is getting replaced? Or does it flash because the textContent changes?
                b(counter.toString())
            ),
        )
    ]);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(content);
    reconcile(fragment, document.body);
}

function reconcile(fragment, target) {
    const count = Math.max(fragment.childNodes.length, target.childNodes.length);
    for (let index = 0; index < count; index++) {
        const fragmentChild = fragment.childNodes[index];
        const targetChild = target.childNodes[index];
        if (fragmentChild === undefined) {
            if (targetChild === undefined) {
                throw new Error(`Count ${count} went out of bounds: ${fragment.childNodes.length}, ${target.childNodes.length}`);
            } else {
                // TODO: .raiseEvent(document.createEvent('unmount'))
                targetChild.remove();
            }
        } else {
            if (targetChild === undefined) {
                // TODO: .raiseEvent(document.createEvent('mount'))
                target.appendChild(fragmentChild);
            } else {
                if (fragmentChild.nodeType === 1) {
                    if (targetChild.nodeType === 1) {
                        if (fragmentChild.tagName === targetChild.tagName) {
                            // TODO: Reconcile attributes
                            reconcile(fragmentChild, targetChild);
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

window.addEventListener('load', render);

window.setInterval(() => {
    counter++;
    render();
}, 100);
