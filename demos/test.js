
var DECS = require('decs');
var PhysicsSystem = require('../physics/PhysicsSystem.js');
var ViewSystem = require('../view/ViewSystem.js');
var PhysicalEntity = require('../PhysicalEntity.js');
var Box = require('../shapes/Box.js');
var Sphere = require('../shapes/Sphere.js');

var CoordinateBall = PhysicalEntity.createClass(
	function(isDynamic, color, objectPosition, shapeOffset) {
		this.physics.mass = isDynamic ? 1 : 0;
		this.shapes.sphere.color = color || 0xffffff;
		this.physics.position = objectPosition || {x: 0, y: 0, z: 0};
		this.shapes.sphere.position = shapeOffset || {x: 0, y: 0, z: 0};
	},
	{
		shapes: {
			sphere: new Sphere({ wireframe: true })
		}
	}
);

var game = new DECS();

var physics = new PhysicsSystem();
game.addSystem(physics);

var originBall = new CoordinateBall(false, 0xffffff);
game.addEntity(originBall);

var testBall1 = new CoordinateBall(false, 0xff0000, {x: 5, y: 0, z: 0}, {x: -10, y: 0, z: 0});
game.addEntity(testBall1);

var dropBall1 = new CoordinateBall(true, 0x0000ff, {x: 0, y: 0, z: 2}, {x: 0, y: 0, z: 0});
game.addEntity(dropBall1);

game.view = new ViewSystem();
game.addSystem(game.view);
game.view.tick();
game.view.cameraSystem.setTarget(game.view.meshes.getEntityMesh(originBall));

window.game = game;
console.info('game', game);
