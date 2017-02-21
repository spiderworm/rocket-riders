
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

		this.renderer = new RenderSystem(this.canvas);
		this.vrSystem = new VrSystem(this.renderer);

		this.vrEnabled = false;

		window.addEventListener('vrdisplaypresentchange', (function(event) {
			this.vrEnabled = event.display.isPresenting;
		}).bind(this), false);

		this.meshes = new MeshSystem(this.scene);
		this.addSystem(this.meshes);

		this.cameraSystem = new CameraSystem(this.meshes);
		this.addSystem(this.cameraSystem);

		window.addEventListener('resize', this._updateDimensions.bind(this), false);
		this._updateDimensions();

		this.rocketTrailSystem = new RocketTrailSystem(this.scene);
		this.addSystem(this.rocketTrailSystem);
	},
	{
		tick: function() {
			this.render();
		},
		render: function() {
			if (this.cameraSystem.activeThreeCamera) {
				if (this.vrEnabled) {
					this.vrSystem.render(this.scene, this.cameraSystem.activeThreeCamera);
				} else {
					this.renderer.render(this.scene, this.cameraSystem.activeThreeCamera);
				}
			}
		},
		_updateDimensions: function() {
			this.cameraSystem.updateDimensions();
			this.renderer.updateDimensions();
		}
	}
);

module.exports = ViewSystem;
