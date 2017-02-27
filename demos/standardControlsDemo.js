
var ControlsDemo = require('./base-demos/ControlsDemo.js');
var StandardControlsProfile = require('../controls/profiles/StandardControlsProfile.js');

function StandardControlsDemo() {
	var game = new ControlsDemo(new StandardControlsProfile());
	return game;
}

module.exports = new StandardControlsDemo();
