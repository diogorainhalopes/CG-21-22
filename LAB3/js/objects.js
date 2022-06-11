
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
        this.receiveShadow = true;
        this.castShadow = true;

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
        this.add(leg);
    }

    addStep(x, y, z) {
        const geometry = new THREE.BoxGeometry(6, 1, 35);
        const material = new THREE.MeshPhongMaterial({color: "rgb(204, 204, 255)"});
        
        var step = new THREE.Mesh(geometry,material);
        step.position.set(x, y, z);
        this.add(step);
    }

    addBase(x, y, z) {
        const geometry = new THREE.BoxGeometry(35, 2, 35);
        const material = new THREE.MeshPhongMaterial({color: "grey"});
        
        var base = new THREE.Mesh(geometry,material);
        base.position.set(x, y, z);
        this.add(base);
    }

    addSupport(x, y, z) {
        const path = new CustomSinCurve( 7 );
        const geometry = new THREE.TubeGeometry( path, 45, 1.5, 34, false );
        const material = new THREE.MeshPhongMaterial( { color: "rgb(255, 230, 230)" } );
        var support = new THREE.Mesh(geometry,material);
        support.position.set(x, y, z);
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
        
        this.add(new THREE.Mesh( geometry, material ));
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
        
        this.add(new THREE.Mesh( geometry, material ));
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
        var BFG = new THREE.BufferAttribute( vertices, 3 )
        geometry.setAttribute( 'position', BFG);
       // geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        geometry.computeVertexNormals();
        
        var material = new THREE.MeshPhongMaterial( { color: "lightgrey",
                                                    //map: new THREE.TextureLoader().load("azulejos.jpg"),
                                                    side : THREE.DoubleSide} );

        BFG
        this.add(new THREE.Mesh( geometry, material ));
    }

}