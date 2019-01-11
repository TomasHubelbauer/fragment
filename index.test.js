import { create } from './lib.js';

test('tests that synchronous tests work', () => {
  console.log(create('element1', [ { props: true }, 'child' ]).outerHTML);
  expect(true).toBe(true);
});

test('recognizes first object argument as attributes and second string argument as children', () => {
  expect(create('element1', [ { props: true }, 'child' ]).outerHTML).toBe('<element1 props="true">child</element1>');
});

test('recognizes first object argument as attributes and second array of string argument as children', () => {
  expect(create('element2', [ { props: true }, [ 'child' ] ]).outerHTML).toBe('<element2 props="true">child</element2>');
});

test('recognizes first object argument as attributes and second and third string arguments as children', () => {
  expect(create('element3', [ { props: true }, 'child1', 'child2' ]).outerHTML).toBe('<element3 props="true">child1child2</element3>');
});

test('recognizes first array of string argument as children', () => {
  expect(create('element4', [ 'child' ]).outerHTML).toBe('<element4>child</element4>');
});

test('recognizes first array of array of string argument as children', () => {
  expect(create('element5', [ [ 'child' ] ]).outerHTML).toBe('<element5>child</element5>');
});

test('recognizes first array of strings argument as children', () => {
  expect(create('element6', [ 'child1', 'child2' ]).outerHTML).toBe('<element6>child1child2</element6>');
});
