// eslint-disable
const plugins = []
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin

// plugins.push(new BundleAnalyzerPlugin())

module.exports = {
  devServer: {
    port: 3000,
    open: false,
  },
  configureWebpack(config) {
    return {
      plugins,
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('vue')

    // clear all existing loaders.
    // if you don't do this, the loader below will be appended to
    // existing loaders of the rule.
    // svgRule.uses.clear()

    // add replacement loader(s)
    svgRule.use('vue-svg-inline-loader').loader('vue-svg-inline-loader')
  },
}
