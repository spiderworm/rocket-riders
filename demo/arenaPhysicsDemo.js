
var StandardDemo = require('./StandardDemo.js');

var DECS = require('decs');
var PhysicalEntity = require('../PhysicalEntity.js');
var Sphere = require('../shapes/Sphere.js');
var StandardArena = require('../levels/StandardArena.js');

var Ball = PhysicalEntity.createClass({
	shapes: {
		0: new Sphere({ size: 10, roundness: 20, wireframe: true, physics: { mass: 1000 } })
	}
});

function ArenaPhysicsDemo() {
	var game = new StandardDemo();

	game.rocket.physics.position.z = -90;

	game.arena = new StandardArena();
	game.addEntity(game.arena);

	var ballCount = 50;
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
