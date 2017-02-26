
var Entity = require('../Entity.js');

var W = 87;
var A = 65;
var S = 83;
var D = 68;

var R = 82;
var F = 70;

var UP = 38;
var LEFT = 37;
var DOWN = 40;
var RIGHT = 39;

var MouseKeyboardControls = Entity.createClass({
	isControls: true,
	controls: {
		input: {
			0: {
				name: 'y-move',
				type: 'center',
				min: -1,
				center: 0,
				max: 1,
				speed: .1,
				inputMethod: 'add',
				input: {
					0: {
						value: 5,
						keys: {
							0: W,
							//1: UP
						}
					},
					1: {
						value: -5,
						keys: {
							0: S,
							//1: DOWN
						}
					}
				}
			},
			1: {
				name: 'x-move',
				type: 'center',
				min: -1,
				center: 0,
				max: 1,
				speed: .1,
				inputMethod: 'add',
				input: {
					0: {
						value: 5,
						keys: {
							0: D,
							//1: RIGHT
						}
					},
					1: {
						value: -5,
						keys: {
							0: A,
							//1: LEFT
						}
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
						value: 1,
						keys: {
							0: UP
						}
					},
					decrease: {
						value: -1,
						keys: {
							0: DOWN
						}
					}
				}
			},
			throttleSet: {
				name: 'throttle',
				value: 0,
				inputMethod: 'set',
				input: {
					0: {
						value: 0,
						keys: {
							0: LEFT
						}
					},
					100: {
						value: 1,
						keys: {
							0: RIGHT
						}
					}
				}
			}
		}
	}
});

module.exports = MouseKeyboardControls;
