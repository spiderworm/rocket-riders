
var DECS = require('decs');
var THREE = require('three');
window.THREE = THREE;
var VRControls = require('three/examples/js/controls/VRControls.js');
var VREffect = require('three/examples/js/effects/VREffect.js');
var WebVrPolyfill = require('webvr-polyfill');
var WebVrUi = require('webvr-ui');

var VrSystem = DECS.createSystemClass(
	function(threeCamera, threeRenderer) {

		window.addEventListener('load', onLoad);

		function onLoad() {

			var controls = new THREE.VRControls(threeCamera);
			controls.standing = true;
			threeCamera.position.y = controls.userHeight;
			var effect = new THREE.VREffect(threeRenderer);
			effect.setSize(window.innerWidth, window.innerHeight);

			window.addEventListener('resize', onResize, true);
			window.addEventListener('vrdisplaypresentchange', onResize, true);

			var uiOptions = {
				color: 'black',
				background: 'white',
				corners: 'square'
			};

			var vrButton = new WebVrUi.EnterVRButton(threeRenderer.domElement, uiOptions);
			vrButton.on('exit', function() {
				threeCamera.quaternion.set(0, 0, 0, 1);
				threeCamera.position.set(0, controls.userHeight, 0);
			});
			vrButton.on('hide', function() {
				document.getElementById('ui').style.display = 'none';
			});
			vrButton.on('show', function() {
				document.getElementById('ui').style.display = 'inherit';
			});
			document.getElementById('vr-button').appendChild(vrButton.domElement);
			document.getElementById('magic-window').addEventListener('click', function() {
				vrButton.requestEnterFullscreen();
			});

			function onResize(e) {
				effect.setSize(window.innerWidth, window.innerHeight);
				threeCamera.aspect = window.innerWidth / window.innerHeight;
				threeCamera.updateProjectionMatrix();
			}

			function setupStage() {
				navigator.getVRDisplays().then(function(displays) {
					if (displays.length > 0) {
						vrDisplay = displays[0];
						if (vrDisplay.stageParameters) {
							setStageDimensions(vrDisplay.stageParameters);
						}
						vrDisplay.requestAnimationFrame(animate);
					}
				});
			}

			function setStageDimensions(stage) {
				/*
				var material = skybox.material;
				scene.remove(skybox);
				// Size the skybox according to the size of the actual stage.
				var geometry = new THREE.BoxGeometry(stage.sizeX, boxSize, stage.sizeZ);
				skybox = new THREE.Mesh(geometry, material);
				// Place it on the floor.
				skybox.position.y = boxSize/2;
				scene.add(skybox);
				// Place the cube in the middle of the scene, at user height.
				cube.position.set(0, controls.userHeight, 0);
				*/
			}

		}

	}
);

module.exports = VrSystem;
