
var Entity = require('./Entity.js');
var PhysicsComponent = require('./physics/PhysicsComponent.js');
var ViewComponent = require('./view/ViewComponent.js');
var objectHero = require('object-hero');

var PhysicalEntity = Entity.createClass(
	function(props) {
		this.physics = new PhysicsComponent();
		this.view = new ViewComponent();
		this.entities = {};
		this.shapes = {};
		objectHero.assignDeep(this, [props]);
	},
	new Entity()
);

PhysicalEntity.SHAPES = {
	BLOCK: 'block',
	CYLINDER: 'cylinder'
};

module.exports = PhysicalEntity;
