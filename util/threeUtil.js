
function verticesAndFacesFromGeometry(threeGeometry) {
    var verts = [];
    var faces = [];

    if (threeGeometry.metadata.type === "BufferGeometry") {
        var rawVerts = threeGeometry.data.attributes.position.array;
        var rawFaces = threeGeometry.data.index.array;

        for (var j=0; j<threeGeometry.metadata.position; j++) {
            var i = j * 3;
            verts.push({
                x: rawVerts[i],
                y: rawVerts[i+2],
                z: rawVerts[i+1]
            });
        }

        for (var j=0; j<rawFaces.length; j+=3) {

            var face = [
                rawFaces[j+0],
                rawFaces[j+1],
                rawFaces[j+2]
            ];

            faces.push(face);
        }
    }

    return {
        vertices: verts,
        faces: faces
    };
}

var threeUtil = {
    verticesAndFacesFromGeometry: verticesAndFacesFromGeometry
};

module.exports = threeUtil;
