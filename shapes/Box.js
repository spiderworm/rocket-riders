
var Shape = require('./Shape.js');
var objectHero = require('object-hero');

function Box(config) {
	config = objectHero.assignDeep(
		{
			type: Box.NAME,
			size: { x: 1, y: 1, z: 1}
		},
		[config]
	);
	Shape.call(this, config);
}

Box.NAME = 'box';

module.exports = Box;
