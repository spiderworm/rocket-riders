
var Rocket1 = require('../../rockets/Rocket1.js');
var Rider1 = require('../../riders/Rider1.js');

function DemoRiderAndRocket(riderSystem) {

	var rocket = new Rocket1();
	rocket.physics.position = {
		x: 0,
		y: 0,
		z: 5
	};

	var rider = new Rider1();
	rider.physics.position = {
		x: rocket.physics.position.x,
		y: rocket.physics.position.y,
		z: rocket.physics.position.z + 2
	};

	riderSystem.setRocket(rider, rocket);

	function engineStart() {
		rocket.throttle = 1;
		//setTimeout(engineStop, 5000);
	}

	function engineStop() {
		rocket.throttle = 0;
		setTimeout(engineStart, 2000);
	}

	engineStart();

	return {
		rider: rider,
		rocket: rocket
	};

}

module.exports = DemoRiderAndRocket;
