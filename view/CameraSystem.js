
var DECS = require('decs');
var THREE = require('three');
var PlayerCamera = require('./cameras/PlayerCamera.js');

var CameraSystem = DECS.createSystemClass(
	function(meshSystem) {
		this.meshes = meshSystem;
		this.entities = {};
		this.activeCamera = null;
	},
	{
		getActiveThreeCamera: function() {
			if (this.activeCamera) {
				return this._getCameraThreeCamera(this.activeCamera);
			}
		},
		addCamera: function(camera) {
			this.addEntity(camera);
			if (!this.activeCamera) {
				this.activateCamera(camera);
			}
		},
		attachCamera: function(cameraEntity, entity) {
			var targetMesh = this.meshes.getEntityMesh(entity);
			var object3d = this._getCameraObject3d(cameraEntity);
			var threeCamera = this._getCameraThreeCamera(cameraEntity);
			targetMesh.add(object3d);
		},
		activateCamera: function(camera) {
			this.activeCamera = camera;
			this.activeThreeCamera = this._getCameraThreeCamera(camera);
		},
		updateDimensions: function() {
			var aspect = window.innerWidth / window.innerHeight;
			this.eachEntity(function(camera) {
				var threeCamera = this._getCameraThreeCamera(camera);
				threeCamera.aspect = aspect;
				threeCamera.updateProjectionMatrix();
			}.bind(this));
		},
		tick: function() {
			this.eachEntity(function(cameraEntity, cameraData) {
				var object3d = this._getCameraObject3d(cameraEntity);
				var threeCamera = this._getCameraThreeCamera(cameraEntity);
				if (cameraEntity.focusPoint) {
					var matrix = new THREE.Matrix4();
					var position = new THREE.Vector3();
					threeCamera.matrixWorld.decompose(position, new THREE.Quaternion(), new THREE.Vector3());
					matrix.lookAt(position, cameraEntity.focusPoint, threeCamera.up);
					threeCamera.quaternion.setFromRotationMatrix(matrix);
				} else {
					threeCamera.lookAt(cameraData.focusVector);
				}
			}.bind(this));
		},
		_getCameraObject3d: function(cameraEntity) {
			var data = this.getEntitySystemComponent(cameraEntity);
			if (!data.object3d) {
				data.object3d = new THREE.Object3D();
				var pos = cameraEntity.physics.position;
				var rot = cameraEntity.physics.rotation;
				data.object3d.position.set(pos.x, pos.y, pos.z);
				data.object3d.quaternion.set(rot.x, rot.y, rot.z, rot.w);
			}
			return data.object3d;
		},
		_getCameraThreeCamera: function(cameraEntity) {
			var data = this.getEntitySystemComponent(cameraEntity);
			if (!data.camera) {
				data.camera = new THREE.PerspectiveCamera(
					cameraEntity.fov,
					window.innerWidth/window.innerHeight,
					0.1,
					1e20
				);
				data.camera.up.set(0,0,1);
				var object3d = this._getCameraObject3d(cameraEntity);
				object3d.add(data.camera);
				data.focusVector = new THREE.Vector3();
				if (cameraEntity.focusVector) {
					data.focusVector.set(
						cameraEntity.focusVector.x,
						cameraEntity.focusVector.y,
						cameraEntity.focusVector.z
					);
				}
			}
			return data.camera;
		}
	}
);

module.exports = CameraSystem;
