
var PhysicalEntity = require('../PhysicalEntity.js');
var Cylinder = require('../shapes/Cylinder.js');
var Box = require('../shapes/Box.js');
var Sphere = require('../shapes/Sphere.js');

var color = 0x990000;

var bodyThickness = 1;
var bodyLength = 4;

var railThickness = .5;
var railSideExtension = 1;
var railFrontExtension = 0;
var railBackExtension = 0;

var Rocket1 = PhysicalEntity.createClass(
	{
		isRocket: true,
		throttle: 0,
		shapes: {
			/*
			body: new Cylinder({
				color: color,
				size: {
					diameter: 1,
					length: 4
				},
				roundness: 30
			}),
			*/
			bodyCollision1: new Sphere({
				color: color,
				size: bodyThickness,
				position: { y: (bodyLength/2) - (bodyThickness/2) }
			}),
			bodyCollision2: new Sphere({
				color: color,
				size: bodyThickness,
				position: { y: 0 }
			}),
			bodyCollision3: new Sphere({
				color: color,
				size: bodyThickness,
				position: { y: -(bodyLength/2) + (bodyThickness/2) }
			}),
			/*
			leftRail: new Box({
				color: color,
				size: {
					x: .1,
					y: 4,
					z: .1
				},
				position: {
					x: -.5,
					y: 0,
					z: -.6
				}
			}),
			*/
			leftRailCollision1: new Sphere({
				color: color,
				size: railThickness,
				position: {
					x: -railSideExtension,
					y: (bodyLength/2) - (railThickness/2) + railFrontExtension,
					z: (-bodyThickness/2) + (railThickness/2)
				}
			}),
			leftRailCollision2: new Sphere({
				color: color,
				size: railThickness,
				position: {
					x: -railSideExtension,
					y: -(bodyLength/2) + (railThickness/2) - railBackExtension,
					z: (-bodyThickness/2) + (railThickness/2)
				}
			}),
			/*
			rightRail: new Box({
				color: color,
				size: {
					x: .1,
					y: 4,
					z: .1
				},
				position: {
					x: .5,
					y: 0,
					z: -.6
				}
			}),
			*/
			rightRailCollision1: new Sphere({
				color: color,
				size: railThickness,
				position: {
					x: railSideExtension,
					y: (bodyLength/2) - (railThickness/2) + railFrontExtension,
					z: (-bodyThickness/2) + (railThickness/2)
				}
			}),
			rightRailCollision2: new Sphere({
				color: color,
				size: railThickness,
				position: {
					x: railSideExtension,
					y: -(bodyLength/2) + (railThickness/2) - railBackExtension,
					z: (-bodyThickness/2) + (railThickness/2)
				}
			})
		},
		physics: {
			mass: 1e4,
			linearDamping: .2,
			angularDamping: .2
		},
		type: 'Rocket1',
		mountingPoints: {
			left: {
				x: -.5,
				y: 0,
				z: .5
			},
			right: {
				x: .5,
				y: 0,
				z: .5
			},
			seat: {
				x: 0,
				y: 0,
				z: .5
			}
		}
	}
);

module.exports = Rocket1;
