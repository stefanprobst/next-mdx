const processors = require('./processors')

module.exports = function frontmatter(source) {
  const callback = this.async()
  const code = processors.frontmatter(source)
  return callback(null, code)
}
