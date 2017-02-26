
var Level = require('./Level.js');
var Box = require('../shapes/Box.js');

var Plain = Level.createClass(
	function(zLevel) {
		this.physics.position.z = zLevel || 0;
	},
	{
		shapes: {
			plain: new Box({
				size: { x: 1e4, y: 1e4, z: 10 },
				position: { x: 0, y: 0, z: -5 },
				color: 0x006600,
				debug: {
					type: 'checkerboard',
					repeatS: 5e2,
					repeatT: 5e2
				}
			})
		}
	}
);

module.exports = Plain;
