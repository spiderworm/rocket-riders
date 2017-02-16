
var THREE = require('three');
var DECS = require('decs');
var Box = require('../shapes/Box.js');
var Cylinder = require('../shapes/Cylinder.js');
var Sphere = require('../shapes/Sphere.js');
var Hemisphere = require('../shapes/Hemisphere.js');
var CustomShape = require('../shapes/CustomShape.js');
var Arena = require('../shapes/Arena.js');
var ThreeArenaGeometry = require('./ThreeArenaGeometry.js');

var wireframes = false;

function createMaterial(color, forceWireframe) {
	var Material = THREE.MeshBasicMaterial;
	return new Material({
		color: color,
		wireframe: forceWireframe ? true : wireframes
	});
}

var defaultMaterial = createMaterial(0xffffff);
var defaultGeometry = new THREE.BoxGeometry(1,1,1);

var MeshSystem = DECS.createSystemClass(
	function(scene) {
		this.scene = scene;
		this.tick();
	},
	{
		tick: function() {
			this.eachEntity(function(entity, systemComponents) {
				this._addEntityMesh(entity, systemComponents, this.scene);
				this._applyEntityPhysics(entity, systemComponents);
			}.bind(this));
		},
		getEntityMesh: function(entity) {
			var systemComponent = this.getEntitySystemComponent(entity);
			if (!systemComponent.object3D) {
				this._addEntityMesh(entity, systemComponent, this.scene);
			}
			return systemComponent.object3D;
		},
		_addEntityMesh: function(entity, systemComponents) {
			if (!systemComponents.object3D && entity.isAlive && entity.view) {
				//var geometry = new THREE.SphereGeometry(1, 10, 10);
				//var object3D = new THREE.Mesh(geometry, defaultMaterial);
				var object3D = new THREE.Object3D();

				if (entity.shapes) {
					Object.keys(entity.shapes).forEach(function(id) {
						this._addShapeMesh(entity.shapes[id], object3D);
					}.bind(this));
				}

				if (entity.entities) {
					Object.keys(entity.entities).forEach(function(id) {
						this._addEntityMesh(entity.entities[id], {});
					}.bind(this));
				}

				if (entity.physics && entity.physics.position) {
					var position = entity.physics.position;
					object3D.position.set(position.x, position.y, position.z);
				}

				if (entity.physics && entity.physics.rotation) {
					var rotation = entity.physics.rotation;
					object3D.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
				}

				systemComponents.object3D = object3D;
				this.scene.add(object3D);
			}
		},
		_addShapeMesh: function(shape, threeParent) {
			var geometry = defaultGeometry;
			switch(shape.type) {
				case Sphere.NAME:
					geometry = new THREE.SphereGeometry(shape.size / 2, shape.detail, shape.detail);
				break;
				case Hemisphere.NAME:
					geometry = new THREE.SphereGeometry(shape.size / 2, shape.detail, shape.detail, 0, 2 * Math.PI, 0, Math.PI / 2);
				break;
				case Box.NAME:
					geometry = new THREE.CubeGeometry(
						shape.size.x,
						shape.size.y,
						shape.size.z
					);
				break;
				case Cylinder.NAME:
					geometry = new THREE.CylinderGeometry(
						shape.size.diameter / 2,
						shape.size.diameter / 2,
						shape.size.length,
						shape.detail
					);
				break;
				case CustomShape.NAME:
					geometry = new THREE.Geometry();
					var i = 0;
					while(shape.vertices[i]) {
						geometry.vertices.push(
							new THREE.Vector3(
								shape.vertices[i].x * shape.size.x,
								shape.vertices[i].y * shape.size.y,
								shape.vertices[i].z * shape.size.z
							)
						);
						i++;
					}
					var i = 0;
					while(shape.faces[i]) {
						geometry.faces.push(
							new THREE.Face3(shape.faces[i][0], shape.faces[i][1], shape.faces[i][2])
						);
						i++;
					};
				break;
				case Arena.NAME:
					geometry = new ThreeArenaGeometry(
						shape.size.x, shape.size.y, shape.size.z,
						shape.borderRadius, shape.detail
					);
				break;
			}
			var material = defaultMaterial;
			if (shape.color) {
				material = createMaterial(shape.color, shape.wireframe);
			}
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(
				shape.position.x,
				shape.position.y,
				shape.position.z
			);
			mesh.quaternion.set(
				shape.rotation.x,
				shape.rotation.y,
				shape.rotation.z,
				shape.rotation.w
			);
			threeParent.add(mesh);
		},
		_applyEntityPhysics: function(entity, systemComponents) {
			if (entity.physics && systemComponents.object3D) {
				var object3D = systemComponents.object3D;
				var position = entity.physics.position;
				object3D.position.set(position.x, position.y, position.z);
				var rotation = entity.physics.rotation;
				object3D.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
			}
		}
	}
);

module.exports = MeshSystem;
