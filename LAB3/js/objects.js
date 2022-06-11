
"use strict";


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

class Entity extends THREE.Object3D {

    constructor() {
        super();

    }

    rotateItself(angle) {
        this.rotateY(angle);
    }
        
}



class Palanque extends Entity {
    constructor() {
        super();
        this.assemble();
        this.position.set(0, 7.5, 0);
        //this.translateY(FLOOR_HEIGHT);
    }

    assemble() {
        this.addLeg(15, 0, 15);
        this.addLeg(15, 0, -15);
        this.addLeg(-15, 0, 15);
        this.addLeg(-15, 0, -15);
        this.addStep(21, -5, 0);
        this.addStep(18, -1, 0);
        this.addBase(0, 3, 0);
        this.addSupport(0, 3, 15);
        this.addSupport(0, 3, -15);
       
    }

    addLeg(x, y, z) {
         
        const geometry = new THREE.CylinderGeometry(4, 4, 15, 32, 1);
        const material = new THREE.MeshPhongMaterial({color: "rgb(153, 255, 204)"});
        
        var leg = new THREE.Mesh(geometry,material);
        leg.position.set(x, y, z);
        leg.castShadow = true;
        leg.receiveShadow = true;
        this.add(leg);
    }

    addStep(x, y, z) {
        const geometry = new THREE.BoxGeometry(6, 1, 35);
        const material = new THREE.MeshPhongMaterial({color: "rgb(204, 204, 255)"});
        
        var step = new THREE.Mesh(geometry,material);
        step.position.set(x, y, z);
        step.castShadow = true;
        step.receiveShadow = true;
        this.add(step);
    }

    addBase(x, y, z) {
        const geometry = new THREE.BoxGeometry(35, 2, 35);
        const material = new THREE.MeshPhongMaterial({color: "grey"});
        
        var base = new THREE.Mesh(geometry,material);
        base.position.set(x, y, z);
        base.castShadow = true;
        base.receiveShadow = true;
        this.add(base);
    }

    addSupport(x, y, z) {
        const path = new CustomSinCurve( 7 );
        const geometry = new THREE.TubeGeometry( path, 45, 1.5, 34, false );
        const material = new THREE.MeshPhongMaterial( { color: "rgb(255, 230, 230)" } );
        var support = new THREE.Mesh(geometry,material);
        support.position.set(x, y, z);
        support.castShadow = true;
        support.receiveShadow = true;
        this.add(support);
    }
}

class Floor extends Entity {
    constructor() {
        super();
        
        const geometry = new THREE.PlaneGeometry(500, 500,32 );
        const material = new THREE.MeshPhongMaterial({color: "rgb(51, 102, 204)"});
        var floor = new THREE.Mesh(geometry,material);
        floor.rotation.x = - Math.PI / 2;
        floor.receiveShadow = true;
        this.add(floor);
        //this.position.set(0, 0, 0);
    }
}



class Phase1 extends Entity {
    constructor() {
        super();
        this.assemble();
        this.position.set(0, 15, 6);
        this.scale.set(2, 2, 2);
    }

    assemble() {
        
        var geometry = new THREE.BufferGeometry();
        var vertices = new Float32Array( [
            0.0, 2.0,  0.0,
            0.5, 1.0,  1.0,
            0.0,  0.0,  0.0,

            0.0, 2.0,  0.0,
            0.5, 1.0,  -1.0,
            0.0,  0.0,  0.0,
        ] );

        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        geometry.computeVertexNormals()
        var material = new THREE.MeshPhongMaterial( { color: "white" , side : THREE.DoubleSide} );
        var phase1 = new THREE.Mesh( geometry, material );
        phase1.castShadow = true;
        phase1.receiveShadow = true;
        this.add(phase1);
    }

}


class Phase2 extends Entity {
    constructor() {
        super();
        this.assemble();
        this.position.set(0, 15, 0);
        this.scale.set(2, 2, 2);

    }

    assemble() {
        
        var geometry = new THREE.BufferGeometry();
        var vertices = new Float32Array( [
            // Back small esq
            -0.1, 2.3,  0.05,
            0.0, 2.3,  0.55,
            0.0,  0.0,  0.0,
            // Back small dir
            -0.1, 2.3,  -0.05,
            0.0, 2.3,  -0.55,
            0.0,  0.0,  0.0,
            // Back big esq
            0.0, 3.0,  0.0,
            0.0, 2.6,  0.55,
            0.0,  0.0,  0.0,
            // Back big dir
            0.0, 3.0,  0.0,
            0.0, 2.6,  -0.55,
            0.0,  0.0,  0.0, 
             // Front small esq
            0.1, 2.5,  0.05,
            0.0, 2.3,  0.55,
            0.0,  0.0,  0.0,
            // Front small dir
            0.1, 2.5,  -0.05,
            0.0, 2.3,  -0.55,
            0.0,  0.0,  0.0, 
            // Front big esq
            0.1, 2.5,  0.05,
            0.0, 2.6,  0.55,
            0.0,  0.0,  0.0,
            // Front big dir
            0.1, 2.5,  -0.05,
            0.0, 2.6,  -0.55,
            0.0,  0.0,  0.0,
           
        ] );

        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        geometry.computeVertexNormals()
        var material = new THREE.MeshPhongMaterial( { color: "white" , side : THREE.DoubleSide} );
        var phase2 = new THREE.Mesh( geometry, material );
        phase2.castShadow = true;
        phase2.receiveShadow = true;
        this.add(phase2);
    }

}


