
var THREE = require('three');
var Geometry = THREE.Geometry;
var Float32BufferAttribute = THREE.Float32BufferAttribute;
var BufferGeometry = THREE.BufferGeometry;
var Vector3 = THREE.Vector3;

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

	var bufferGeometry = new ArenaBufferGeometry( width, height, depth, radius, roundness );

	//debugger;
	this.fromBufferGeometry( bufferGeometry );

}

ArenaGeometry.prototype = Object.create( Geometry.prototype );
ArenaGeometry.prototype.constructor = ArenaGeometry;

function ArenaBufferGeometry( width, height, depth, radius, roundness ) {

	var widthSegments = 80;
	var heightSegments = 60;
	var phiStart = 0
	var phiLength = 2 * Math.PI;
	var thetaStart = 0;
	var thetaLength = Math.PI;

	BufferGeometry.call( this );

	this.type = 'ArenaBufferGeometry';

	this.parameters = {
		width: width,
		height: height,
		depth: depth,
		radius: radius,
		roundness: roundness
	};

	radius = radius || 50;

	var indices = [];
	var vertices = [];
	var normals = [];
	var uvs = [];

	var offset = new THREE.Vector3();

	var xPos = (width/2) - radius;
	var yPos = (height/2) - radius;
	var zPos = (depth/2) - radius;

	var debug = false;
	// build geometry
	[
		[0, 0, new Vector3(-xPos, yPos, zPos)],
		[0, Math.PI/2, new Vector3(-xPos, -yPos, zPos)],
		[Math.PI/2, 0, new Vector3(xPos, yPos, zPos)],
		[Math.PI/2, Math.PI/2, new Vector3(xPos, -yPos, zPos)],
		[2*Math.PI/2, 0, new Vector3(xPos, yPos, -zPos)],
		[2*Math.PI/2, Math.PI/2, new Vector3(xPos, -yPos, -zPos)],
		[3*Math.PI/2, 0, new Vector3(-xPos, yPos, -zPos)],
		[3*Math.PI/2, Math.PI/2, new Vector3(-xPos, -yPos, -zPos)]
	].forEach(function(info) {
		var result = generateCorner(radius, roundness, info[0], info[1], info[2]);
		var indexOffset = vertices.length / 3;
		result.indices.forEach(function(index) {
			indices.push(indexOffset + index);
		});
		vertices = vertices.concat(result.vertices);
		normals = normals.concat(result.normals);
		uvs = uvs.concat(result.uvs);
	});

	this.setIndex( indices );
	this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
	this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
	this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

}

ArenaBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
ArenaBufferGeometry.prototype.constructor = ArenaBufferGeometry;

function generateCorner(radius, segments, phiStart, thetaStart, position) {

	var phiLength = Math.PI / 2;
	var thetaLength = Math.PI / 2;

	var thetaEnd = thetaStart + thetaLength;

	var ix, iy;

	var index = 0;
	var grid = [];

	var vertex = new Vector3();
	var normal = new Vector3();

	var indices = [];
	var vertices = [];
	var normals = [];
	var uvs = [];

	for ( iy = 0; iy <= segments; iy ++ ) {

		var verticesRow = [];

		var v = iy / segments;

		for ( ix = 0; ix <= segments; ix ++ ) {

			var u = ix / segments;

			// vertex

			vertex.x = position.x - radius * Math.cos( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );
			vertex.y = position.y + radius * Math.cos( thetaStart + v * thetaLength );
			vertex.z = position.z + radius * Math.sin( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );

			vertices.push( vertex.x, vertex.y, vertex.z );

			// normal

			normal.set( vertex.x, vertex.y, vertex.z ).normalize();
			normals.push( normal.x, normal.y, normal.z );

			// uv

			uvs.push( u, 1 - v );

			verticesRow.push( index ++ );

		}

		grid.push( verticesRow );

	}

	// indices

	for ( iy = 0; iy < segments; iy ++ ) {

		for ( ix = 0; ix < segments; ix ++ ) {

			var a = grid[ iy ][ ix + 1 ];
			var b = grid[ iy ][ ix ];
			var c = grid[ iy + 1 ][ ix ];
			var d = grid[ iy + 1 ][ ix + 1 ];

			if ( iy !== 0 || thetaStart > 0 ) indices.push( a, b, d );
			if ( iy !== segments - 1 || thetaEnd < Math.PI ) indices.push( b, c, d );

		}

	}

	return {
		indices: indices,
		vertices: vertices,
		normals: normals,
		uvs: uvs
	};

}

module.exports = ArenaGeometry;
