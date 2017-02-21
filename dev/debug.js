
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

debug.clear = clearDebug;

window.debug = debug;
window.clearDebug = clearDebug;

module.exports = debug;
