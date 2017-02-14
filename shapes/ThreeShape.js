
var CustomShape = require('./CustomShape.js');
var objectHero = require('object-hero');
var threeUtil = require('../util/threeUtil.js');

function ThreeShape(threeData, config) {
	var vertsAndFaces = threeUtil.verticesAndFacesFromGeometry(threeData);

	config = objectHero.assignDeep(
		{
			size: { x: 1, y: 1, z: 1}
		},
		[config]
	);
	CustomShape.call(this, vertsAndFaces.vertices, vertsAndFaces.faces, config);
}

ThreeShape.NAME = 'threeShape';

module.exports = ThreeShape;
