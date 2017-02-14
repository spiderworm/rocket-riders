
var Level = require('./Level.js');
var threeArena = require('./Arena1.three.json');
var ThreeShape = require('../shapes/ThreeShape.js');

var scale = 1e2;

var Arena1 = Level.createClass(
	function() {},
	{
		shapes: {
			0: new ThreeShape(
				threeArena,
				{
					color: 0xff0000,
					wireframe: true,
					position: { x: 0, y: 0, z: 12 },
					size: { x: scale, y: scale, z: scale }
				}
			),
			1: new ThreeShape(
				threeArena,
				{
					color: 0xff0000,
					wireframe: true,
					position: { x: 0, y: 0, z: 12 },
					size: { x: scale, y: -scale, z: scale }
				}
			)
		}
	}
);

module.exports = Arena1;
