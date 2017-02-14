
var CANNON = require('cannon');
var Shape = CANNON.Shape;
var Vec3 = CANNON.Vec3;

Shape.types.BOUNDARY = 512;

function Boundary(halfExtents, radius){
    Shape.call(this);
    this.type = Shape.types.BOUNDARY;
    this.radius = radius !== undefined ? radius : 1.0;
    this.halfExtents = halfExtents;
    this.emptyExtents = new CANNON.Vec3(
        halfExtents.x - this.radius,
        halfExtents.y - this.radius,
        halfExtents.z - this.radius
    );

    if(this.radius < 0){
        throw new Error('The boundary radius cannot be negative.');
    }

    this.updateBoundingSphereRadius();
}
Boundary.prototype = new Shape();
Boundary.prototype.constructor = Boundary;

Boundary.prototype.calculateLocalInertia = function(mass,target){
    target.x = target.y = target.z = 0;
    return target;
};

Boundary.prototype.volume = function(){
    return 1;
};

Boundary.prototype.updateBoundingSphereRadius = function(){
    this.boundingSphereRadius = Infinity;
};

Boundary.prototype.calculateWorldAABB = function(pos,quat,min,max){
    min.x = min.y = min.z = -Infinity;
    max.x = max.y = max.z = Infinity;
};

CANNON.Narrowphase.prototype[Shape.types.SPHERE | Shape.types.BOUNDARY] =
CANNON.Narrowphase.prototype.sphereBoundary = function(
    sphereShape,
    boundaryShape,
    spherePosition,
    boundaryPosition,
    sphereOrientation,
    boundaryOrientation,
    sphereBody,
    boundaryBody
) {

    var createContact = (function(collisionSphere) {
        var contact = this.createContactEquation(sphereBody,boundaryBody,sphereShape,boundaryShape);

        var contactNormal = contact.ni;
        var sphereContactNormal = contact.ri;
        var boundaryContactNormal = contact.rj;

        // Contact normal
        collisionSphere.position.vsub(spherePosition, contactNormal);
        contactNormal.negate(contactNormal);
        contactNormal.normalize();

        // World-oriented vector that goes from the center of sphereBody to the contact point.
        sphereContactNormal.copy(contactNormal);
        sphereContactNormal.mult(sphereShape.radius, sphereContactNormal);
        sphereContactNormal.vadd(spherePosition, sphereContactNormal);
        sphereContactNormal.vsub(sphereBody.position, sphereContactNormal);

        // World-oriented vector that goes from the center of boundaryBody to the contact point.
        boundaryContactNormal.copy(contactNormal);
        boundaryContactNormal.negate(boundaryContactNormal);
        boundaryContactNormal.mult(-collisionSphere.radius, boundaryContactNormal);
        boundaryContactNormal.vadd(collisionSphere.position, boundaryContactNormal);
        boundaryContactNormal.vsub(boundaryBody.position, boundaryContactNormal);

        this.result.push(contact);
        this.createFrictionEquationsFromContact(contact, this.frictionResult);
    }).bind(this);

    var emptyExtents = boundaryShape.emptyExtents;
    var testPosition = new CANNON.Vec3();
    testPosition.copy(spherePosition);
    testPosition.x = Math.min(testPosition.x, emptyExtents.x);
    testPosition.x = Math.max(testPosition.x, -emptyExtents.x);
    testPosition.y = Math.min(testPosition.y, emptyExtents.y);
    testPosition.y = Math.max(testPosition.y, -emptyExtents.y);
    testPosition.z = Math.min(testPosition.z, emptyExtents.z);
    testPosition.z = Math.max(testPosition.z, -emptyExtents.z);

    var dist = testPosition.distanceTo(spherePosition);
    if (dist >= boundaryShape.radius - sphereShape.radius) {
        var collisionTestSphere = {
            radius: boundaryShape.radius,
            position: testPosition
        };
        createContact(collisionTestSphere);
    }

};

CANNON.Boundary = Boundary;

module.exports = Boundary;
