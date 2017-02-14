
var Shape = require('./Shape.js');
var objectHero = require('object-hero');

function CustomShape(verts, faces, config) {
	config = objectHero.assignDeep(
		{
			type: CustomShape.NAME,
			size: { x: 1, y: 1, z: 1},
			vertices: verts,
			faces: faces
		},
		[config]
	);
	Shape.call(this, config);
}

CustomShape.NAME = 'custom';

module.exports = CustomShape;
