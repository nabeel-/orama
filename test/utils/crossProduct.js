// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import crossProduct from '../../src/utils/crossProduct'

test('utils.crossProduct empty arrays', () => {
  assert.deepEqual(crossProduct([], []), [])
})
test('utils.crossProduct produces the cross product', () => {
  assert.deepEqual(crossProduct(['a', 'b'], ['c', 'd']), ['ac', 'ad', 'bc', 'bd'])
})
test('utils.crossProduct accepts a custom reducer', () => {
  assert.deepEqual(crossProduct([1, 2], [3, 4], (a, b) => a + b), [4, 5, 5, 6])
})
