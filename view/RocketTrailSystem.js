
var DECS = require('decs');
var PhysicalEntity = require('../PhysicalEntity.js');
var Sphere = require('../shapes/Sphere.js');
var objectHero = require('object-hero');
var THREE = require('three');

var SMOKE_INTERVAL = 40;

var smokeThree = new THREE.Mesh(
	new THREE.SphereGeometry(.5, 64, 64),
	new THREE.MeshBasicMaterial({
		color: 0x333333,
		transparent: true,
		opacity: 0
	})
);

var RocketTrailSystem = DECS.createSystemClass(
	function(threeScene) {
		this.scene = threeScene;
	},
	{
		tick: function(ms) {
			this.eachEntity(function(entity, data) {
				if (entity.isRocket && entity.throttle > 0) {
					data.ms = data.ms || 0;
					data.ms += ms;
					if (data.ms >= SMOKE_INTERVAL) {
						data.ms -= SMOKE_INTERVAL;
						this.addSmoke(entity);
					}
					this.animateSmoke(entity, ms);
				}
			}.bind(this));
		},
		addSmoke: function(entity) {
			var data = this.getEntitySystemComponent(entity);
			if (!data.threes) {
				data.threes = [];
				while(data.threes.length < 50) {
					var smoke = smokeThree.clone(true);
					smoke.material = smokeThree.material.clone(true);
					data.threes.push(smoke);
				}
			}
			for (var i=0; i<data.threes.length; i++) {
				var three = data.threes[i];
				if (!three.parent) {
					three.material.opacity = 1;
					var offset = new THREE.Vector3();
					offset.copy(entity.trail.position);
					var matrix = new THREE.Matrix4();
					matrix.compose(entity.physics.position, entity.physics.rotation, {x: 1, y: 1, z: 1});
					offset.applyMatrix4(matrix);
					three.position.copy(offset);
					this.scene.add(three);
					return;
				}
			}
		},
		animateSmoke: function(entity, ms) {
			var data = this.getEntitySystemComponent(entity);
			if (data.threes) {
				data.threes.forEach(function(three) {
					if (three.parent) {
						three.position.z += ms / 500;
						three.material.opacity -= ms / 1000;
						if (three.material.opacity <= 0) {
							this.scene.remove(three);
						}
					}
				}.bind(this));
			}
		}
	}
);

module.exports = RocketTrailSystem;
