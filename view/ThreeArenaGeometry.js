
var THREE = require('three');
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var Float32BufferAttribute = THREE.Float32BufferAttribute;
var BufferGeometry = THREE.BufferGeometry;
var Vector3 = THREE.Vector3;
var Vector2 = THREE.Vector2;

function ArenaGeometry( width, height, depth, radius, roundness ) {

	Geometry.call( this );

	this.type = 'ArenaGeometry';

	this.parameters = {
		width: width,
		height: height,
		depth: depth,
		radius: radius,
		roundness: roundness
	};

	var geometry = new SphereGeometry(radius, roundness * 4, roundness * 4, 0, Math.PI * 2.01, 0, Math.PI);

	var adjustments = new Vector3((width / 2) - radius, (height / 2) - radius, (depth / 2) - radius);

	geometry.vertices.forEach(function(vertex) {
		if (vertex.x < 0) {
			vertex.x -= adjustments.x;
		} else if (vertex.x > 0) {
			vertex.x += adjustments.x;
		}

		if (vertex.y < 0) {
			vertex.y -= adjustments.y;
		} else if (vertex.y > 0) {
			vertex.y += adjustments.y;
		}

		if (vertex.z < 0) {
			vertex.z -= adjustments.z;
		} else if (vertex.z > 0) {
			vertex.z += adjustments.z;
		}
	});

	geometry.verticesNeedUpdate = true;

	this.merge(geometry);
}

ArenaGeometry.prototype = Object.create( Geometry.prototype );
ArenaGeometry.prototype.constructor = ArenaGeometry;

module.exports = ArenaGeometry;
