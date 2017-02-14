
var DECS = require('decs');
var CANNON = require('cannon');

var RocketSystem = DECS.createSystemClass(
	function(physics) {
		this.physics = physics;
	},
	{
		tick: function(ms) {
			this.eachEntity(function(entity, component) {
				if (entity.isRocket && entity.throttle !== 0) {
					var body = this.physics.getCannonBody(entity);
					if (body) {
						var thrust = entity.throttle * ms * 2e2;

						var force = new CANNON.Vec3(0, thrust, 0);
						var point = new CANNON.Vec3(-1, -.1, 0);
						body.applyLocalImpulse(force, point);

						var force = new CANNON.Vec3(0, thrust, -.1);
						var point = new CANNON.Vec3(1, 0, 0);
						body.applyLocalImpulse(force, point);
/*
						var velocity = Math.sqrt(Math.pow(body.velocity.x,2) + Math.pow(body.velocity.y,2) + Math.pow(body.velocity.z,2));
						console.info(velocity);
						var lift = velocity * ms * .002;
						var force = new CANNON.Vec3(0, 0, lift);
						var point = new CANNON.Vec3(0, 0, -.5);

						body.applyLocalImpulse(force, point);
*/
					}
				}
			}.bind(this))
		}
	}
);

module.exports = RocketSystem;
