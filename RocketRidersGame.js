
var DECS = require('decs');
var PhysicsSystem = require('./physics/PhysicsSystem.js');
var RiderSystem = require('./riders/RiderSystem.js');
var RocketSystem = require('./rockets/RocketSystem.js');
var Rider = require('./riders/Rider.js');
var Rider1 = require('./riders/Rider1.js');
var Level1 = require('./levels/Level1.js');
var Rocket = require('./rockets/Rocket1.js');
var Arena1 = require('./levels/Arena1.js');
var Plain = require('./levels/Plain.js');
var StandardArena = require('./levels/StandardArena.js');

function RocketRidersGame() {
	var game = new DECS();

	game.physics = new PhysicsSystem();
	game.addSystem(game.physics);

	var riderSystem = new RiderSystem(game.physics);
	game.addSystem(riderSystem);

	var rocketSystem = new RocketSystem(game.physics);
	game.addSystem(rocketSystem);

	var rocket = new Rocket();
	rocket.physics.position.z = -50;
	game.addEntity(rocket);

	game.player = new Rider1();
	game.player.id = 'player';
	game.player.physics.position = {
		x: rocket.physics.position.x,
		y: rocket.physics.position.y,
		z: rocket.physics.position.z + 1
	};
	game.addEntity(game.player);

	riderSystem.setRocket(game.player, rocket);

	setTimeout(function() { rocket.throttle = .1; }, 1000);

	var plain = new Plain();
	//game.addEntity(plain);

	var standardArena = new StandardArena();
	game.addEntity(standardArena);
	this.arena = standardArena;
/*
	var arena1 = new Arena1();
	game.addEntity(arena1);

	var level1 = new Level1();
	game.addEntity(level1);
*/

	return game;
}

module.exports = RocketRidersGame;
