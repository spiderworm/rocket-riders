
var PhysicalEntity = require('../PhysicalEntity.js');
var Sphere = require('../shapes/Sphere.js');

var RocketTrail1 = PhysicalEntity.createClass(
	{
		isRocketTrail: true,
		physics: {
			colllision: false
		}
	}
);

module.exports = RocketTrail1;
