// eslint-disable
const plugins = []
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// plugins.push(new BundleAnalyzerPlugin())

const open = process.env === 'development'
module.exports = {
  devServer: {
    port: 3000,
    open,
  },
  configureWebpack(config) {
    return {
      plugins,
    }
  },
}
