var path = require('path'),
	webpack = require('webpack'),
	node_modules_dir = path.resolve(__dirname,'node_modules')
var config = {
	entry:{
		bundle:path.resolve(__dirname,'src/main.js')
	},
	output:{
		path:path.resolve(__dirname,'build'),
		filename:'[name].js'
	},
	module:{
		loaders:[
			{test: /\.jsx?$/,exclude: [node_modules_dir],loader:'babel-loader'},
			{test:/\.css$/,loader:'style!css'},
			{test: /\.scss$/,loader:'style!css!sass'},
			{test:/\.(jpe?g|png|gif|svg)$/i,loader:'url?limit=25000'},
			{test:/\.mp4$/,loader:'file-loader'}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin("init.js"),
		new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
	],
	devtool: 'source-map',
}

module.exports = config
