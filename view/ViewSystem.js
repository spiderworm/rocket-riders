
var DECS = require('decs');
var THREE = require('three');

var CameraSystem = require('./CameraSystem.js');
var MeshSystem = require('./MeshSystem.js');

var ViewSystem = DECS.createSystemClass(
	function() {
		this.canvas = document.createElement('canvas');
		this.canvas.style.position = 'fixed';
		this.canvas.style.top = this.canvas.style.right = this.canvas.style.bottom = this.canvas.style.left = 0;
		document.querySelector('article').appendChild(this.canvas);

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
		this.camera.up.set(0,0,1);
		this.camera.far = 1e20;

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas
		});

		this.cameraSystem = new CameraSystem(this.camera);
		this.addSystem(this.cameraSystem);

		this.meshes = new MeshSystem(this.scene);
		this.addSystem(this.meshes);

	},
	{
		tick: function() {
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.renderer.render(this.scene, this.camera);
		}
	}
);

module.exports = ViewSystem;
