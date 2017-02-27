
var Game = require('./RocketRidersGame.js');
var ViewSystem = require('./view/ViewSystem.js');
var ArenaCamera = require('./view/cameras/ArenaCamera.js');
var PlayerCamera = require('./view/cameras/PlayerCamera.js');
var ControlsSystem = require('./controls/ControlsSystem.js');
var StandardControlsProfile = require('./controls/profiles/StandardControlsProfile.js');

function RocketRidersClient() {
	var game = new Game();

	game.controlsSystem = new ControlsSystem();
	game.addSystem(game.controlsSystem);

	var controls = new StandardControlsProfile();
	game.addEntity(controls);
	game.controlsSystem.activateControls(controls);
	game.controlsSystem.setTarget(game.rider);

	game.view = new ViewSystem();
	game.addSystem(game.view);
	game.view.tick();

	var camera = new PlayerCamera();
	game.view.cameraSystem.addCamera(camera);
	game.view.cameraSystem.attachCamera(camera, game.rider);

	return game;
}

module.exports = new RocketRidersClient();
