// Copyright 2018 Kensho Technologies, LLC.

const keyValueReducer = (a, b) => `${a}${b}`

export default function crossProduct(aValues, bValues, reducer = keyValueReducer) {
  const result = []
  for (let i = 0; i < aValues.length; i += 1) {
    for (let j = 0; j < bValues.length; j += 1) {
      result.push(reducer(aValues[i], bValues[j]))
    }
  }
  return result
}
