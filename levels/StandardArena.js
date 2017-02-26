
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
					x: 600,
					y: 750,
					z: 600
				},
				position: { x: 0, y: 0, z: 300 },
				borderRadius: 100
			})
		},
		entities: {
			//skybox: new Skybox(),
			plain: new Plain(0)
		}
	}
);

module.exports = StandardArena;
