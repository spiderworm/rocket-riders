
var PhysicalEntity = require('../PhysicalEntity.js');
var Sphere = require('../shapes/Sphere.js');

var W = 87;
var A = 65;
var S = 83;
var D = 68;

var UP = 38;
var LEFT = 37;
var DOWN = 40;
var RIGHT = 39;

var Rider = PhysicalEntity.createClass({
	type: 'Rider',
	shapes: {
		body: new Sphere({
			color: 0xffffff,
			size: 1
		})
	},
	physics: {
		mass: 1000
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
	},
	controls: {
		input: {
			yMove: {
				name: 'y-move',
				inputMethod: 'set',
				value: 0,
				min: -1,
				max: 1
			},
			xMove: {
				name: 'x-move',
				inputMethod: 'set',
				value: 0,
				min: -1,
				max: 1
			},
			throttle: {
				name: 'throttle',
				inputMethod: 'set',
				value: 0,
				min: 0,
				max: 1
			}
		}
	}
});

module.exports = Rider;
