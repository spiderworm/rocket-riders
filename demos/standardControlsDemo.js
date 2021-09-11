
var ControlsDemo = require('./base-demos/ControlsDemo.js');
var StandardControlsProfile = require('../controls/profiles/StandardControlsProfile.js');
var Ball = require('./demo-entities/Ball.js');

function StandardControlsDemo() {
	var game = new ControlsDemo(new StandardControlsProfile());
	
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

	return game;
}

module.exports = new StandardControlsDemo();
