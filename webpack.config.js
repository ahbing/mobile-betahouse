var path = require('path'),
  webpack = require('webpack'),
  node_modules_dir = path.resolve(__dirname,'node_modules')

var config = {
  entry:[
    'webpack/hot/dev-server',
    path.resolve(__dirname,'src/main.js')
  ],
  output:{
    path:path.resolve(__dirname,'dev'),
    filename:'bundle.js',
  },
  module:{
    loaders:[
      {test:/\.jsx?$/,exclude:[node_modules_dir],loader:'babel-loader'},
      {test:/\.css$/,loader:'style!css'},
      {test:/\.scss$/,loader:'style!css!sass'},
      {test:/\.(jpe?g|png|gif|svg&)/i,loader:'url?limit=25000'},
      {test:/\.mp4$/,loader:'file-loader'}
    ]
  }
}

module.exports = config
