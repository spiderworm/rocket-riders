
var DECS = require('decs');
var PhysicsSystem = require('../physics/PhysicsSystem.js');
var RiderSystem = require('../riders/RiderSystem.js');
var RocketSystem = require('../rockets/RocketSystem.js');
var Rocket1 = require('../rockets/Rocket1.js');
var Rider1 = require('../riders/Rider1.js');
var ViewSystem = require('../view/ViewSystem.js');

function StandardDemo() {
	var game = new DECS();

	game.physics = new PhysicsSystem();
	game.addSystem(game.physics);

	game.riderSystem = new RiderSystem(game.physics);
	game.addSystem(game.riderSystem);

	game.rocketSystem = new RocketSystem(game.physics);
	game.addSystem(game.rocketSystem);

	game.rocket = new Rocket1();
	game.rocket.physics.position = {
		x: 0,
		y: 0,
		z: 5
	};
	game.addEntity(game.rocket);

	game.player = new Rider1();
	game.player.id = 'player';
	game.player.physics.position = {
		x: game.rocket.physics.position.x,
		y: game.rocket.physics.position.y,
		z: game.rocket.physics.position.z + 2
	};
	game.addEntity(game.player);

	game.riderSystem.setRocket(game.player, game.rocket);

	function engineStart() {
		game.rocket.throttle = 1;
		//setTimeout(engineStop, 5000);
	}

	function engineStop() {
		game.rocket.throttle = 0;
		setTimeout(engineStart, 2000);
	}

	engineStop();

	game.view = new ViewSystem();
	game.addSystem(game.view);
	game.view.tick();
	game.view.cameraSystem.setTarget(game.view.meshes.getEntityMesh(game.rocket));

	window.game = game;
	console.info('game', game);

	return game;
}

module.exports = StandardDemo;
