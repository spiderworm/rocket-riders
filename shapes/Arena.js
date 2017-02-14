
var Shape = require('./Shape.js');
var objectHero = require('object-hero');

function Arena(config) {
	config = objectHero.assignDeep(
		{
			type: Arena.NAME,
			size: { x: 200, y: 200, z: 200 },
			roundness: 25,
			borderRadius: 100
		},
		[config]
	);
	Shape.call(this, config);
}

Arena.NAME = 'arena';

module.exports = Arena;
