const unified = require('unified')
const parse = require('remark-parse')
const stringify = require('remark-stringify')

const { recursiveSearch } = require('./utils.js')

const parser = unified()
  .use(parse, { commonmark: true })
  .use(stringify, { commonmark: true })

const R_DEFINE = /^\/\/= ?([^\n]*) ?\n?/g
const R_IMPORT = /\/\/: ?([^\n]*) ?\n?/g

module.exports = function process (input) {
  let predicate = o => o && o.type === 'code'
  let ast = parser.parse(input)

  let code = recursiveSearch(ast, predicate)

  let blocks = {}

  let oblocks = code.filter(({ path, value: entry }) => {
    let text = entry.value

    let defineRe = R_DEFINE.exec(text)

    if (defineRe !== null) {
      blocks[defineRe[1]] = text.replace(R_DEFINE, '')
      return false
    }

    return true
  })

  let output = oblocks.map(({ path, value: entry }) => {
    return entry.value.replace(R_IMPORT, (match, p1) => {
      return blocks[p1]
    })
  })

  return output.join('\n')
}
