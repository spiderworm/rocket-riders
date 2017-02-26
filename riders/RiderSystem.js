
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
				this._applyRiderShift(entity, systemComponent);
			}.bind(this));
		},
		setRocket: function(rider, rocket) {
			rider.isRiding = true;
			rider.rocketId = rocket.id;
			rocket.throttle = 0;
		},
		_applyRiderShift: function(entity, systemComponent) {
			if (
				entity.isRiding &&
				entity.controls && entity.controls.input &&
				systemComponent.constraints
			) {
				var x = 0;
				var y = 0;
				var throttle = 0;

				if (entity.controls.input.xMove) {
					x = entity.controls.input.xMove.value / 2;
				}
				if (entity.controls.input.yMove) {
					y = entity.controls.input.yMove.value / 2;
				}
				if (entity.controls.input.throttle) {
					throttle = entity.controls.input.throttle.value;
				}

				systemComponent.constraints.seat.pivotB.x = entity.ridingPoints.seat.x + x;
				systemComponent.constraints.seat.pivotB.y = entity.ridingPoints.seat.y + y;

				var rocket = this.entities[entity.rocketId];
				if (rocket) {
					rocket.throttle = throttle;
				}
			}
		},
		_removeEntityConstraints: function(entity, systemComponent) {
			if (
				systemComponent.constraints &&
				(!entity.rocketId || entity.rocketId !== systemComponent.rocketId)
			) {
				this.physics.cannon.removeConstraint(systemComponent.constraints.seat);
				delete systemComponent.constraints;
				delete systemComponent.rocketId;
			}
		},
		_addEntityConstraints: function(entity, systemComponent) {
			if (entity.rocketId && entity.rocketId !== systemComponent.rocketId) {
				var rocket = this.entities[entity.rocketId];
				if (rocket) {
					systemComponent.rocketId = entity.rocketId;
					var maxForce = 5e3;
					systemComponent.constraints = {
						seat: new CANNON.LockConstraint(
							this.physics.getCannonBody(entity),
							this.physics.getCannonBody(rocket),
							{ maxForce: maxForce }
						)
					};
					this.physics.cannon.addConstraint(systemComponent.constraints.seat);
				}
			}
		}
	}
);

module.exports = RiderSystem;
