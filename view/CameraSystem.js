
var DECS = require('decs');
var THREE = require('three');

var CameraSystem = DECS.createSystemClass(
	function(threeCamera) {
		this.camera = threeCamera;
		this.dolly = new THREE.Object3D();
	},
	{
		setTarget: function(three) {
			this.three = three;

			this.camera.position.set(0, 0, 0);
			this.three.add(this.camera);
			this.dolly.position.set(0, 0, 0);
			this.dolly.quaternion.set( .717, 0, 0, .717 );

			this.three.add( this.dolly );
			this.dolly.add( this.camera );

			this.lookAtTarget();
		},
		tick: function() {
			//this.lookAtTarget();
		},
		lookAtTarget: function() {
			if (this.three) {
				//this.camera.lookAt(this.three.position);
				this.camera.lookAt(new THREE.Vector3(0,1,0));
			}

		}
	}
);

module.exports = CameraSystem;
