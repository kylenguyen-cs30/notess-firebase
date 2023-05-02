const path = require('path')


module.exports = {
	mode: 'development',
	entry: { 
		index: './src/index.js',
		signup:  './src/signup.js',
		login: './src/login.js'
	},
	output:{
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	watch: true,
	experiments: {
		topLevelAwait: true
	}
}

