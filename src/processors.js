const mdx = require('@mdx-js/mdx')
const matter = require('gray-matter')

exports.frontmatter = function (source) {
  const { content, data } = matter(source)
  const code = `export const metadata = ${JSON.stringify(data)};\n\n${content}`
  return code
}

exports.mdx = function (source, options) {
  const code = `import {mdx} from '@mdx-js/react';${mdx.sync(source, options)}`
  return code
}
