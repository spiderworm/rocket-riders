
var PhysicalEntity = require('../../PhysicalEntity.js');

var Camera = PhysicalEntity.createClass({
	fov: 75,
	focusVector: { x: 0, y: 1, z: 0 }
});

module.exports = Camera;
