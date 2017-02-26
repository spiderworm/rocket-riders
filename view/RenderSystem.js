
var DECS = require('decs');
var THREE = require('three');

var RenderSystem = DECS.createSystemClass(
	function(canvas, threeScene, cameraSystem) {
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true
		});
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setClearColor(0x33aaff);

		this.threeScene = threeScene;

		this.cameraSystem = cameraSystem;

		this._animate();
	},
	{
		activate: function() {
			this.isActive = true;
		},
		deactivate: function() {
			this.isActive = false;
		},
		render: function(scene, camera) {
			if (scene && camera) {
				this.renderer.render(scene, camera);
			}
		},
		updateDimensions: function() {
			this.renderer.setSize(window.innerWidth, window.innerHeight);
		},
		_animate: function() {
			if (this.isActive) {
				this.render(this.threeScene, this.cameraSystem.activeThreeCamera);
			}
			requestAnimationFrame(this._animate.bind(this));
		}
	}
);

module.exports = RenderSystem;
