
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
	function(renderSystem) {

		if (WEBVR.isAvailable() === false) {
			document.body.appendChild(WEBVR.getMessage());
		}

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
		}
	},
	{
		render: function(scene, threeCamera) {
			if (threeCamera !== this._threeCamera) {
				this._threeCamera = threeCamera;
				if (this.controls) {
					this.controls.dispose();
				}
				this.controls = new THREE.VRControls(threeCamera);
				if (this.vrDisplay) {
					this.controls.setVRDisplay(this.vrDisplay);
				}
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
		}
	}
);

module.exports = VrSystem;
