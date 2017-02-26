
var DECS = require('decs');

window.WebVRConfig = window.WebVRConfig || {
  BUFFER_SCALE: 1,
  CARDBOARD_UI_DISABLED: false,
  ROTATE_INSTRUCTIONS_DISABLED: false,
  TOUCH_PANNER_DISABLED: false,
  MOUSE_KEYBOARD_CONTROLS_DISABLED: false
};

var WebVrPolyfill = require('webvr-polyfill');

var THREE = require('three');
window.THREE = THREE;
var VRControls = require('three/examples/js/controls/VRControls.js');
var VREffect = require('three/examples/js/effects/VREffect.js');
var WEBVR = require('./external/WebVr.js');

var VrSystem = DECS.createSystemClass(
	function(renderSystem, threeScene, cameraSystem) {

		if (WEBVR.isAvailable() === false) {
			document.body.appendChild(WEBVR.getMessage());
		}

		this.threeScene = threeScene;
		this.cameraSystem = cameraSystem;

		this.vrDisplay = null;

		var controls;

		renderSystem.renderer.sortObjects = false;
		this.effect = new THREE.VREffect(renderSystem.renderer);
		if (navigator.getVRDisplays) {
			navigator.getVRDisplays()
				.then(function(displays) {
					if (displays[0]) {
						this.setVRDisplay(displays[0]);
					}
				}.bind(this))
				.catch(function() {})
			;
			var button = WEBVR.getButton(this.effect);
			document.body.appendChild(button);
			//setTimeout(function() { button.click(); }, 1000);
		}

		this._animate();
	},
	{
		activate: function() {
			this.isActive = true;
		},
		deactivate: function() {
			this.isActive = false;
		},
		render: function(scene, threeCamera) {
			if (threeCamera !== this._lastThreeCamera) {
				this._lastThreeCamera = threeCamera;
				if (this.controls) {
					this.controls.dispose();
				}
				this.controls = new THREE.VRControls(threeCamera);
				if (this.vrDisplay) {
					this.controls.setVRDisplay(this.vrDisplay);
				}
				threeCamera.parent.quaternion.set(.7071, 0, 0, .7071);
				threeCamera.parent.position.set(0, 0, 0);
				this.controls.resetPose();
			}
			this.controls.update();
			this.effect.render(scene, threeCamera);
		},
		setVRDisplay: function(vrDisplay) {
			this.vrDisplay = vrDisplay;
			if (this.effect) {
				this.effect.setVRDisplay(displays[0]);
			}
			if (this.controls) {
				this.controls.setVRDisplay(displays[0]);
			}
		},
		_animate: function() {
			if (this.isActive) {
				this.render(this.threeScene, this.cameraSystem.activeThreeCamera);
			}
			this.effect.requestAnimationFrame(this._animate.bind(this));
		}
	}
);

module.exports = VrSystem;
