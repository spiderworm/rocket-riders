
var PhysicalEntity = require('../PhysicalEntity.js');
var Sphere = require('../shapes/Sphere.js');

var Rider = PhysicalEntity.createClass({
	type: 'Rider',
	shapes: {
		body: new Sphere({ color: 0xffffff, size: 1 })
	},
	physics: {
		mass: .001
	},
	rocket: null,
	ridingPoints: {
		left: {
			x: -.5,
			y: 0,
			z: -.5
		},
		right: {
			x: .5,
			y: 0,
			z: -.5
		},
		seat: {
			x: 0,
			y: 0,
			z: -.5
		}
	}
});

module.exports = Rider;
