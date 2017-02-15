
var PhysicalEntity = require('../PhysicalEntity.js');
var Hemisphere = require('../shapes/Hemisphere.js');

var wireframe = true;
var size = 2000;
var roundness = 100;

var Skybox = PhysicalEntity.createClass({
	physics: {
		collision: false
	},
	shapes: {
		sky: new Hemisphere({
			wireframe: wireframe,
			color: 0x112266,
			roundness: roundness,
			size: size,
			rotation: {
				w: .717,
				x: .717,
				y: 0,
				z: 0
			}
		}),
		ground: new Hemisphere({
			wireframe: wireframe,
			color: 0x116622,
			roundness: roundness,
			size: size,
			rotation: {
				w: .717,
				x: -.717,
				y: 0,
				z: 0
			}
		})
	}
});

module.exports = Skybox;
