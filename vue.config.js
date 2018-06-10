// eslint-disable
const plugins = []
// if (process.env === 'production') {
//   const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//     .BundleAnalyzerPlugin
//   plugins.push(BundleAnalyzerPlugin)
// }
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
