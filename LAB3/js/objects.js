"use strict";


class CustomSinCurve extends THREE.Curve {

	constructor(scale = 1) {
		super();
		this.scale = scale;

	}

	getPoint(t, optionalTarget = new THREE.Vector3()) {
		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;
		return optionalTarget.set(tx,ty,tz).multiplyScalar(this.scale);

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
        this.currentMat = 0;
        this.mats = [
            new THREE.MeshPhongMaterial({color:"lightblue"}),
            new THREE.MeshLambertMaterial({color:"pink"})
        ];
        this.basicMaterial = new THREE.MeshBasicMaterial( {color:0xad9675});
        this.assemble();
        this.position.set(0, 7.5, 0);

    }

    assemble() {

        this.addLeg(15, 0, 15);
        this.addLeg(15, 0, -15);
        this.addLeg(-15, 0, 15);
        this.addLeg(-15, 0, -15);
        this.addStep(21, -5, 0);
        this.addStep(17, -1, 0);
        this.addBase(0, 3, 0);
        this.addSupport(0, 3, 15);
        this.addSupport(0, 3, -15);
        this.addWall(-15, 12, 0);
       
    }

    addLeg(x, y, z) {

        const geometry = new THREE.CylinderGeometry(4, 4, 15, 32, 1);
        var material = this.mats[this.currentMat];
        
        var leg = new THREE.Mesh(geometry,material);
        leg.position.set(x, y, z);
        leg.castShadow = true;
        leg.receiveShadow = true;
        this.add(leg);

    }

    addStep(x, y, z) {

        const geometry = new THREE.BoxGeometry(6, 1, 35);

        var material = this.mats[this.currentMat];        
        
        var step = new THREE.Mesh(geometry,material);
        step.position.set(x, y, z);
        step.castShadow = true;
        step.receiveShadow = true;
        this.add(step);

    }

    addBase(x, y, z) {

        const geometry = new THREE.BoxGeometry(30, 2, 35);
        var material = this.mats[this.currentMat];        
        var base = new THREE.Mesh(geometry,material);
        base.position.set(x, y, z);
        base.castShadow = true;
        base.receiveShadow = true;
        this.add(base);

    }

    addSupport(x, y, z) {

        const path = new CustomSinCurve( 7 );
        const geometry = new THREE.TubeGeometry( path, 45, 1.5, 34, false );
        var material = this.mats[this.currentMat];
        var support = new THREE.Mesh(geometry,material);
        support.position.set(x, y, z);
        support.castShadow = true;
        support.receiveShadow = true;
        this.add(support);

    }

    addWall(x, y, z) {

        const geometry = new THREE.BoxGeometry(1, 30, 35);
        var material = this.mats[this.currentMat];        
        var wall = new THREE.Mesh(geometry,material);
        wall.position.set(x, y, z);
        wall.castShadow = true;
        wall.receiveShadow = true;
        this.add(wall);      

    }

    changeMaterial () {

        var j = 0;
        for(j ; j < this.children.length; j++) {
            if (this.currentMat === 0) {
                this.children[j].material = this.mats[1];
            }
            if (this.currentMat === 1) {
                this.children[j].material = this.mats[0];
            }
            this.children[j].material.needsUpdate = true;
        }
        this.currentMat = Math.abs(this.currentMat -1);
    }

    
     lightingCalculationOff() {

        var i = 0;
        for(i ; i < this.children.length; i++) {
            this.children[i].material = this.basicMaterial;
            this.children[i].material.needsUpdate = true;
        }
    }

}


class Floor extends Entity {

    constructor() {
        super();
        this.currentMat = 1;
        this.mats = [
            // new new THREE.MeshBasicMaterial( {color:"lightsalmon3"}),
            new THREE.MeshPhongMaterial({color:"red"}),
            new THREE.MeshLambertMaterial({color:"blue"})
        ];
        this.basicMaterial = new THREE.MeshBasicMaterial( {color:0xe5914f});
        const geometry = new THREE.PlaneGeometry(500, 500,32 );
        var material = this.mats[this.currentMat];  
        var floor = new THREE.Mesh(geometry,material);
        floor.rotation.x = - Math.PI / 2;
        floor.receiveShadow = true;
        this.add(floor);
        //this.position.set(0, 0, 0);

    }

