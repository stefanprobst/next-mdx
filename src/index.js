/**
 * Create Next.js plugin for mdx.
 *
 * @param {{ remarkPlugins: Array<import('unified').Plugin>, rehypePlugins: Array<import('unified').Plugin> }} pluginOptions
 */
function createMdxPlugin(pluginOptions = {}) {
  return function createNextConfig(nextConfig = {}) {
    return {
      ...nextConfig,
      webpack(config, options) {
        config.module.rules.push({
          test: pluginOptions.extension || /\.(md|mdx)$/,
          exclude: pluginOptions.exclude,
          use: [
            options.defaultLoaders.babel,
            {
              loader: require.resolve('@mdx-js/loader'),
              options: pluginOptions.options,
            },
            {
              loader: require.resolve('./frontmatter'),
            },
          ],
        })

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options)
        }

        return config
      },
    }
  }
}

module.exports = createMdxPlugin
