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

function randomPosition(object) {
    var randX, randY, randZ;

    randX = Math.random() * 2 - 1;
    randY = Math.random() * 2 - 1;
    randZ = Math.random() * 2 - 1;

    object.position.x = randX;
    object.position.y = randY;
    object.position.z = randZ;
    object.position.normalize();
    object.position.multiplyScalar( ORBIT_LENGTH );
    
    object.lookAt(0, 0, 0);

    const ret = [randX, randY, randZ];
    return ret;
}
    
function addCollisionRange(x, y, z, radius) {

    const geometry = new THREE.SphereGeometry(radius, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    
    var body = new THREE.Mesh(geometry,material);

    body.position.set(x,y,z);
    body.position.normalize();
    body.position.multiplyScalar( ORBIT_LENGTH );
    body.visible = false;

    scene.add(body);

    return body;
}