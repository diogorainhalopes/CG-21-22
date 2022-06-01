"use strict";
var randomColor , randomWire;

class Spaceship extends SpaceEntity {

    


    constructor(x,y,z,radius) {
        super(x,y,z);


        this.setup(radius);
        this.assemble();
      

    }


    setup(radius) {

        this.setTotalHeight(radius);
        this.setBoosterRadius();
        this.setBodyHeight();
        this.setNoseHeight();
        this.setBoostersHeight();
        this.setInfo();

    }

    getTotalHeight() {
        return this.totalHeight;
    }

    setTotalHeight(radius) {
    
      
        this.totalHeight = radius/11;
    
    }

    getBoosterRadius() {
        return this.boosterRadius;

    }

    setBoosterRadius() {
        this.boosterRadius = this.getTotalHeight() / 4;

    }

    getBodyHeight() {
        return this.mainBodyHeight;
    
    }

    setBodyHeight() {
        this.mainBodyHeight = 2/4 * this.getTotalHeight();

    }

    getNoseHeight() {
        return this.noseHeight;
    
    }

    setNoseHeight() {
        this.noseHeight = 1/4* this.getTotalHeight();
    
    }

    getBoostersHeight() {
        return this.getBoostersHeight;
    
    }

    setBoostersHeight() {
        this.boostersHeight = 1/4* this.getTotalHeight();

    }

    getInfo() {
        return this.name
    
    }

    setInfo(name) {
        this.name = name;
   
    }


    assemble() {

        
        scene.add(this);
        this.addBody();
        this.addNose();
        this.addAuxiliaryBoosters();        
  

    }

    addBody() {
        randomColor = '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
        randomWire = Math.random() < 0.5;

        console.log("tamanho do main body");
        console.log(this.getBodyHeight());

        const geometry = new THREE.CylinderGeometry(4,2, this.getBodyHeight(),32);
        const material = new THREE.MeshBasicMaterial( { color: randomColor, wireframe: randomWire } );
        
        var body = new THREE.Mesh(geometry,material);
      
        body.rotateX(0);
	    body.rotateY(0);
    	body.rotateZ(90 * Math.PI / 180);
        body.position.set(0,0,0)
        this.add(body);
    }

    addNose() {

        randomColor = '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
        randomWire = Math.random() < 0.5;

        const geometry = new THREE.CylinderGeometry(2, 0,this.getNoseHeight(),32);
        const material = new THREE.MeshBasicMaterial( { color: randomColor, wireframe: randomWire } );
        
        var nose = new THREE.Mesh(geometry,material);
      
        nose.rotateX(0);
	    nose.rotateY(0);
    	nose.rotateZ(90 * Math.PI / 180);
        nose.position.set(1.7,0,0);
        
        this.add(nose);
    }

    addBooster(mode,pos) {

        randomColor = '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
        randomWire = Math.random() < 0.5;

        const geometry = new THREE.CapsuleGeometry(this.getBoosterRadius(),);
        const material = new THREE.MeshBasicMaterial( { color: randomColor, wireframe: randomWire } );

        var booster = new THREE.Mesh(geometry,material);

        booster.rotateY(0);
    	booster.rotateZ(90 * Math.PI / 180);
        if(mode == "length") {
            booster.position.set(-2.77,pos,0);

            // set according to width
        } else {
            booster.position.set(-2.77,0,pos);

        }
        this.add(booster);

    }

    addAuxiliaryBoosters() {

        var positionBooster = [3,-3,3,-3];
        var mode = ["length","width"];

        for (let i = 0; i < 4; i++) {
            console.log(positionBooster[i])
            if(i < 2) {
                this.addBooster(mode[0],positionBooster[i]);
            }
            else {
                this.addBooster(mode[1],positionBooster[i]);
            }
      
        }
    }
     
}

function buildSpaceship(x,y,z,radius,name) {
    var spaceship;
    spaceship = new Spaceship(x,y,z,radius,name);
    spaceEntities.push(spaceship);

}
