module.exports = {}

module.exports.recursiveSearch = function recursiveSearch (obj, matcher, path = '') {
  let result = []

  if (Array.isArray(obj)) {
    result = result.concat(...value.map((o, i) => recursiveSearch(o, matcher, `${path}.${i}`)))
  } else if (typeof obj === 'object' && obj !== null) {
    if (matcher(obj)) {
      result.push({ path: path, value: obj })
    }

    for (let [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        result = result.concat(...value.map((o, i) => recursiveSearch(o, matcher, `${path}.${key}.${i}`)))
      } else if (typeof value === 'object' && value !== null) {
        let p = `${path}.${key}`

        if (matcher(value)) {
          result.push({ path: p, value: value })
        }

        result = result.concat(recursiveSearch(value, matcher, p))
      }
    }
  }

  return result.map(e => ({ path: e.path.replace(/^\./g, ''), value: e.value }))
}
