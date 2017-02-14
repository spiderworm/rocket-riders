
var PhysicalEntity = require('../PhysicalEntity.js');
var Level = require('./Level.js');
var ThreeShape = require('../shapes/ThreeShape.js');

var arenaN1 = require('./standard-arena/physics/N1.three.json');
var arenaNE1 = require('./standard-arena/physics/NE1.three.json');
var arenaE1 = require('./standard-arena/physics/E1.three.json');
var arenaSE1 = require('./standard-arena/physics/SE1.three.json');
var arenaS1 = require('./standard-arena/physics/S1.three.json');
var arenaSW1 = require('./standard-arena/physics/SW1.three.json');
var arenaW1 = require('./standard-arena/physics/W1.three.json');
var arenaNW1 = require('./standard-arena/physics/NW1.three.json');
var arenaCenter1 = require('./standard-arena/physics/Center1.three.json');
var arenaN2 = require('./standard-arena/physics/N2.three.json');
var arenaNE2 = require('./standard-arena/physics/NE2.three.json');
var arenaE2 = require('./standard-arena/physics/E2.three.json');
var arenaSE2 = require('./standard-arena/physics/SE2.three.json');
var arenaS2 = require('./standard-arena/physics/S2.three.json');
var arenaSW2 = require('./standard-arena/physics/SW2.three.json');
var arenaW2 = require('./standard-arena/physics/W2.three.json');
var arenaNW2 = require('./standard-arena/physics/NW2.three.json');
//var arenaCenter2 = require('./standard-arena/physics/Center2.three.json');
var arenaN3 = require('./standard-arena/physics/N3.three.json');
var arenaNE3 = require('./standard-arena/physics/NE3.three.json');
var arenaE3 = require('./standard-arena/physics/E3.three.json');
var arenaSE3 = require('./standard-arena/physics/SE3.three.json');
var arenaS3 = require('./standard-arena/physics/S3.three.json');
var arenaSW3 = require('./standard-arena/physics/SW3.three.json');
var arenaW3 = require('./standard-arena/physics/W3.three.json');
var arenaNW3 = require('./standard-arena/physics/NW3.three.json');
var arenaCenter3 = require('./standard-arena/physics/Center3.three.json');

var scale = 200;
var size = { x: scale, y: scale, z: scale };

var ArenaPiece = PhysicalEntity.createClass(
	function(threePiece) {
		this.shapes[0] = new ThreeShape(
			threePiece,
			{
				color: 0x999999,
				wireframe: true,
				position: { x: 0, y: 0, z: 0 },
				size: size
			}
		);
	},
	{
		shapes: {}
	}
);

var StandardArena = Level.createClass(
	function() {},
	{
		entities: {
			N1: new ArenaPiece(arenaN1),
			NE1: new ArenaPiece(arenaNE1),
			E1: new ArenaPiece(arenaE1),
			SE1: new ArenaPiece(arenaSE1),
			S1: new ArenaPiece(arenaS1),
			SW1: new ArenaPiece(arenaSW1),
			W1: new ArenaPiece(arenaW1),
			NW1: new ArenaPiece(arenaNW1),
			Center1: new ArenaPiece(arenaCenter1),
			N2: new ArenaPiece(arenaN2),
			NE2: new ArenaPiece(arenaNE2),
			E2: new ArenaPiece(arenaE2),
			SE2: new ArenaPiece(arenaSE2),
			S2: new ArenaPiece(arenaS2),
			SW2: new ArenaPiece(arenaSW2),
			W2: new ArenaPiece(arenaW2),
			NW2: new ArenaPiece(arenaNW2),
			//Center2: new ArenaPiece(arenaCenter2),
			N3: new ArenaPiece(arenaN3),
			NE3: new ArenaPiece(arenaNE3),
			E3: new ArenaPiece(arenaE3),
			SE3: new ArenaPiece(arenaSE3),
			S3: new ArenaPiece(arenaS3),
			SW3: new ArenaPiece(arenaSW3),
			W3: new ArenaPiece(arenaW3),
			NW3: new ArenaPiece(arenaNW3),
			Center3: new ArenaPiece(arenaCenter3)
		}
	}
);

module.exports = StandardArena;
