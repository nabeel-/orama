// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import shallowRender from '../helpers/shallowRender'
import Canvas from '../../src/canvas/Canvas'

test('Canvas', () => {
  const component = shallowRender(<Canvas render={() => {}} theme={{}} />)
  assert.strictEqual(component.type, 'canvas')
})