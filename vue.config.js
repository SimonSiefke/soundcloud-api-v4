// eslint-disable
const plugins = []
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// plugins.push(new BundleAnalyzerPlugin())

// const preCacheBlackList = [
//   /component-chromecast-wrapper/,
//   /audio-player-chrome-cast-wrapper/,
//   /store-module-audio/,
//   /audio-player-chromecast/,
//   /audio-player-local-device/,
// ]

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
