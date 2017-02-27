
var Entity = require('../../Entity.js');

var ControlsProfile = Entity.createClass({
	isControls: true,
	controls: {
		input: {
			setX: {
				name: 'x-move',
				min: -1,
				max: 1,
				inputMethod: 'set'
			},
			setY: {
				name: 'y-move',
				min: -1,
				max: 1,
				inputMethod: 'set'
			},
			moveX: {
				name: 'x-move',
				type: 'center',
				min: -1,
				center: 0,
				max: 1,
				speed: .1,
				inputMethod: 'add',
				input: {
					left: {
						value: 5
					},
					right: {
						value: -5
					}
				}
			},
			moveY: {
				name: 'y-move',
				type: 'center',
				min: -1,
				center: 0,
				max: 1,
				speed: .1,
				inputMethod: 'add',
				input: {
					forward: {
						value: 5
					},
					back: {
						value: -5
					}
				}
			},
			throttleAdjust: {
				name: 'throttle',
				value: 0,
				min: 0,
				max: 1,
				inputMethod: 'add',
				input: {
					increase: {
						value: .5
					},
					decrease: {
						value: -.5
					}
				}
			},
			throttleSet: {
				name: 'throttle',
				value: 0,
				inputMethod: 'set',
				input: {
					0: {
						value: 0
					},
					100: {
						value: 1
					}
				}
			}
		}
	}
});

module.exports = ControlsProfile;
