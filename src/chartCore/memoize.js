// Copyright 2018 Kensho Technologies, LLC.

import {map, pick} from 'lodash'

import crossProduct from '../utils/crossProduct'

import getDimArrays from './getDimArrays'
import getLayer from './getLayer'
import getPlotRect from './getPlotRect'
import {getDomains, getRanges, getScales, getTickCounts, getTypes} from './getForProps'
import {
  rerunCheckGetDimArrays,
  rerunCheckGetTypes,
  rerunCheckGetDomains,
  rerunCheckGetRanges,
  rerunCheckGetPlotRect,
  rerunCheckGetTickCounts,
  rerunCheckGetRenderLayers,
} from './rerunChecks'

export function getMemoize(rerunCheck, transformFunc) {
  let savedResult
  let prevProps = {}
  return function memoizer(props) {
    const rerun = rerunCheck(props, prevProps)
    prevProps = props
    if (rerun) savedResult = transformFunc(props)
    return savedResult || transformFunc(props)
  }
}

function areDependentsEqual(dependents, prevProps, props) {
  return dependents.every(key => prevProps[key] === props[key])
}

function getAttributeMemoized(transformFunc, namedKeys, rootKeys = []) {
  let memoized
  let prevProps = {}
  return function memoizer(props) {
    const dependents = [...rootKeys, ...crossProduct(props.groupedKeys, namedKeys)]
    const shouldRecompute = areDependentsEqual(dependents, prevProps, props)
    if (shouldRecompute || !memoized)
      memoized = transformFunc(pick(props, dependents), props.groupedKeys)
    prevProps = props
    return memoized
  }
}

export const getMemoizeDimArrays = () => getMemoize(rerunCheckGetDimArrays, getDimArrays)
export const getMemoizeTypes = () => getMemoize(rerunCheckGetTypes, getTypes)
export const getMemoizeDomains = () => getMemoize(rerunCheckGetDomains, getDomains)
export const getMemoizePlotRect = () => getMemoize(rerunCheckGetPlotRect, getPlotRect)
export const getMemoizeRanges = () => getMemoize(rerunCheckGetRanges, getRanges)
export const getMemoizeTickCounts = () => getMemoize(rerunCheckGetTickCounts, getTickCounts)
export const getMemoizeRenderLayer = () => getMemoize(rerunCheckGetRenderLayers, getLayer)

export const getMemoizeScales = () =>
  getAttributeMemoized(getScales, ['Type', 'Domain', 'Range', 'TickCount', 'Nice'])

export function getMemoizeRenderLayers() {
  const layersMemoize = []
  return function memoizeForLayers(props) {
    const renderLayers = map(props.layers, (layer, i) => {
      let layerMemoize = layersMemoize[i]
      if (!layerMemoize) {
        layersMemoize[i] = getMemoizeRenderLayer()
        layerMemoize = layersMemoize[i]
      }
      return layerMemoize({...props, ...layer})
    })
    return renderLayers
  }
}
