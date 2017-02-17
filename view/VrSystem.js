
var DECS = require('decs');

var WebVrPolyfill = require('webvr-polyfill');

var THREE = require('three');
window.THREE = THREE;
var VRControls = require('three/examples/js/controls/VRControls.js');
var VREffect = require('three/examples/js/effects/VREffect.js');
var WEBVR = require('./external/WebVr.js');

var VrSystem = DECS.createSystemClass(
	function(scene, camera, renderer) {

		if ( WEBVR.isAvailable() === false ) {
			document.body.appendChild( WEBVR.getMessage() );
		}

		var effect, controls;
		var isMouseDown = false;
		var INTERSECTED;
		init();
		animate();
		function init() {
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.sortObjects = false;
			controls = new THREE.VRControls( camera );
			effect = new THREE.VREffect( renderer );
			if ( navigator.getVRDisplays ) {
				navigator.getVRDisplays()
					.then( function ( displays ) {
						effect.setVRDisplay( displays[ 0 ] );
						controls.setVRDisplay( displays[ 0 ] );
					} )
					.catch( function () {
						// no displays
					} );
				var button = WEBVR.getButton( effect );
				document.body.appendChild( button );
			}
		}

		window.addEventListener( 'resize', onWindowResize, false );

		function onWindowResize() {
			effect.setSize( window.innerWidth, window.innerHeight );
		}
		function animate() {
			effect.requestAnimationFrame( animate );
			render();
		}
		function render() {
			controls.update();
			effect.render( scene, camera );
		}

	}
);

module.exports = VrSystem;
