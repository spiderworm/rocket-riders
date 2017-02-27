
require('./dev/debug.js');
var DECS = require('decs');
var PhysicsSystem = require('./physics/PhysicsSystem.js');
var RiderSystem = require('./riders/RiderSystem.js');
var RocketSystem = require('./rockets/RocketSystem.js');
var StandardArena = require('./levels/StandardArena.js');

var Rider1 = require('./riders/Rider1.js');
var Rocket1 = require('./rockets/Rocket1.js');

function RocketRidersGame() {
	var game = new DECS();

	game.physics = new PhysicsSystem();
	game.addSystem(game.physics);

	game.riderSystem = new RiderSystem(game.physics);
	game.addSystem(game.riderSystem);

	game.rocketSystem = new RocketSystem(game.physics);
	game.addSystem(game.rocketSystem);

	game.arena = new StandardArena();
	game.arena.id = 'arena';
	game.addEntity(game.arena);

	game.rider = new Rider1();
	game.rider.physics.position.z += 1;
	game.rocket = new Rocket1();
	game.addEntity(game.rider)
	game.addEntity(game.rocket);
	game.riderSystem.setRocket(game.rider, game.rocket);

	window.game = game;
	console.info('game', game);

	return game;
}

module.exports = RocketRidersGame;
