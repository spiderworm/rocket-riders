
var DECS = require('decs');
var StandardDemo = require('./StandardDemo.js');
var DemoRiderAndRocket = require('./demo-entities/DemoRiderAndRocket.js');
var BehindPlayerCamera = require('../view/cameras/BehindPlayerCamera.js');
var StandardArena = require('../levels/StandardArena.js');

function ControlsDemo(controls) {

	var game = new StandardDemo();

	game.arena = new StandardArena();
	game.arena.shapes.arena.size = { x: 6000, y: 7500, z: 600 };
	game.arena.id = 'arena';
	game.addEntity(game.arena);

	var riderAndRocket = new DemoRiderAndRocket(game.riderSystem);
	var rider = riderAndRocket.rider;
	var rocket = riderAndRocket.rocket;
	rocket.throttle = 0;
	rocket.physics.position = {
		x: -75 + (Math.random() * 150),
		y: -75 + (Math.random() * 150),
		z: 2
	};
	rocket.physics.rotation = normalize({
		w: Math.random(),
		x: 0,
		y: 0,
		z: -Math.PI + (2 * Math.PI * Math.random())
	});
	game.addEntity(rocket);

	rider.physics.position = {
		x: rocket.physics.position.x,
		y: rocket.physics.position.y,
		z: rocket.physics.position.z + 1
	};
	rider.physics.rotation = {
		w: rocket.physics.rotation.w,
		x: rocket.physics.rotation.x,
		y: rocket.physics.rotation.y,
		z: rocket.physics.rotation.z
	};
	game.addEntity(rider);

	var camera = new BehindPlayerCamera();
	game.view.cameraSystem.addCamera(camera);
	game.view.cameraSystem.attachCamera(camera, rocket);

	game.addEntity(controls);
	game.controlsSystem.activateControls(controls);
	game.controlsSystem.setTarget(rider);

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

module.exports = ControlsDemo;
