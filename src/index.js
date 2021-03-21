/**
 * @typedef {{ remarkPlugins?: Array<import('unified').Plugin>; rehypePlugins?: Array<import('unified').Plugin> }} MdxOptions
 */

/**
 * @typedef {{ extension?: RegExp; exclude?: RegExp; options?: MdxOptions }} PluginOptions
 */

/**
 * Create Next.js plugin for mdx.
 *
 * @param {PluginOptions} [pluginOptions] Options
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
