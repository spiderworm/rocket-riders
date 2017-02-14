
var CANNON = require('cannon');

function threeGeometryToCannonShape(threeGeometry) {
    var verts = [];
    var faces = [];

    if (threeGeometry.metadata.type === "BufferGeometry") {
        var rawVerts = threeGeometry.data.attributes.position.array;
        var rawFaces = threeGeometry.data.index.array;

        for (var j=0; j<threeGeometry.metadata.position; j++) {
            var i = j * 3;
            var vert = new CANNON.Vec3(rawVerts[i], rawVerts[i+1], rawVerts[i+2]);
            verts.push(vert);
        }

        for (var j=0; j<rawFaces.length; j+=3) {
            faces.push([rawFaces[j], rawFaces[j+1], rawFaces[j+2]]);
        }
    }

    var shape = new CANNON.ConvexPolyhedron(verts, faces);
    return shape;
}

var cannonUtil = {
    threeGeometryToCannonShape: threeGeometryToCannonShape
};

module.exports = cannonUtil;
