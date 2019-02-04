// This file is separate from the rest of the repo for now, I am trying to pivot the library and this file should become the main

function makeVoid(type) {
  return (props) => React.createElement(type, props);
}

function makeNonVoid(type) {
  return (...propsAndOrChildren) => {
    if (propsAndOrChildren.length === 0) {
      return React.createElement(type);
    }

    // Accepts object as props as long as it is an object which is not a React element instance ($$typeof === Symbol) or an array
    if (typeof propsAndOrChildren[0] === 'object' && !(propsAndOrChildren[0] instanceof Array) && !propsAndOrChildren[0].$$typeof) {
      return React.createElement(type, propsAndOrChildren[0], ...propsAndOrChildren.slice(1));
    }

    return React.createElement(type, undefined, ...propsAndOrChildren);
  };
}

// TODO: Finalize this list https://developer.mozilla.org/en-US/docs/Web/HTML/Element
// TODO: Verify I got non void and void elements correctly: https://developer.mozilla.org/en-US/docs/Glossary/Empty_element

const a = makeNonVoid('a');
const abbr = makeNonVoid('abbr');
const address = makeNonVoid('address');
const area = makeNonVoid('area');
const article = makeNonVoid('article');
const aside = makeNonVoid('aside');
const audio = makeVoid('audio');
const b = makeNonVoid('b');
const br = makeVoid('br');
const blockquote = makeNonVoid('blockquote');
const button = makeNonVoid('button');
const canvas = makeNonVoid('canvas');
const cite = makeNonVoid('cite');
const code = makeNonVoid('code');
const data = makeNonVoid('data');
const dd = makeNonVoid('dd');
const dl = makeNonVoid('dl');
const dt = makeNonVoid('dt');
const dir = makeNonVoid('dir');
const div = makeNonVoid('div');
const em = makeNonVoid('em');
const figcaption = makeNonVoid('figcaption');
const figure = makeNonVoid('figure');
const footer = makeNonVoid('footer');
const h1 = makeNonVoid('h1');
const h2 = makeNonVoid('h2');
const h3 = makeNonVoid('h3');
const h4 = makeNonVoid('h4');
const h5 = makeNonVoid('h5');
const h6 = makeNonVoid('h6');
const header = makeNonVoid('header');
const hgroup = makeNonVoid('hgroup');
const hr = makeVoid('hr');
const i = makeNonVoid('i');
const iframe = makeNonVoid('iframe');
const img = makeVoid('img');
const input = makeVoid('input');
const kbd = makeNonVoid('kbd');
const label = makeNonVoid('label');
const li = makeNonVoid('li');
const main = makeNonVoid('main');
const map = makeNonVoid('map');
const mark = makeNonVoid('mark');
const nav = makeNonVoid('nav');
const ol = makeNonVoid('ol');
const p = makeNonVoid('p');
const picture = makeNonVoid('picture');
const pre = makeNonVoid('pre');
const progress = makeVoid('progress');
const q = makeNonVoid('q');
const s = makeNonVoid('s');
const samp = makeNonVoid('samp');
const section = makeNonVoid('section');
const small = makeNonVoid('small');
const source = makeVoid('source');
const span = makeNonVoid('span');
const strong = makeNonVoid('strong');
const sub = makeNonVoid('sub');
const sup = makeNonVoid('sup');
const time = makeNonVoid('time');
const track = makeVoid('track');
const tt = makeNonVoid('tt');
const ul = makeNonVoid('ul');
const video = makeNonVoid('video');
const wbr = makeNonVoid('wbr');
