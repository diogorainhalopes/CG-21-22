'use strict';

class ShipCam extends THREE.PerspectiveCamera {

    constructor() {
        super(70, window.innerWidth / window.innerHeight, 1, 1000);
    }

    setShip(ship) {

        this.ship = ship;
        this.update();
    }

    update() {

        if (!this.ship) return;

        let vector = new THREE.Vector3(0, 0, 0);
        this.ship.getWorldPosition(vector);
        let v3 = new THREE.Vector3(0, 0, 0);
        let dir = new THREE.Vector3();
        
        var shipPosition = getSphericalCoords(this.ship.position);
        shipPosition.x += 30;
        var camCart = getCartesianCoords(shipPosition) 
        this.position.set(  
            camCart.x,
            camCart.y,
            camCart.z
        );
        dir.copy(this.ship.direction);
        v3.subVectors(this.ship.position, dir.multiplyScalar(10) );
        //this.position.subVectors(this.position, this.ship.direction);
        //v3.add(this.ship.direction);
        this.lookAt(v3);
    }

    resize() {

        if (window.innerWidth === 0 || window.innerHeight === 0) {
            return;
        }
        this.aspect = window.innerWidth / window.innerHeight;
        this.updateProjectionMatrix();
    }
}