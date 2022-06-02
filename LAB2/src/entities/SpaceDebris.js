
var debris, collisionRadius;

class SpaceDebris extends SpaceEntity {

    constructor() {
        super();
        this.createDebris();

        this.setCollisionRadius(collisionRadius);
        scene.add(debris);
        
    }

    createDebris() {
        var max = 4;
        var min = 1;

        var randomColor = '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
        var randomShape = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        var randomWire = Math.random() < 0.5

        if (randomShape == 1) {
            const geometry = new THREE.SphereGeometry(PLANET_RADIUS/20, 8, 8);
            const material = new THREE.MeshBasicMaterial( { color: randomColor, wireframe: randomWire } );
            debris = new THREE.Mesh(geometry,material);
            collisionRadius = PLANET_RADIUS/20;
        }
        if (randomShape == 2) {
            const geometry = new THREE.CylinderGeometry(PLANET_RADIUS/24, PLANET_RADIUS/24, 4, 8);
            const material = new THREE.MeshBasicMaterial( { color: randomColor, wireframe: randomWire } );
            debris = new THREE.Mesh(geometry,material);
            collisionRadius = Math.sqrt(Math.pow(PLANET_RADIUS/24, 2) + 4);
        }
        if (randomShape == 3) {
            const geometry = new THREE.CylinderGeometry(PLANET_RADIUS/24, 0, 4, 8);
            const material = new THREE.MeshBasicMaterial( { color: randomColor, wireframe: randomWire } );
            debris = new THREE.Mesh(geometry,material);
            collisionRadius = Math.sqrt(Math.pow(PLANET_RADIUS/24, 2) + 4);
        }
        if (randomShape == 4) {
            var w = Math.floor(Math.random() * (PLANET_RADIUS/20 - 1 + 1)) + 1;
            var h = Math.floor(Math.random() * (PLANET_RADIUS/20 - 1 + 1)) + 1;
            var d = Math.floor(Math.random() * (PLANET_RADIUS/20 - 1 + 1)) + 1;
            const geometry = new THREE.BoxGeometry(w, h, d);
            const material = new THREE.MeshBasicMaterial( { color: randomColor, wireframe: randomWire } );
            debris = new THREE.Mesh(geometry,material);
            collisionRadius = Math.sqrt(Math.pow(w,2) + Math.pow(h,2) + Math.pow(d,2))/2;
        }
        if (randomShape == 5) {
            const geometry = new THREE.TorusGeometry(PLANET_RADIUS/24, PLANET_RADIUS/24, 4, 8);
            const material = new THREE.MeshBasicMaterial( { color: randomColor, wireframe: randomWire } );
            debris = new THREE.Mesh(geometry,material);
            collisionRadius = PLANET_RADIUS/12;
        }

        randomPosition(debris);

    }

}
    
function CreateDebris() {
    var spacedebris;
    spacedebris = new SpaceDebris();
    spaceEntities.push(spacedebris);

}