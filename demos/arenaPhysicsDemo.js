
var DECS = require('decs');
var StandardDemo = require('./base-demos/StandardDemo.js');
var DemoRiderAndRocket = require('./demo-entities/DemoRiderAndRocket.js');
var ArenaCamera = require('../view/cameras/ArenaCamera.js');
var Ball = require('./demo-entities/Ball.js');
var StandardArena = require('../levels/StandardArena.js');

function ArenaPhysicsDemo() {

	var game = new StandardDemo();

	game.arena = new StandardArena();
	game.arena.id = 'arena';
	game.addEntity(game.arena);

	var ballCount = 50;
	for (var i=0; i<ballCount; i++) {
		var ball = new Ball();
		ball.physics.position = {
			x: -75 + (Math.random() * 150),
			y: -75 + (Math.random() * 150),
			z: 5 + (Math.random() * 50)
		};
		ball.physics.velocity = {
			x: -100 + (Math.random() * 200),
			y: -100 + (Math.random() * 200),
			z: -100 + (Math.random() * 200)
		};
		game.addEntity(ball);
	}

	var playerCount = 10;
	for (var i=0; i<playerCount; i++) {
		var entities = new DemoRiderAndRocket(game.riderSystem);
		entities.rocket.physics.position = {
			x: -75 + (Math.random() * 150),
			y: -75 + (Math.random() * 150),
			z: 2
		};
		entities.rocket.physics.rotation = normalize({
			w: Math.random(),
			x: 0,
			y: 0,
			z: -Math.PI + (2 * Math.PI * Math.random())
		});
		delete entities.rider.controls;
		entities.rocket.throttle = 1;
		game.addEntity(entities.rider);
		game.addEntity(entities.rocket);
	}

	var camera = new ArenaCamera();
	camera.physics.position = { x: 0, y: -325, z: 30 };
	camera.focusPoint = { x: 0, y: 0, z: 0 };
	game.view.cameraSystem.addCamera(camera);
	game.view.cameraSystem.attachCamera(camera, game.arena);

	return game;
}

function normalize(quat) {
	var length = Math.sqrt(
		Math.pow(quat.w, 2) +
		Math.pow(quat.x, 2) +
		Math.pow(quat.y, 2) +
		Math.pow(quat.z, 2)
	);
	return {
		w: quat.w / length,
		x: quat.x / length,
		y: quat.y / length,
		z: quat.z / length
	};
}

module.exports = new ArenaPhysicsDemo();
