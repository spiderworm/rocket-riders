
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
		}
	},
	{
		entry: "./demo/arenaPhysicsDemo.js",
		output: {
			filename: "./demo/arenaPhysicsDemo.js"
		},
		module: {
			rules: [
				{
					test: /\.json$/,
					use: 'json-loader'
				}
			]
		}
	},
	{
		entry: "./demo/test.js",
		output: {
			filename: "./demo/test.js"
		},
		module: {
			rules: [
				{
					test: /\.json$/,
					use: 'json-loader'
				}
			]
		}
	},
];