class Phase3 extends Entity {
    constructor() {
        super();
        this.assemble();
        this.position.set(0, 15, -6);
        this.scale.set(2, 2, 2);

    }

    assemble() {
        
        var geometry = new THREE.BufferGeometry();
        var vertices = new Float32Array( [
            // neck
            0.0, 2.7, 0.0,
            0.4, 0.5, 0.0,
            0.0, 0.0, 0.5,

            0.0, 2.7, 0.0,
            -0.16, 2.5, 0.2,
            0.0, 0.0, 0.5,

            0.0, 2.7, 0.0,
            0.4, 0.5, 0.0,
            0.0, 0.0, -0.5,

            0.0, 2.7, 0.0,
            -0.16, 2.5, -0.2,
            0.0, 0.0, -0.5,

            //beak
            -0.16, 2.5, 0.2,
            0.0, 2.7, 0.0,
            1.0, 2.0, 0.0,

            -0.16, 2.5, -0.2,
            0.0, 2.7, 0.0,
            1.0, 2.0, 0.0,

            //body
            -2.8, 1.3, 0.0,
            0.4, 0.5, 0.0,
            0.0, 0.0, 0.5,

            -2.8, 1.3, 0.0,
            -2.0, 0.0, 0.92,
            0.0, 0.0, 0.5,

           -2.8, 1.3, 0.0,
            0.4, 0.5, 0.0,
            0.0, 0.0, -0.5,

            -2.8, 1.3, 0.0,
            -2.0, 0.0, -0.92,
            0.0, 0.0, -0.5,

            // under
            -1.0, 0.3, 0.1,
            0.4, 0.5, 0.0,
            0.0, 0.0, 0.5,

            -1.0, 0.3, 0.1,
            0.0, 0.0, 0.5,
            -1.0, -0.07, 0.85,  ///////////////

            -1.0, 0.3, -0.1,
            0.4, 0.5, 0.0,
            0.0, 0.0, -0.5,

            -1.0, 0.3, -0.1,
            0.0, 0.0, -0.5,
            -1.0, -0.07, -0.85,  ///////////////

            // wings
           

            -1.5, 1.0, 0.17,
            0.0, 0.0, 0.5,
            -2.0, 0.0, 0.92,


            -1.5, 1.0, -0.17,
            0.0, 0.0, -0.5,
            -2.0, 0.0, -0.92,

            // wing outter
            -1.5, 1.0, 0.17,
            0.4, 0.5, 0.0,
            -1.0, -0.07, 0.85,

            0.4, 0.5, 0.0,
            0.0, 0.0, 0.5,
            -1.0, -0.07, 0.85, 

            -1.5, 1.0, -0.17,
            0.4, 0.5, 0.0,
            -1.0, -0.07, -0.85,

            0.4, 0.5, 0.0,
            0.0, 0.0, -0.5,
            -1.0, -0.07, -0.85, 
 
            
        ] );

        var uvs = new Float32Array([
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,

            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0
        ])


        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ));
       // geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        geometry.computeVertexNormals();
        
        var material = new THREE.MeshPhongMaterial( { color: "white",
                                                    //map: new THREE.TextureLoader().load("azulejos.jpg"),
                                                    side : THREE.DoubleSide} );
        var phase3 = new THREE.Mesh( geometry, material );
        phase3.castShadow = true;
        phase3.receiveShadow = true;
        this.add(phase3);
    }

}


class Lamp extends Entity {
    constructor(x, y, z/*, target, intensity, distance*/) {
        super();
        this.assemble();
        //this.light(x, y, z, target, intensity, distance);
        this.position.set(x, y+0.3, z);
    }

    assemble() {
        this.addCone(1.7, 0, 0);
        this.addSphere(0, 0, 0);
        this.rotateZ(-Math.PI/11);
    }

    addCone(x, y, z) {
        const geometry = new THREE.ConeGeometry(5, 20, 32);
        const material = new THREE.MeshPhongMaterial({color: "black"});
        
        var cone = new THREE.Mesh(geometry,material);
        cone.position.set(x, y, z);
        cone.castShadow = true;
        cone.receiveShadow = true;
        cone.rotateZ(-Math.PI/2);
        cone.scale.set(0.15, 0.15, 0.15);
        this.add(cone);
    }

    addSphere(x, y, z) {
        const geometry = new THREE.SphereGeometry( 4.5, 32, 16 );
        const material = new THREE.MeshPhongMaterial({color: "yellow"});
        
        var ball = new THREE.Mesh(geometry,material);
        ball.position.set(x, y, z);
        ball.castShadow = true;
        ball.receiveShadow = true;
        ball.scale.set(0.15, 0.15, 0.15);
        this.add(ball);
    }

}



class SpotLight extends Entity {

    constructor(x, y, z, target, intensity, distance) {
        super();
        this.lamp = new Lamp(x, y, z);
        this.light = new THREE.SpotLight(0xFFFFFF, intensity, distance, Math.PI/6);
        if(z < 0) { this.light.position.set(x, y, z); }
        if(z == 0) { this.light.position.set(x, y, z); }
        if(z > 0) { this.light.position.set(x, y, z); }

        this.light.target = target;
        this.light.castShadow = true;
        this.light.shadow.mapSize.width = 1024;
        this.light.shadow.mapSize.height = 1024;
        this.light.shadow.camera.near = 1;
        this.light.shadow.camera.far = 1000;
        this.light.penumbra = 0.1;

        this.add(this.lamp);
        this.add(this.light);
        this.light.target.updateMatrixWorld();
    }

    switch() {
        this.light.visible = !this.light.visible
    }
}


