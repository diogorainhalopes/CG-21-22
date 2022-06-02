"use strict";

class SpaceEntity extends THREE.Object3D {


    constructor(x,y,z) {
        super();

        this.position.set(x,y,z);
        
    }

    getPosition() {
        return this.position;
    }

    getQuadrant() {
        return this.quadrant;
    }

    getCollisionRadius() {
        return this.collisionRadius;
    }

    setCollisionRadius(radius) {
        this.collisionRadius = radius;
    }

    computeQuadrant() {
        // TODO: Alterar para coords esfericas
        this.quadrant = this.position.z > 0 ? (this.position.y > 0 ? 1 : 2) : (this.position.y > 0 ? 3 : 4);
    }
    
    randomPosition() {
        this.position.x = Math.random() * 2 - 1;
        this.position.y = Math.random() * 2 - 1;
        this.position.z = Math.random() * 2 - 1;
    
        this.position.normalize();
        this.position.multiplyScalar( ORBIT_LENGTH );
        
        this.lookAt(0, 0, 0);
        this.computeQuadrant();
    }

    create() {
        
    }
    
}