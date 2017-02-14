
var Shape = require('./Shape.js');
var objectHero = require('object-hero');

function Cylinder(config) {
	config = objectHero.assignDeep(
		{
			type: Cylinder.NAME,
			size: { diameter: 1, length: 1 },
			roundness: 8
		},
		[config]
	);
	Shape.call(this, config);
}

Cylinder.NAME = 'cylinder';

module.exports = Cylinder;
