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
	watch: true
}

// module.exports = {
// 	mode: 'development',
// 	entry: './src/login.js',
// 	output:{
// 		path: path.resolve(__dirname, 'dist'),
// 		filename: 'login.js'
// 	},
// 	watch: true
// }


// module.exports = {
// 	mode: 'development',
// 	entry: './src/signup.js',
// 	output:{
// 		path: path.resolve(__dirname, 'dist'),
// 		filename: 'signup.js'
// 	},
// 	watch: true
// }
