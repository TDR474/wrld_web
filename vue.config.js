const webpack = require('webpack');

module.exports = {
  devServer: {
    allowedHosts: "all"
  },
  configureWebpack: {
    plugins: [
      new webpack.ProgressPlugin()
    ]
  }
}
