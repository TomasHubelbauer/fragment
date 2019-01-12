import { createElement, reconcile, p } from './lib.js';

test('recognizes first object argument as attributes and second string argument as children', () => {
  expect(createElement('element1')([ { props: true }, 'child' ]).outerHTML).toBe('<element1 props="true">child</element1>');
});

test('recognizes first object argument as attributes and second array of string argument as children', () => {
  expect(createElement('element2')([ { props: true }, [ 'child' ] ]).outerHTML).toBe('<element2 props="true">child</element2>');
});

test('recognizes first object argument as attributes and second and third string arguments as children', () => {
  expect(createElement('element3')([ { props: true }, 'child1', 'child2' ]).outerHTML).toBe('<element3 props="true">child1child2</element3>');
});

test('recognizes first array of string argument as children', () => {
  expect(createElement('element4')([ 'child' ]).outerHTML).toBe('<element4>child</element4>');
});

test('recognizes first array of array of string argument as children', () => {
  expect(createElement('element5')([ [ 'child' ] ]).outerHTML).toBe('<element5>child</element5>');
});

test('recognizes first array of strings argument as children', () => {
  expect(createElement('element6')([ 'child1', 'child2' ]).outerHTML).toBe('<element6>child1child2</element6>');
});

test('mounts to an empty element', () => {
  const target = document.createElement('div');
  reconcile(target, p('test'));
  expect(target.outerHTML).toBe('<div><p>test</p></div>');
});

test('updates text without overriding the element', () => {
  const target = document.createElement('div');
  const paragraph = p('test');
  reconcile(target, paragraph);
  reconcile(target, p('new text'));
  expect(target.children[0]).toBe(paragraph);
  expect(target.outerHTML).toBe('<div><p>new text</p></div>');
});

test('uses keys to reuse existing elements', () => {
  const target = document.createElement('div');
  const paragraph1 = p('1', { key: 1 });
  const paragraph2 = p('2', { key: 2 });
  const paragraph3 = p('3', { key: 3 });
  const paragraph4 = p('4', { key: 4 });
  
  reconcile(target, paragraph1, paragraph2, paragraph3);
  expect(target.children[0]).toBe(paragraph1);
  expect(target.children[1]).toBe(paragraph2);
  expect(target.children[2]).toBe(paragraph3);
  
  reconcile(target, paragraph2, paragraph3, paragraph4);
  expect(target.children[0]).toBe(paragraph2);
  expect(target.children[1]).toBe(paragraph3);
  expect(target.children[2]).toBe(paragraph4);
});
