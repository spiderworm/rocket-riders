
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
		physics: {
			mass: 1e4,
			linearDamping: .2,
			angularDamping: .2
		},
		trail: {
			position: { x: 0, y: -(bodyLength/2 + bodyThickness/2), z: 0 },
			size: bodyThickness
		},
		entities: {
			//trail: new RocketTrail1()
		},
		shapes: {
			trail: new Sphere({
				color: 0xffe88a,
				position: { y: -(bodyLength/2) },
				size: bodyThickness,
				detail: 15,
				collision: false
			}),
			body: new Cylinder({
				color: color,
				size: {
					diameter: 1,
					length: 4
				},
				detail: 30,
				wireframe: true
			}),
			bodyCollision1: new Sphere({
				color: color,
				size: bodyThickness,
				position: { y: (bodyLength/2) - (bodyThickness/2) },
				detail: 20
			}),
			bodyCollision2: new Sphere({
				color: color,
				size: bodyThickness,
				position: { y: 0 },
				detail: 20
			}),
			bodyCollision3: new Sphere({
				color: color,
				size: bodyThickness,
				position: { y: -(bodyLength/2) + (bodyThickness/2) },
				detail: 20
			}),
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
