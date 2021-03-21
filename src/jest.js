const { process } = require('babel-jest')
const processors = require('./processors')

/** @type {(userOptions: { remarkPlugins: Array<import('unified').Plugin>, rehypePlugins: Array<import('unified').Plugin> }) => import('@jest/transform').Transformer} */
function createTransformer(userOptions) {
  return {
    process(sourceText, sourcePath, config, options) {
      const code = processors.frontmatter(sourceText)
      const jsx = processors.mdx(code, userOptions)
      const processed = process(jsx, sourcePath, config, options)
      return 'code' in processed ? processed.code : processed
    },
  }
}

/**
 * Jest transformer for mdx.
 *
 * @type {import('@jest/transform').Transformer}
 */
const transformer = {
  ...createTransformer({}),
  createTransformer,
}

module.exports = transformer
