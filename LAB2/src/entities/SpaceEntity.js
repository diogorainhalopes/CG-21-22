"use strict";

class SpaceEntity extends THREE.Object3D {


    constructor(x,y,z) {
        super();
        this.position.set(x,y,z);
        
    }

    getPosition() {
        return this.position;
    }

    getCollisionRadius() {
        return this.collisionRadius;
    }

    setCollisionRadius(radius) {
        this.collisionRadius = radius;
    }

    
    create() {
        
    }
    
}

function randomPosition(object) {
    object.position.x = Math.random() * 2 - 1;
    object.position.y = Math.random() * 2 - 1;
    object.position.z = Math.random() * 2 - 1;
    
    object.position.normalize();
    object.position.multiplyScalar( ORBIT_LENGTH );
    
    object.lookAt(0, 0, 0);
}