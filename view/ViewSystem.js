
var DECS = require('decs');
var THREE = require('three');

var CameraSystem = require('./CameraSystem.js');
var MeshSystem = require('./MeshSystem.js');
var VrSystem = require('./VrSystem.js');

var ViewSystem = DECS.createSystemClass(
	function() {
		this.canvas = document.createElement('canvas');
		this.canvas.style.position = 'fixed';
		this.canvas.style.top = this.canvas.style.right = this.canvas.style.bottom = this.canvas.style.left = 0;
		document.querySelector('article').appendChild(this.canvas);

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1e20);
		this.camera.up.set(0,0,1);

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true
		});
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setClearColor(0x33aaff);

		this.cameraSystem = new CameraSystem(this.camera);
		this.addSystem(this.cameraSystem);

		this.meshes = new MeshSystem(this.scene);
		this.addSystem(this.meshes);

		this.vrSystem = new VrSystem(this.scene, this.camera, this.renderer);

		window.addEventListener( 'resize', updateDimensions.bind(this), false );

		function updateDimensions() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
		}

	},
	{
		tick: function() {
			//this.renderer.setSize(window.innerWidth, window.innerHeight);
			//this.renderer.render(this.scene, this.camera);
		}
	}
);

module.exports = ViewSystem;
