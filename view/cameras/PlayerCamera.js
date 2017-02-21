
var Camera = require('./Camera.js');

var PlayerCamera = Camera.createClass({
	physics: { position: { x: 0, y: 0, z: 0 } },
	focusVector: { x: 0, y: 1, z: 0 }
});

module.exports = PlayerCamera;
