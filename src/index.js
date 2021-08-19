/**
 * @typedef {import('xdm/lib/compile').CompileOptions} MdxOptions
 * @typedef {{ exclude?: RegExp; options?: MdxOptions }} PluginOptions
 * @typedef {{ [key: string]: any }} WebpackConfig
 * @typedef {{ [key: string]: any; webpack?: (config: WebpackConfig, options: any) => WebpackConfig }} NextConfig
 */

/** @type {MdxOptions} */
const defaultOptions = {
  format: 'detect',
  remarkPlugins: [require('remark-frontmatter'), require('remark-gfm')],
}

/**
 * Creates Next.js plugin for mdx.
 *
 * @param {PluginOptions} [pluginOptions] Options
 */
function createMdxPlugin(pluginOptions = {}) {
  const xdmOptions = {
    ...defaultOptions,
    ...pluginOptions.options,
  }

  /** @type {(nextConfig: NextConfig) => NextConfig} */
  function createNextConfig(nextConfig = {}) {
    return {
      ...nextConfig,
      webpack(config, options) {
        config.module.rules.push({
          test: /\.(md|mdx)$/,
          exclude: pluginOptions.exclude,
          use: [
            options.defaultLoaders.babel,
            {
              loader: require.resolve('xdm/webpack.cjs'),
              options: xdmOptions,
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

  return createNextConfig
}

module.exports = createMdxPlugin
module.exports.defaults = defaultOptions
