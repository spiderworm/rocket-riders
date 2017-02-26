
require('../dev/debug.js');
var DECS = require('decs');
var PhysicsSystem = require('../physics/PhysicsSystem.js');
var RiderSystem = require('../riders/RiderSystem.js');
var RocketSystem = require('../rockets/RocketSystem.js');
var ViewSystem = require('../view/ViewSystem.js');
var ControlsSystem = require('../controls/ControlsSystem.js');

function StandardDemo() {
	var game = new DECS();

	game.physics = new PhysicsSystem();
	game.addSystem(game.physics);

	game.riderSystem = new RiderSystem(game.physics);
	game.addSystem(game.riderSystem);

	game.rocketSystem = new RocketSystem(game.physics);
	game.addSystem(game.rocketSystem);

	game.controlsSystem = new ControlsSystem();
	game.addSystem(game.controlsSystem);

	game.view = new ViewSystem();
	game.addSystem(game.view);
	game.view.tick();

	window.game = game;
	console.info('game', game);

	return game;
}

module.exports = StandardDemo;
