
var DECS = require('decs');
var CANNON = require('cannon');
var RocketThrustSystem = require('./RocketThrustSystem.js');
var RocketTrailSystem = require('./RocketTrailSystem.js');

var RocketSystem = DECS.createSystemClass(
	function(physics) {
		this.physics = physics;
		this.rocketThrustSystem = new RocketThrustSystem(physics);
		this.rocketTrailSystem = new RocketTrailSystem();
	},
	{
		tick: function(ms) {
			this.eachEntity(function(entity, component) {
				this.rocketThrustSystem.applyEntityThrust(entity, ms);
			}.bind(this))
		}
	}
);

module.exports = RocketSystem;
