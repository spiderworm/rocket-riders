
var DECS = require('decs');
var CANNON = require('cannon');

var RocketThrustSystem = DECS.createSystemClass(
	function(physics) {
		this.physics = physics;
	},
	{
		applyEntityThrust: function(entity, ms) {
			if (entity.isRocket && entity.throttle !== 0) {
				var body = this.physics.getCannonBody(entity);
				if (body) {
					ms = Math.min(ms, 50);
					var thrust = entity.throttle * ms * 4e2;

					var force = new CANNON.Vec3(0, thrust, 0);
					var point = new CANNON.Vec3(-1, 0, 0);
					body.applyLocalImpulse(force, point);

					var force = new CANNON.Vec3(0, thrust, 0);
					var point = new CANNON.Vec3(1, 0, 0);
					body.applyLocalImpulse(force, point);
				}
			}
		}
	}
);

module.exports = RocketThrustSystem;
