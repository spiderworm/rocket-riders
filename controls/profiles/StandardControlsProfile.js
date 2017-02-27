
var ControlsProfile = require('./ControlsProfile.js');

var StandardControlsProfile = ControlsProfile.createClass({
	isControls: true,
	controls: {
		input: {
			setX: {
				axis: {
					'left stick': 'left stick x'
				}
			},
			setY: {
				input: {
					flip: {
						invert: true,
						axis: {
							'left stick': 'left stick y'
						}
					}
				}
			},
			moveX: {
				input: {
					left: {
						keys: {
							d: 'd'
						}
					},
					right: {
						keys: {
							a: 'a'
						}
					}
				}
			},
			moveY: {
				input: {
					forward: {
						keys: {
							w: 'w'
						}
					},
					back: {
						keys: {
							s: 's'
						}
					}
				}
			},
			throttleAdjust: {
				input: {
					increase: {
						keys: {
							e: 'e'
						},
						buttons: {
							'right trigger': 'right trigger'
						}
					},
					decrease: {
						keys: {
							q: 'q'
						},
						buttons: {
							'left trigger': 'left trigger'
						}
					}
				}
			},
			throttleSet: {
				input: {
					0: {
						keys: {
							f: 'f'
						},
						buttons: {
							'left shoulder': 'left shoulder'
						}
					},
					100: {
						keys: {
							r: 'r'
						},
						buttons: {
							'right shoulder': 'right shoulder'
						}
					}
				}
			}
		}
	}
});

module.exports = StandardControlsProfile;
