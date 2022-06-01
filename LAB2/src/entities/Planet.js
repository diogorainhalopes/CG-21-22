var cosmicBody;
var clouds;

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
            //map: new THREE.TextureLoader().load("images/earthnight.jpg"),
            color: "blue"
        });
        cosmicBody = new THREE.Mesh(geometry,material);
        
       const geometry2 = new THREE.SphereGeometry(radius+2,50,50);
        const material2 = new THREE.MeshBasicMaterial({ 
            map: new THREE.TextureLoader().load("images/cloud.png"),
            side        : THREE.DoubleSide,
            opacity     : 0.22,
            transparent : true,
            depthWrite  : false,
        });
        clouds = new THREE.Mesh(geometry2,material2);
        cosmicBody.add(clouds);

        cosmicBody.rotation.set(0, 0, - Math.PI * 23 / 180 );
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