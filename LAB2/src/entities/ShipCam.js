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
        let vector = new THREE.Vector3(0, 0, 0);
        this.ship.getWorldPosition(vector);
        this.position.set(
            vector.x + -this.ship.direction.x * 30,
            vector.y + 20,
            vector.z + this.ship.direction.z * 30
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