
var PhysicalEntity = require('../PhysicalEntity.js');

var Level = PhysicalEntity.createClass({
	spawns: {
		0: {
			x: 0,
			y: 0,
			z: 0
		}
	},
	physics: { mass: 0 },
});

module.exports = Level;
