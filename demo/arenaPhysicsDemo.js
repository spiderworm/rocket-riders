
var StandardDemo = require('./StandardDemo.js');

var DECS = require('decs');
var PhysicalEntity = require('../PhysicalEntity.js');
var Sphere = require('../shapes/Sphere.js');
var ArenaShape = require('../shapes/Arena.js');

var Ball = PhysicalEntity.createClass({
	shapes: {
		0: new Sphere({ size: 1, roundness: 20, wireframe: true })
	}
});

var Arena = PhysicalEntity.createClass({
	physics: {
		mass: 0
	},
	shapes: {
		0: new ArenaShape({
			wireframe: true,
			color: 0x999999,
			roundness: 10,
			size: {
				x: 100,
				y: 200,
				z: 100
			},
			borderRadius: 20
		})
	}
});

function ArenaPhysicsDemo() {
	var game = new StandardDemo();

	game.rocket.physics.position.z = 0;

	game.arena = new Arena();
	game.addEntity(game.arena);

	var ballCount = 20;
	for (var i=0; i<ballCount; i++) {
		var ball = new Ball();
		ball.physics.position = {
			x: -25 + (Math.random() * 50),
			y: -25 + (Math.random() * 50),
			z: -25 + (Math.random() * 50)
		};
		ball.physics.velocity = {
			x: -100 + (Math.random() * 200),
			y: -100 + (Math.random() * 200),
			z: -100 + (Math.random() * 200)
		};
		game.addEntity(ball);
	}

	return game;
}

module.exports = new ArenaPhysicsDemo();
