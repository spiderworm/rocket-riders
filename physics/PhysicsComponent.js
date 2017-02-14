
var PhysicsComponent = function() {
	return {
		mass: 1,
		position: {
			x: 0,
			y: 0,
			z: 0
		},
		rotation: {
			w: 1,
			x: 0,
			y: 0,
			z: 0
		},
		velocity: {
			x: 0,
			y: 0,
			z: 0
		},
		linearDamping: .01,
		angularDamping: .01
	};
};

module.exports = PhysicsComponent;
