"use strict";

class SpaceEntity extends THREE.Object3D {


    constructor(x,y,z) {
        super();
        this.position.set(x,y,z);
       
        
    }

    getPosition() {
        return this.position;
    }

    create() {
        
    }
    
} 