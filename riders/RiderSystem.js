
var DECS = require('decs');
var CANNON = require('cannon');

var RiderSystem = DECS.createSystemClass(
	function(physics) {
		this.physics = physics;
	},
	{
		tick: function() {
			this.eachEntity(function(entity, systemComponent) {
				this._removeEntityConstraints(entity, systemComponent);
				this._addEntityConstraints(entity, systemComponent);
			}.bind(this));
		},
		setRocket: function(rider, rocket) {
			rider.rocketId = rocket.id;
		},
		_removeEntityConstraints: function(entity, systemComponent) {
			if (
				systemComponent.constraints &&
				(!entity.rocketId || entity.rocketId !== systemComponent.rocketId)
			) {
				this.physics.cannon.removeConstraint(systemComponent.constraints.left);
				this.physcis.cannon.removeConstraint(systemComponent.constraints.right);
				delete systemComponent.constraints;
				delete systemComponent.rocketId;
			}
		},
		_addEntityConstraints: function(entity, systemComponent) {
			if (entity.rocketId && entity.rocketId !== systemComponent.rocketId) {
				var rocket = this.entities[entity.rocketId];
				if (rocket) {
					systemComponent.rocketId = entity.rocketId;
					var maxForce = Infinity;
					systemComponent.constraints = {
						left: new CANNON.PointToPointConstraint(
							this.physics.getCannonBody(entity),
							new CANNON.Vec3(
								entity.ridingPoints.left.x,
								entity.ridingPoints.left.y,
								entity.ridingPoints.left.z
							),
							this.physics.getCannonBody(rocket),
							new CANNON.Vec3(
								rocket.mountingPoints.left.x,
								rocket.mountingPoints.left.y,
								rocket.mountingPoints.left.z
							),
							maxForce
						),
						right: new CANNON.PointToPointConstraint(
							this.physics.getCannonBody(entity),
							new CANNON.Vec3(
								entity.ridingPoints.right.x,
								entity.ridingPoints.right.y,
								entity.ridingPoints.right.z
							),
							this.physics.getCannonBody(rocket),
							new CANNON.Vec3(
								rocket.mountingPoints.right.x,
								rocket.mountingPoints.right.y,
								rocket.mountingPoints.right.z
							),
							maxForce
						)
					};
					this.physics.cannon.addConstraint(systemComponent.constraints.left);
					this.physics.cannon.addConstraint(systemComponent.constraints.right);
				}
			}
		}
	}
);

module.exports = RiderSystem;
