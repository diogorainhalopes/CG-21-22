var cosmicBody;

class Planet extends SpaceEntity  {



    constructor(x,y,z,radius,name) {

        super();

        this.createCosmicBody(radius);
        this.setRadius(radius);
        this.setType(name);

    }

    createCosmicBody(radius) {
        
        const geometry = new THREE.SphereGeometry(radius,50,50);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x2596be
        
        });
        cosmicBody = new THREE.Mesh(geometry,material);
        scene.add(cosmicBody);

    }

    getRadius() {
        return this.radius;

    }

    setRadius(radius) {
        this.radius = radius;
    
    }

    getType() {
        return this.name;
    
    }

    setType(name) {
        this.name = name;
    
    }

    rotateItself(angle) {   
        cosmicBody.rotateY(angle);
    
    }




}

function CreatePlanet(x,y,z,radius,name) {
    var planet;
    planet = new Planet(x,y,z,radius,name);
    spaceEntities.push(planet);

}