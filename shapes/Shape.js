
var objectHero = require('object-hero');

var shapes = {};

function Shape(config) {
	config = config || {};
	this.type = Shape.NAME;
	this.color = 0xffffff;
	this.position = { x: 0, y: 0, z: 0 };
	this.rotation = { w: 1, x: 0, y: 0, z: 0 },
	this.size = 1;
	this.collision = true;
	objectHero.assignDeep(this, [config]);
	addUniqueId(this);
}

Shape.NAME = 'shape';

function addUniqueId(shape) {
	shape.id = '';
	do {
		shape.id += Math.floor(1000 * Math.random());
	} while (shapes[shape.id]);
	shapes[shape.id] = shape;
}

module.exports = Shape;
