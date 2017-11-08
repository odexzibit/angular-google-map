module.exports = {
	entry: './src/first.js',
	output: {
		filename: './dist/bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader'
				
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: 'file-loader?name=/images/[name].[ext]'
			}
		]
	}	
}