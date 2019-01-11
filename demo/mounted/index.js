import reconcile, { p } from '../../lib.js';

let mounted = false;

function onParagraphMount() {
    mounted = true;
    render();
}

function render() {
    reconcile(
        document.body,
        p({ onmount: onParagraphMount }, 'A paragraph will show underneath this one, hell yeah.'),
        mounted && p({}, 'Yep, it has'),
        p('This is a third paragraph.'),
    )
}

window.addEventListener('load', render);
