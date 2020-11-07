module.exports = (pluginOptions = {}) => (nextConfig = {}) => {
  const extension = pluginOptions.extension || /\.(md|mdx)$/
  return {
    ...nextConfig,
    webpack(config, options) {
      config.module.rules.push({
        test: extension,
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
