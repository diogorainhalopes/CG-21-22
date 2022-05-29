
class Planet extends THREE.Object3D {


    constructor(x,y,z,radius) {

        super();
        this.position.set(x,y,z) 
        this.createCosmicBody(radius);
        this.setRadius(radius);

    }

    createCosmicBody(radius) {
        
        const geometry = new THREE.SphereGeometry(radius, 32, 16 );
        const material = new THREE.MeshBasicMaterial( { color: 0x28a3d4 } );
        const cosmicBody = new THREE.Mesh(geometry, material );
        scene.add(cosmicBody);

    }

    getRadius() {
        return this.radius;

    }
    setRadius(radius) {
        this.radius = radius;
    
    }


}

function CreatePlanet(x,y,z,radius) {
    var planet;
    planet = new Planet(x,y,z,radius);
    spaceEntities.push(planet);

}

