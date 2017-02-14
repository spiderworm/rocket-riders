
var PhysicalEntity = require('../PhysicalEntity.js');
var Cylinder = require('../shapes/Cylinder.js');
var Box = require('../shapes/Box.js');

var Tree = PhysicalEntity.createClass(
	'Tree',
	{
		shapes: {
			trunk: new Cylinder({
				size: { length: 5, diameter: 2 },
				color: 0xaa4444,
				rotation: { w: .7071, x: .7071, y: 0, z: 0 }
			}),
			leaves: new Box({
				size: { x: 5, y: 5, z: 5 },
				color: 0x119922,
				position: { z: 4.5 }
			})
		},
		type: 'tree'
	}
);

module.exports = Tree;
