
var Shape = require('./Shape.js');
var objectHero = require('object-hero');

function Sphere(config) {
	config = objectHero.assignDeep(
		{
			type: Sphere.NAME,
			size: 1,
			roundess: 32
		},
		[config]
	);
	Shape.call(this, config);
}

Sphere.NAME = 'sphere';

module.exports = Sphere;
