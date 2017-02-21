
var DECS = require('decs');
var THREE = require('three');

var RenderSystem = DECS.createSystemClass(
	function(canvas) {
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true
		});
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setClearColor(0x33aaff);
	},
	{
		render: function(scene, camera) {
			this.renderer.render(scene, camera);
		},
		updateDimensions: function() {
			this.renderer.setSize(window.innerWidth, window.innerHeight);
		}
	}
);

module.exports = RenderSystem;
