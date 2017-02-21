
var Camera = require('./Camera.js');

var ArenaCamera = Camera.createClass({
	fov: 80,
	focusPoint: { x: 0, y: 0, z: 0 }
});

module.exports = ArenaCamera;
