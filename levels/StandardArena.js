
var PhysicalEntity = require('../PhysicalEntity.js');
var ArenaShape = require('../shapes/Arena.js');
var Box = require('../shapes/Box.js');
var Skybox = require('../misc-entities/Skybox.js');
var Plain = require('./Plain.js');

var StandardArena = PhysicalEntity.createClass(
	{
		physics: {
			mass: 0,
			position: { x: 0, y: 0, z: 0 }
		},
		shapes: {
			arena: new ArenaShape({
				wireframe: true,
				color: 0xffffff,
				detail: 10,
				size: {
					x: 300,
					y: 375,
					z: 300
				},
				position: { x: 0, y: 0, z: 150 },
				borderRadius: 60
			}),
			testCube: new Box({
				position: {
					x: 0,
					y: 0,
					z: -20
				}
			})
		},
		entities: {
			skybox: new Skybox(),
			plain: new Plain(0)
		}
	}
);

module.exports = StandardArena;
