
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
        this.assembleSpaceShip(x,y,z);

    }


    getTotalHeight() {
        return this.totalHeight;
    }

    setTotalHeight(planetRadius) {
        // for now 
        this.totalHeight = planetRadius/11;
        console.log(this.totalHeight)

    }

    assembleSpaceShip(x,y,z) {


        this.addSpaceShipMainBody(x,y,z);
        this.addSpaceShipNose(x,y,z);
        this.addSpaceShipPropellers();
        scene.add(this);
    }


    addSpaceShipMainBody(x,y,z) {

        // the main cylinder (body) takes up 3/4 of the Spaceship total height
        const mainBodyHeight = 3/4*this.getTotalHeight();
        const geometry = new THREE.CylinderGeometry(10, 10, mainBodyHeight, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0x7a7476} );
        const spaceshipMainBody = new THREE.Mesh( geometry, material);

        //spaceshipMainBody.position.set(x,y,z)
        this.add(spaceshipMainBody)
    }

    addSpaceShipNose(x,y,z) {

        const noseHeight = 1/8*this.getTotalHeight();
        const geometry = new THREE.CylinderGeometry(10, 10, noseHeight, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0xe61e1e} );
        const spaceshipNose = new THREE.Mesh(geometry, material);
        
        //spaceshipNose.position.set(x,y,z-10);
        this.add(spaceshipNose);
       
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