    changeMaterial () {

        var j = 0;
        for(j ; j < this.children.length; j++) {
            if (this.currentMat === 0) {
                this.children[j].material = this.mats[1];
            }
            if (this.currentMat === 1) {
                this.children[j].material = this.mats[0];
            }
            this.children[j].material.needsUpdate = true;
        }
        this.currentMat = Math.abs(this.currentMat -1);
    }

     lightingCalculationOff() {
       
        var i = 0;
        for(i ; i < this.children.length; i++) {
            this.children[i].material = this.basicMaterial;
            this.children[i].material.needsUpdate = true;
        }
    }

}



class Phase1 extends Entity {

    constructor() {
        super();
        this.currentMat = 1;
        var geometry = new THREE.BufferGeometry();
        var vertices = new Float32Array( [
            0.0, 2.0,  0.0,
            0.5, 1.0,  1.0,
            0.0,  0.0,  0.0,

            0.0, 2.0,  0.0,
            0.5, 1.0,  -1.0,
            0.0,  0.0,  0.0,
        ] );

        var geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices,3));
        geometry.setAttribute('uv', new THREE.BufferAttribute( vertices, 3 ));
        geometry.computeVertexNormals();
        
        const texture = new THREE.TextureLoader().load("textures/birds.png" );
        const texture2 = new THREE.TextureLoader().load("textures/birds2.jpg");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 0.3, 0.3 );
        texture2.wrapS = THREE.RepeatWrapping;
        texture2.wrapT = THREE.RepeatWrapping;
        texture2.repeat.set( 0.3, 0.3 );
        this.mats = [
            new THREE.MeshPhongMaterial({map: texture, side : THREE.DoubleSide}),
            new THREE.MeshLambertMaterial({map: texture2, side : THREE.DoubleSide})
        ];
        this.basicMaterial = new THREE.MeshBasicMaterial( {color:0xd5f2ef, side: THREE.DoubleSide});
        var material = this.mats[this.currentMat];
        material.needsUpdate = true;
        var phase1 = new THREE.Mesh( geometry, material );
        phase1.castShadow = true;
        phase1.receiveShadow = true;

        this.add(phase1);

        this.position.set(0, 15, 6);
        this.scale.set(2, 2, 2);

    }

    changeMaterial () {

        var j = 0;
        for(j ; j < this.children.length; j++) {
            if (this.currentMat === 0) {
                this.children[j].material = this.mats[1];
            }
            if (this.currentMat === 1) {
                this.children[j].material = this.mats[0];
            }
            this.children[j].material.needsUpdate = true;
        }
        this.currentMat = Math.abs(this.currentMat -1);
    }

     lightingCalculationOff() {

        var i = 0;
        for(i ; i < this.children.length; i++) {
            this.children[i].material = this.basicMaterial;
            this.children[i].material.needsUpdate = true;
        }
    }

}


class Phase2 extends Entity {

    constructor() {
        super();
        this.currentMat = 1;
        
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

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices,3));
        geometry.setAttribute('uv', new THREE.BufferAttribute( vertices, 3 ));
        geometry.computeVertexNormals();

        const texture = new THREE.TextureLoader().load("textures/birds.png" );
        const texture2 = new THREE.TextureLoader().load("textures/birds2.jpg");

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 0.3, 0.3 );

        texture2.wrapS = THREE.RepeatWrapping;
        texture2.wrapT = THREE.RepeatWrapping;
        texture2.repeat.set( 0.3, 0.3 );

        this.mats = [
            new THREE.MeshPhongMaterial({map: texture, side : THREE.DoubleSide}),
            new THREE.MeshLambertMaterial({map: texture2, side : THREE.DoubleSide})
        ];
        this.basicMaterial =  new THREE.MeshBasicMaterial( {color:0xd5f2ef , side: THREE.DoubleSide}); 
        var material = this.mats[this.currentMat];
        material.needsUpdate = true;

        var phase2 = new THREE.Mesh( geometry, material );
        phase2.castShadow = true;
        phase2.receiveShadow = true;

        this.add(phase2);
        this.position.set(0, 15, 0);
        this.scale.set(2, 2, 2);

    }

    changeMaterial () {

        var j = 0;
        for(j ; j < this.children.length; j++) {
            if (this.currentMat === 0) {
                this.children[j].material = this.mats[1];
            }
            if (this.currentMat === 1) {
                this.children[j].material = this.mats[0];
            }
            this.children[j].material.needsUpdate = true;
        }
        this.currentMat = Math.abs(this.currentMat -1);
    }

     lightingCalculationOff() {

        var i = 0;
        for(i ; i < this.children.length; i++) {
            this.children[i].material = this.basicMaterial;
            this.children[i].material.needsUpdate = true;
        }
    }

}


