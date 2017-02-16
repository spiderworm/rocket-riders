
var StandardDemo = require('./StandardDemo.js');

var DECS = require('decs');
var PhysicalEntity = require('../PhysicalEntity.js');
var Sphere = require('../shapes/Sphere.js');
var StandardArena = require('../levels/StandardArena.js');

var Ball = PhysicalEntity.createClass({
	physics: {
		mass: 1e2
	},
	shapes: {
		0: new Sphere({ size: 10, detail: 20, wireframe: true })
	}
});

function ArenaPhysicsDemo() {
	var game = new StandardDemo();

	game.arena = new StandardArena();
	game.arena.id = 'arena';
	game.addEntity(game.arena);

	var ballCount = 20;
	for (var i=0; i<ballCount; i++) {
		var ball = new Ball();
		ball.physics.position = {
			x: 50 + (Math.random() * 50),
			y: 50 + (Math.random() * 50),
			z: 50 + (Math.random() * 50)
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
