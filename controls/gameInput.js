
var keymaster = require('keymaster');
var mouse = require('mouse-event');
var pointerTrap = require('pointer-trap');
var gamepadsList = require('html5-gamepad');


function GameInput() {
	this.mouse = new GameMouse();
	this.keyboard = new GameKeyboard();
	this.gamepads = [];

	setInterval(this.detectControllers.bind(this), 500);
	setInterval(this.updateControllers.bind(this), 16);
	this.detectControllers();
	this.updateControllers();
}

GameInput.prototype.detectControllers = function() {
	for (var i=0; i<gamepadsList.length; i++) {
		if (!gamepadsList[i]) {
			if (this.gamepads[i]) {
				this.gamepads[i].setDetached();
			}
		} else {
			if (this.gamepads[i]) {
				if (this.gamepads[i].gamepad !== gamepadsList[i]) {
					this.gamepads[i].setGamepad(i);
				}
			} else {
				this.gamepads[i] = new GameController(i);
			}
		}
	}
}

GameInput.prototype.updateControllers = function() {
	navigator.getGamepads();
};




function GameMouse() {}

GameMouse.prototype.lock = function(element) {
	this.stream = pointerTrap(element);
	return this.stream;
};

GameMouse.prototype.isLocked = function() {
	return this.stream ? true : false;
};

GameMouse.prototype.unlock = function() {
	this.stream = null;
	document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
	document.exitPointerLock();
};




function GameKeyboard() {}

GameKeyboard.prototype.isPressed = function(key) {
	return keymaster.isPressed(key);
};




function GameController(i) {
	this.setGamepad(i);
}

GameController.prototype.setGamepad = function(i) {
	this.gamepad = gamepadsList[i];
};

GameController.prototype.isPressed = function(button) {
	return this.gamepad.button(button);
};

GameController.prototype.getAxis = function(axis) {
	return this.gamepad.axis(axis);
};

GameController.prototype.setAttached = function() {
	this.isAttached = true;
};

GameController.prototype.setDetached = function() {
	this.isAttached = false;
};



var gameInput = new GameInput();
module.exports = gameInput;
