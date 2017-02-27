
var DECS = require('decs');
var THREE = require('three');

var CameraSystem = require('./CameraSystem.js');
var MeshSystem = require('./MeshSystem.js');
var RenderSystem = require('./RenderSystem.js');
var VrSystem = require('./VrSystem.js');
var RocketTrailSystem = require('./RocketTrailSystem.js');

var ViewSystem = DECS.createSystemClass(
	function() {
		this.canvas = document.createElement('canvas');
		this.canvas.style.position = 'fixed';
		this.canvas.style.top = this.canvas.style.right = this.canvas.style.bottom = this.canvas.style.left = 0;
		document.querySelector('article').appendChild(this.canvas);

		this.scene = new THREE.Scene();

		this.meshes = new MeshSystem(this.scene);
		this.addSystem(this.meshes);

		this.cameraSystem = new CameraSystem(this.meshes);
		this.addSystem(this.cameraSystem);

		this.renderer = new RenderSystem(this.canvas, this.scene, this.cameraSystem);
		this.vrSystem = new VrSystem(this.renderer, this.scene, this.cameraSystem);

		window.onvrdisplayconnected = function() {
			this.activateVr();
		}.bind(this);

		window.onvrdisplaydisconnected = function() {
			this.deactivateVr();
		}.bind(this);

		window.addEventListener('vrdisplaypresentchange', (function(event) {
			if (event.display.isPresenting) {
				this.activateVr();
			} else {
				this.deactivateVr();
			}
		}).bind(this), false);

		window.addEventListener('resize', this._updateDimensions.bind(this), false);
		this._updateDimensions();

		this.rocketTrailSystem = new RocketTrailSystem(this.scene);
		this.addSystem(this.rocketTrailSystem);

		this.deactivateVr();
	},
	{
		tick: function() {
		},
		activateVr: function() {
			this.renderer.deactivate();
			this.vrSystem.activate();
		},
		deactivateVr: function() {
			this.vrSystem.deactivate();
			this.renderer.activate();
		},
		_updateDimensions: function() {
			this.cameraSystem.updateDimensions();
			this.renderer.updateDimensions();
		}
	}
);

module.exports = ViewSystem;
