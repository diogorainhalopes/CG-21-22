
class Spaceship extends SpaceEntity {

    
    // CylinderGeometry for main body
    // CylinderGeometry for spaceship nose
    // 4 CapsuleGeometry for auxiliary propellers

    // NOTE THAT:
    
    // the main body base (front face) should be aligned with
    // the nose base ? 

    // does the size has to be the same ?
    // since they say, vertice to vertice

    // the spaceship maintains a constant distance(orbits with) to the center 
    // of the planet. 1,20 * R (planet's radius) 

    // the spaceship height H should be between the following interval
    // R/12 < H < R/10

    constructor(x,y,z,planetRadius) {
        super(x,y,z);
        this.setTotalHeight(planetRadius);
        this.assembleSpaceShip(planetRadius);

    }


    getTotalHeight() {
        return this.totalHeight;
    }

    setTotalHeight(planetRadius) {
        // for now 
        this.totalHeight = planetRadius/11;
        console.log(this.totalHeight)

    }

    assembleSpaceShip(planetRadius) {


        this.addSpaceShipMainBody(planetRadius);
        this.addSpaceShipNose(planetRadius);
        this.addSpaceShipPropellers(planetRadius);
        scene.add(this);
    }


    addSpaceShipMainBody(planetRadius) {


        // the main cylinder (body) takes up 3/4 of the Spaceship total height

      
        const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        const mainBody = new THREE.Mesh( geometry, material);
        this.add(mainBody)
    }

    addSpaceShipNose(planetRadius) {




    }

    addPropellers() {


    }
    addSpaceShipPropellers() {
        this.addPropellers();
    }
    
}

function buildShip(x,y,z,planetRadius) {
    var ship;
    ship = new Spaceship(x,y,z,planetRadius);
    spaceEntities.push(ship);

}

