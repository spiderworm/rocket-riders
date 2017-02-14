
var Level = require('./Level.js');
var Box = require('../shapes/Box.js');

var Plain = Level.createClass({
	shapes: {
		plain: new Box({
			size: { x: 1e5, y: 1e5, z: 10 },
			color: 0x00ff00
		})
	}
});

module.exports = Plain;
