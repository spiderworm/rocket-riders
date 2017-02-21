
var Camera = require('./Camera.js');

var BehindPlayerCamera = Camera.createClass({
	physics: { position: { x: 0, y: -10, z: 3 } },
	focusVector: { x: 0, y: 10, z: 1 }
});

module.exports = BehindPlayerCamera;
