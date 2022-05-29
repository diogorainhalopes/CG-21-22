
class SpaceEntity extends THREE.Object3D {


    constructor(x,y,z) {
        super();
        this.position.set(x,y,z) 
        
    }


    getPosition() {
        return this.position;
    }

    setPosition(x,y,z) {
        this.position.set(x,y,z);
    }
    
} 