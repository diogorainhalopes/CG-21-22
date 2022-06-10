
"use strict";

class Entity extends THREE.Object3D {

    constructor() {
        super();
    }
        
}



class Palanque extends Entity {
    constructor() {
        super();
        this.assemble();
        this.position.set(0, 20, 0);
        this.translateY(FLOOR_HEIGHT);
    }

    assemble() {
        this.addLeg(15, 0, 15);
        this.addLeg(15, 0, -15);
        this.addLeg(-15, 0, 15);
        this.addLeg(-15, 0, -15);
        this.addStep(18, -13, 0);
        this.addStep(18, -3, 0);
        this.addBase(0, 3, 0);
        this.addSupport(0, 15, 15);
        this.addSupport(0, 15, -15);
       
    }

    addLeg(x, y, z) {
         
        const geometry = new THREE.CylinderGeometry(4, 4, 40, 32, 1);
        const material = new THREE.MeshBasicMaterial({color: "rgb(153, 255, 204)"});
        
        var leg = new THREE.Mesh(geometry,material);
        leg.position.set(x, y, z);
        this.add(leg);
    }

    addStep(x, y, z) {
        const geometry = new THREE.BoxGeometry(6, 2, 35);
        const material = new THREE.MeshBasicMaterial({color: "rgb(204, 204, 255)"});
        
        var step = new THREE.Mesh(geometry,material);
        step.position.set(x, y, z);
        this.add(step);
    }

    addBase(x, y, z) {
        const geometry = new THREE.BoxGeometry(35, 2, 35);
        const material = new THREE.MeshBasicMaterial({color: "grey"});
        
        var base = new THREE.Mesh(geometry,material);
        base.position.set(x, y, z);
        this.add(base);
    }

    addSupport(x, y, z) {
        const path = new CustomSinCurve( 8.3 );
        const geometry = new THREE.TubeGeometry( path, 45, 1.5, 34, false );
        const material = new THREE.MeshBasicMaterial( { color: "rgb(255, 230, 230)" } );
        var support = new THREE.Mesh(geometry,material);
        support.position.set(x, y, z);
        this.add(support);
    }
}

class Floor extends Entity {
    constructor() {
        super();
        
        const geometry = new THREE.BoxGeometry(150, 2*FLOOR_HEIGHT, 150);
        const material = new THREE.MeshBasicMaterial({color: "rgb(51, 102, 204)"});
        this.add(new THREE.Mesh(geometry,material));
        this.position.set(0, 0, 0);
    }
}








class CustomSinCurve extends THREE.Curve {
	constructor( scale = 1 ) {
		super();
		this.scale = scale;
	}
	getPoint( t, optionalTarget = new THREE.Vector3() ) {
		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;
		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );

	}

}