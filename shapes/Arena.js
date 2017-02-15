
var Shape = require('./Shape.js');
var objectHero = require('object-hero');

function Arena(config) {
	config = objectHero.assignDeep(
		{
			type: Arena.NAME,
			size: { x: 100, y: 100, z: 100 },
			roundness: 25,
			borderRadius: 50
		},
		[config]
	);
	Shape.call(this, config);
}

Arena.NAME = 'arena';

module.exports = Arena;
