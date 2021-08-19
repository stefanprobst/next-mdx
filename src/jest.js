const babel = require('babel-jest').default
const {
  createFormatAwareProcessors,
} = require('xdm/lib/util/create-format-aware-processors')

/**
 * @typedef {import('xdm/lib/compile').CompileOptions} MdxOptions
 */

/** @type {(userOptions?: MdxOptions) => import('@jest/transform').SyncTransformer} */
function createTransformer(userOptions = {}) {
  return {
    process(sourceText, sourcePath, transformOptions) {
      const xdm = createFormatAwareProcessors(userOptions)
      const jsx = String(xdm.processSync(sourceText))
      const processed = babel.process(jsx, sourcePath, transformOptions)
      return typeof processed === 'string' ? processed : processed.code
    },
  }
}

/**
 * Jest transformer for mdx.
 *
 * @type {import('@jest/transform').SyncTransformer}
 */
const transformer = {
  ...createTransformer(),
  createTransformer,
}

module.exports = transformer
