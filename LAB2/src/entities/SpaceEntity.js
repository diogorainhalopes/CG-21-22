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
    
function addCollisionRange(x, y, z, radius) {

    const geometry = new THREE.SphereGeometry(radius, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    
    var body = new THREE.Mesh(geometry,material);

    body.position.set(x,y,z);
    body.position.normalize();
    body.position.multiplyScalar( ORBIT_LENGTH );
    body.visible = false;

    return body;
}