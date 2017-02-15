
var Sphere = require('./Sphere.js');
var objectHero = require('object-hero');

function Hemisphere(config) {
	config = objectHero.assignDeep(
		{
			type: Hemisphere.NAME,
			size: 1,
			roundess: 32
		},
		[config]
	);
	Sphere.call(this, config);
}

Hemisphere.NAME = 'hemisphere';

module.exports = Hemisphere;
