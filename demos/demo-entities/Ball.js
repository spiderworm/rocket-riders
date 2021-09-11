
var PhysicalEntity = require('../../PhysicalEntity.js');
var Sphere = require('../../shapes/Sphere.js');

var Ball = PhysicalEntity.createClass({
	physics: {
		mass: 1
	},
	shapes: {
		0: new Sphere({
			color: 0x999999,
			size: 20,
			detail: 20,
			wireframe: true
		})
	}
});

module.exports = Ball;
