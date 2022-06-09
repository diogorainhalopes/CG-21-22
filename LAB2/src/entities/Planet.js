var cosmicBody;
var clouds;

class Planet extends SpaceEntity  {

    constructor(x,y,z,radius) {

        super();

        this.createCosmicBody(radius);
        this.setRadius(radius);
    

    }

    createCosmicBody(radius) {
        
        const geometry = new THREE.SphereGeometry(radius-0.7,50,50);
        const material = new THREE.MeshBasicMaterial({ 
            map: new THREE.TextureLoader().load("https://raw.githubusercontent.com/diogorainhalopes/CG-21-22/main/LAB2/images/earth.jpg"),
            //color: "blue"
        });
        cosmicBody = new THREE.Mesh(geometry,material);
        
       const geometry2 = new THREE.SphereGeometry(radius,50,50);
        const material2 = new THREE.MeshBasicMaterial({ 
            map: new THREE.TextureLoader().load("https://raw.githubusercontent.com/diogorainhalopes/CG-21-22/main/LAB2/images/cloud.png"),
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

    rotateItself(angle) {   
        cosmicBody.rotateY(angle);
    
    }

}

function createPlanet(x,y,z,radius) {
    spaceEntities.push(new Planet(x,y,z,radius));

}