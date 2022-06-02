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
        this.position.set(
            vector.x + this.ship.position.x ,
            vector.y + 10,
            vector.z + this.ship.position.z 
        );
        this.lookAt(vector);
    }

    resize() {

        if (window.innerWidth === 0 || window.innerHeight === 0) {
            return;
        }
        this.aspect = window.innerWidth / window.innerHeight;
        this.updateProjectionMatrix();
    }
}