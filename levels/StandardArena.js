
var PhysicalEntity = require('../PhysicalEntity.js');
var ArenaShape = require('../shapes/Arena.js');
var Skybox = require('../misc-entities/Skybox.js');
var Plain = require('./Plain.js');

var StandardArena = PhysicalEntity.createClass(
	{
		physics: {
			mass: 0
		},
		shapes: {
			arena: new ArenaShape({
				wireframe: true,
				color: 0xaaaaaa,
				roundness: 10,
				size: {
					x: 300,
					y: 375,
					z: 300
				},
				borderRadius: 60
			})
		},
		entities: {
			skybox: new Skybox(),
			plain: new Plain(-150)
		}
	}
);

module.exports = StandardArena;