class Phase3 extends Entity {

    constructor() {
        super();
        this.currentMat = 1;

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

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices,3));
        geometry.setAttribute('uv', new THREE.BufferAttribute( vertices, 3 ));
        geometry.computeVertexNormals();
        
        const texture = new THREE.TextureLoader().load("textures/birds.png" );
        const texture2 = new THREE.TextureLoader().load("textures/birds2.jpg");

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 0.3, 0.3 );

        texture2.wrapS = THREE.RepeatWrapping;
        texture2.wrapT = THREE.RepeatWrapping;
        texture2.repeat.set( 0.3, 0.3 );

        this.mats = [
            new THREE.MeshPhongMaterial({map: texture, side : THREE.DoubleSide}),
            new THREE.MeshLambertMaterial({map: texture2, side : THREE.DoubleSide})
        ];
        this.basicMaterial = new THREE.MeshBasicMaterial( {color:0xd5f2ef, side: THREE.DoubleSide});
        var material = this.mats[this.currentMat];
        material.needsUpdate = true;
        var phase3 = new THREE.Mesh( geometry, material );
        phase3.castShadow = true;
        phase3.receiveShadow = true;

        this.add(phase3);
        this.position.set(0, 15, -6);
        this.scale.set(2, 2, 2);

    }

    changeMaterial () {

        var j = 0;
        for(j ; j < this.children.length; j++) {
            if (this.currentMat === 0) {
                this.children[j].material = this.mats[1];
            }
            if (this.currentMat === 1) {
                this.children[j].material = this.mats[0];
            }
            this.children[j].material.needsUpdate = true;
        }
        this.currentMat = Math.abs(this.currentMat -1);
    }

     lightingCalculationOff() {

        var i = 0;
        for(i ; i < this.children.length; i++) {
            this.children[i].material = this.basicMaterial;
            this.children[i].material.needsUpdate = true;
        }
    }

}


class Lamp extends Entity {

    constructor(x, y, z/*, target, intensity, distance*/) {
        super();
        this.currentMat = 1;
        this.mats = [
            new THREE.MeshPhongMaterial({color:"yellow"}),
            new THREE.MeshLambertMaterial({color:"darkgreen"})
        ];
        this.basicMaterial = new THREE.MeshBasicMaterial( {color:0xd0a1ee});
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
        var material = this.mats[this.currentMat];
        
        var cone = new THREE.Mesh(geometry,material);
        cone.position.set(x, y, z);
        cone.castShadow = true;
        cone.receiveShadow = true;
        cone.rotateZ(-Math.PI/2);
        cone.scale.set(0.15, 0.15, 0.15);
        this.add(cone);

    }

    addSphere(x, y, z) {

        const geometry = new THREE.SphereGeometry(4.5, 32, 16 );
        var material = this.mats[this.currentMat];
        
        var ball = new THREE.Mesh(geometry,material);
        ball.position.set(x, y, z);
        ball.castShadow = true;
        ball.receiveShadow = true;
        ball.scale.set(0.15, 0.15, 0.15);
        this.add(ball);

    }

    changeMaterial () {

        var j = 0;
        for(j ; j < this.children.length; j++) {
            if (this.currentMat === 0) {
                this.children[j].material = this.mats[1];
            }
            if (this.currentMat === 1) {
                this.children[j].material = this.mats[0];
            }
            this.children[j].material.needsUpdate = true;
        }
        this.currentMat = Math.abs(this.currentMat -1);
    }

     lightingCalculationOff() {

        var i = 0;
        for(i ; i < this.children.length; i++) {
            this.children[i].material = this.basicMaterial;
            this.children[i].material.needsUpdate = true;
        }
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
        this.light.shadow.camera.far = 50;
        this.light.penumbra = 0.1;

        this.add(this.lamp);
        this.add(this.light);
        this.light.target.updateMatrixWorld();

    }

    switch() {

        this.light.visible = !this.light.visible;

    }

}

