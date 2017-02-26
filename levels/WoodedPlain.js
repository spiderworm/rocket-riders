
var Level = require('./Level.js');
var PhysicalEntity = require('../PhysicalEntity.js');
var Box = require('../shapes/Box.js');
var Cylinder = require('../shapes/Cylinder.js');
var Tree = require('../scenery/Tree.js');

var Level1 = Level.createClass(
	function() {
		this.createLand();
	},
	{
		type: 'Level1',
		spawns: { x: 0, y: 0, z: 5 },
		createLand: function() {

			function Block(x, y) {
				var block = new Box({
					size: {
						x: blockSizeX,
						y: blockSizeY,
						z: blockSizeZ
					},
					position: {
						x: blockSizeX * x,
						y: blockSizeY * y,
						z: 0
					},
					color: 0x00ff00
				});
				return block;
			}

			function BlockDetail(block) {
				var detail = new Tree();
				detail.physics.position = {
					x: block.position.x + (Math.random() * block.size.x) - (block.size.x / 2),
					y: block.position.y + (Math.random() * block.size.y) - (block.size.y / 2),
					z: block.position.z + (block.size.z / 2) + (detail.shapes.trunk.size.length / 2)
				};
				return detail;
			}

			var blockSizeX = blockSizeY = 1e4;
			var blockSizeZ = 10;
			var blockCountX = blockCountY = 3;

			var blockDetailCount = Math.ceil(blockSizeX * blockSizeY / 1e7);

			for (var x = -Math.floor(blockCountX / 2); x <= Math.floor(blockCountX / 2); x++) {
				for (var y = -Math.floor(blockCountY / 2); y <= Math.floor(blockCountY / 2); y++) {
					var block = new Block(x, y);
					this.shapes[block.id] = block;
					for (var i = 0; i<blockDetailCount; i++) {
						var detail = new BlockDetail(block);
						this.entities[detail.id] = detail;
					}
				}
			}

		}
	}
);

module.exports = Level1;
