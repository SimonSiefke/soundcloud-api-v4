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
}
