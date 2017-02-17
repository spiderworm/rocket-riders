
var debugNode = document.createElement('div');
debugNode.style.position = 'fixed';
debugNode.style.zIndex = 9e10;
debugNode.style.top = debugNode.style.left = 0;
debugNode.style.backgroundColor = 'rgba(255, 255, 255, .5)';

document.body.appendChild(debugNode);

function debug(text) {
	var node = document.createElement('div');
	node.innerText = text;
	debugNode.appendChild(node);
}

function clearDebug() {
	debugNode.innerHTML = '';
}

window.debug = debug;
window.clearDebug = clearDebug;

window.WebVRConfig = window.WebVRConfig || {
  BUFFER_SCALE: 1,
  CARDBOARD_UI_DISABLED: false,
  ROTATE_INSTRUCTIONS_DISABLED: false,
  TOUCH_PANNER_DISABLED: false,
  MOUSE_KEYBOARD_CONTROLS_DISABLED: false
};

require('./demo/arenaPhysicsDemo.js');
