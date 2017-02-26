
var environment = {};

try {
	environment = require('./environment.js');
} catch(e) {}

module.exports = [
	{
		entry: "./index.js",
		output: {
			filename: "index.js"
		},
		module: {
			rules: [
				{
					test: /\.json$/,
					use: 'json-loader'
				}
			]
		},
		devServer: {
			host: environment.host || 'localhost',
			port: environment.port || 8080
		},
		devtool: 'eval-source-map'
	},
	{
		entry: {
			"arenaPhysicsDemo": "./demos/arenaPhysicsDemo.js",
			"keyboardMouseDemo": "./demos/keyboardMouseDemo.js",
			"test": "./demos/test.js"
		},
		output: {
			filename: "./demos/[name].js"
		},
		module: {
			rules: [
				{
					test: /\.json$/,
					use: 'json-loader'
				}
			]
		},
		devtool: 'eval-source-map'
	}
];
