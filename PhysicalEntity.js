
var Entity = require('./Entity.js');
var PhysicsComponent = require('./physics/PhysicsComponent.js');
var ViewComponent = require('./view/ViewComponent.js');

var PhysicalEntity = Entity.createClass(
	function() {
		this.physics = new PhysicsComponent();
		this.view = new ViewComponent();
		this.entities = {};
		this.shapes = {};
	},
	new Entity()
);

PhysicalEntity.SHAPES = {
	BLOCK: 'block',
	CYLINDER: 'cylinder'
};

module.exports = PhysicalEntity;
