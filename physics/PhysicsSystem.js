
var DECS = require('decs');
var CANNON = require('cannon');
var Box = require('../shapes/Box.js');
var Cylinder = require('../shapes/Cylinder.js');
var Sphere = require('../shapes/Sphere.js');
var CustomShape = require('../shapes/CustomShape.js');

var Arena = require('../shapes/Arena.js');
var BoundaryCannonShape = require('./BoundaryCannonShape.js');

var PhysicsSystem = DECS.createSystemClass(
	function() {
		this.cannon = new CANNON.World();
		this.cannon.defaultContactMaterial.friction = .001;
		this.cannon.gravity.set(0,0,-9.82);
		this.cannon.broadphase = new CANNON.NaiveBroadphase();
		this.cannon.solver.iterations = 50;
		this.cannon.defaultContactMaterial.contactEquationStiffness = 1e10;
		this.cannon.defaultContactMaterial.contactEquationRegularizationTime = 3;
	},
	{
		tick: function(ms) {
			this.eachEntity(function(entity, systemComponents) {
				this._addEntityBody(entity, systemComponents);
			}.bind(this));
			this.cannon.step(Math.min(ms/1000, .03));
			this.eachEntity(function(entity, systemComponents) {
				this._applyEntityPhysics(entity, systemComponents);
			}.bind(this));
		},
		getCannonBody: function(entity) {
			return this.getEntitySystemComponent(entity).body;
		},
		_addEntityBody: function(entity, systemComponents) {
			if (entity.physics && entity.physics.collision && !systemComponents.body) {
				var body = new CANNON.Body({
					mass: entity.physics.mass,
					angularDamping: entity.physics.angularDamping,
					linearDamping: entity.physics.linearDamping
				});

				Object.keys(entity.shapes).forEach(function(id) {
					this._addShape(entity.shapes[id], body);
				}.bind(this));

				if (entity.entities) {
					Object.keys(entity.entities).forEach(function(id) {
						var subEntity = entity.entities[id];
						this._addEntityBody(subEntity, this.getEntitySystemComponent(subEntity));
					}.bind(this));
				}

				body.position.set(
					entity.physics.position.x,
					entity.physics.position.y,
					entity.physics.position.z
				);

				body.quaternion.set(
					entity.physics.rotation.x,
					entity.physics.rotation.y,
					entity.physics.rotation.z,
					entity.physics.rotation.w
				);

				body.velocity.set(
					entity.physics.velocity.x,
					entity.physics.velocity.y,
					entity.physics.velocity.z
				);

				this.cannon.add(body);
				body.updateBoundingRadius();
			    body.updateMassProperties();
				systemComponents.body = body;
			}
		},
		_addShape: function(shape, cannonBody) {
			var cannonShape;
			switch(shape.type) {
				case Sphere.NAME:
					cannonShape = new CANNON.Sphere(shape.size / 2);
				break;
				case Cylinder.NAME:
					cannonShape = new CANNON.Cylinder(
						shape.size.diameter / 2,
						shape.size.diameter / 2,
						shape.size.length,
						shape.roundness
					);
					var quat = new CANNON.Quaternion();
					quat.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
					var translation = new CANNON.Vec3(0,0,0);
					cannonShape.transformAllPoints(translation,quat);
				break;
				case Box.NAME:
					cannonShape = new CANNON.Box(
						new CANNON.Vec3(
							shape.size.x / 2,
							shape.size.y / 2,
							shape.size.z / 2
						)
					);
				break;
				case CustomShape.NAME:
					var verts = [];
					var faces = [];
					var i = 0;
					while(shape.vertices[i]) {
						verts.push(
							shape.vertices[i].x * shape.size.x,
							shape.vertices[i].y * shape.size.y,
							shape.vertices[i].z * shape.size.z
						);
						i++;
					}
					var i = 0;
					while(shape.faces[i]) {
						faces.push(
							shape.faces[i][0], shape.faces[i][1], shape.faces[i][2]
						);
						i++;
					};
					cannonShape = new CANNON.Trimesh(verts, faces);
				break;
				case Arena.NAME:
					cannonShape = new BoundaryCannonShape(
						new CANNON.Vec3(shape.size.x/2, shape.size.y/2, shape.size.z/2),
						shape.borderRadius
					);
				break;
			}
			if (cannonShape) {
				var position = new CANNON.Vec3(shape.position.x, shape.position.y, shape.position.z);
				var rotation = new CANNON.Quaternion(shape.rotation.x, shape.rotation.y, shape.rotation.z, shape.rotation.w);
				cannonBody.addShape(cannonShape, position, rotation);
			}
		},
		_applyEntityPhysics: function(entity, systemComponents) {
			if (systemComponents.body && entity.physics) {
				var position = systemComponents.body.position;
				entity.physics.position.x = position.x;
				entity.physics.position.y = position.y;
				entity.physics.position.z = position.z;
				var rotation = systemComponents.body.quaternion;
				entity.physics.rotation.w = rotation.w;
				entity.physics.rotation.x = rotation.x;
				entity.physics.rotation.y = rotation.y;
				entity.physics.rotation.z = rotation.z;
			}
		}
	}
);

module.exports = PhysicsSystem;
