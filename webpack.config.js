
var path = require("path");

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
