
var DECS = require('decs');
var THREE = require('three');

var CameraSystem = DECS.createSystemClass(
	function(threeCamera) {
		this.camera = threeCamera;
	},
	{
		setTarget: function(three) {
			this.three = three;
			this.three.add(this.camera);
			this.camera.position.set(0, -5, 1);
			this.lookAtTarget();
		},
		tick: function() {
			this.lookAtTarget();
		},
		lookAtTarget: function() {
			if (this.three) {
				//this.camera.lookAt(this.three.position);
				this.camera.lookAt(new THREE.Vector3(0,0,0));
			}

		}
	}
);

module.exports = CameraSystem;
