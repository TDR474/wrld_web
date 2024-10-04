const webpack = require('webpack');

module.exports = {
  devServer: {
    allowedHosts: ['.lucid-labs.xyz', 'www.lucid-labs.xyz','https://wrldweb.up.railway.app/','https://lucidlabs.up.railway.app/'],
  },
  configureWebpack: {
    plugins: [
      new webpack.ProgressPlugin()
    ]
  }
}
