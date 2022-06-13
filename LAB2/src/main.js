/*global THREE, requestAnimationFrame, console*/
var scene, render;
var camera = [] , indexCamera = 0;
var spaceEntities = [];
var scene, renderer;
var aspectRatio = 1.6;
var viewSize = 150;

var clock, deltaScale;
var deltaTime;
var topAng = false;
var lateralAng = false;
var defaultAng = false;
var planetRotation = true;

var forwardMove = false;
var backwardMove = false;
var leftMove = false;
var rightMove = false;

const NUM = 2.1;
const NEAR = 50;
const FAR = 1000;
const PLANET_RADIUS = 50;
const ORBIT_LENGTH = 1.20 * PLANET_RADIUS;
const SPACESHIP_SPEED = Math.PI / 180 * 90 ;

function createScene() {

    'use strict';
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));
    const axesHelper = new THREE.AxesHelper(1000);   
    scene.add(axesHelper);


    buildSpaceship(PLANET_RADIUS);
    createPlanet(0,0,0,PLANET_RADIUS);    
    createRandomDebris();
    
}

function createCameraO(x,y,z) {
    'use strict';

    aspectRatio = window.innerWidth / window.innerHeight;
    
    var camera = new THREE.OrthographicCamera( 
        viewSize * aspectRatio/- 2, 
        viewSize * aspectRatio / 2, 
        viewSize / 2, 
        viewSize / -2, 
        NEAR, 
        FAR
        );

    camera.position.set(x,y,z);
    camera.lookAt(scene.position);
    return camera;

}

function createCameraP(x,y,z) {
    'use strict';
    var camera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera.position.set(x,y,z);
    camera.lookAt(scene.position);
    return camera;

}



function createRandomDebris() {
    'use strict';
    for (let i = 0; i < 22; i++) {
        CreateDebris();
    }

}

function onResize(){
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (indexCamera == 0) {  
        resizeOrthographic();

    }
    else {
      resizePerspective();

    }

}

function resizeOrthographic(){
    aspectRatio = window.innerWidth / window.innerHeight;
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        
        camera[indexCamera].right = viewSize * aspectRatio / 2;
        camera[indexCamera].left = -camera.right;
        camera[indexCamera].top = viewSize / 2;
        camera[indexCamera].bottom = -camera.top;
        camera[indexCamera].updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

}
  
function resizePerspective() {

    if((window.innerWidth / window.innerHeight) < aspectRatio) {
        camera[indexCamera].aspect = window.innerWidth / window.innerHeight;
        camera[indexCamera].updateProjectionMatrix();
        camera[indexCamera].lookAt(scene.position);

    }

}

function rotatePlanet() {
    'use strict'
    spaceEntities[1].rotateItself(deltaTime/2);

}

function getSphericalCoords(pos) {
    'use strict';
    var x = pos.x;
    var y = pos.y;
    var z = pos.z;

    var r = Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) );
    var phi = Math.atan2( y , x );
    var theta = Math.acos(z / r);

    var spherical = new THREE.Vector3(r, phi, theta);
    
    return spherical;

}

function getCartesianCoords(pos) {
    'use strict';
    var r = pos.x;
    var phi = pos.y;
    var theta = pos.z;

    var x = r * Math.sin(theta) * Math.cos(phi);
    var y = r * Math.sin(theta) * Math.sin(phi);
    var z = r * Math.cos(theta);
    var cartesian = new THREE.Vector3(x, y, z);

    return cartesian;

}

// since our spaceship travels with a constant angular speed 
// follows that:
// the speed units are: radians / second 
// currentAngle  = radians / second  * second
function moveForward() {
    'use strict';

    spaceEntities[0].setOldPosition();
    var oldP = spaceEntities[0].getOldPosition();
    var currentPosition = getSphericalCoords(spaceEntities[0].position);
    
    var currrentAngle = SPACESHIP_SPEED * deltaTime;
    currentPosition.y += currrentAngle;

    var newPosition = getCartesianCoords(currentPosition);
    spaceEntities[0].position.set(newPosition.x, newPosition.y, newPosition.z);
    spaceEntities[0].lookAt(oldP.add(spaceEntities[0].getShipDirection()));
   
}

function moveBackwards() {
    'use strict';

    spaceEntities[0].setOldPosition();
    var oldP = spaceEntities[0].getOldPosition();
    var currentPosition = getSphericalCoords(spaceEntities[0].position);


    var currrentAngle = SPACESHIP_SPEED * deltaTime;
    currentPosition.y += -currrentAngle;
    
    var newPosition = getCartesianCoords(currentPosition);
    spaceEntities[0].position.set(newPosition.x, newPosition.y, newPosition.z);
    spaceEntities[0].lookAt(oldP.add(spaceEntities[0].getShipDirection()));
}


function moveLeft() {
    'use strict';
    spaceEntities[0].setOldPosition();
    var oldP = spaceEntities[0].getOldPosition();

    var currentPosition = getSphericalCoords(spaceEntities[0].position);


    var currrentAngle = SPACESHIP_SPEED * deltaTime;
    if(currentPosition.y >= 0) { //northern hemisphere
        currentPosition.z -= currrentAngle;

    }
    else {
        currentPosition.z += currrentAngle;   
    }

    var newPosition = getCartesianCoords(currentPosition);
    spaceEntities[0].position.set(newPosition.x, newPosition.y, newPosition.z);
    spaceEntities[0].lookAt(oldP.add(spaceEntities[0].getShipDirection()));
   
}

function moveRight() {
    'use strict';

    spaceEntities[0].setOldPosition();
    var oldP = spaceEntities[0].getOldPosition();
    var currentPosition = getSphericalCoords(spaceEntities[0].position);


    var currrentAngle = SPACESHIP_SPEED * deltaTime;
    
    if(currentPosition.y >= 0) {
        currentPosition.z += currrentAngle;
    }
    else {
        currentPosition.z -= currrentAngle;
    }

    var newPosition = getCartesianCoords(currentPosition);
    spaceEntities[0].position.set(newPosition.x, newPosition.y, newPosition.z);
    spaceEntities[0].lookAt(oldP.add(spaceEntities[0].getShipDirection()));
    
}

function switchCamera() {
    'use strict'
    camera[indexCamera].lookAt(scene.position);
}

function turnWireframe() {
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        })
}

function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
    
        case 49: // 1
            defaultAng = true;
            indexCamera = 0;
            break;
        case 50: // 2
            topAng = true;
            indexCamera = 1;
            break;
        case 51: // 3
            lateralAng = true;
            indexCamera = 2;
            break;
        case 52: // 4
            turnWireframe();
            break;
        case 119: // w
        case 87:
            planetRotation = !planetRotation;
            break;
        case 38: // UP
            forwardMove = true;
            break;
        case 40: // down
            backwardMove = true;
            break;
        case 37: // left
            leftMove = true;
            break;
        case 39: // right
            rightMove = true;
            break;
    }

}

function onKeyUp(e) {
    'use strict'

    switch (e.keyCode) {

        case 49: // 1
            defaultAng = false;
        break;
            case 50: // 2
            topAng = false;
            break;
        case 51: // 3
            lateralAng = false;
            break;
        case 38: // up
            forwardMove = false;
            break;
        case 40: // down
            backwardMove = false;
            break;
        case 37: // left
            leftMove = false;
            break;
        case 39:  // right
            rightMove = false;
            break;

    }

}

function render() {
    'use strict';
    renderer.render(scene, camera[indexCamera]);
}

function update() {
    var spaceship = spaceEntities[0];
    spaceship.computeQuadrant();
    var currentQuadrant = spaceship.getQuadrant();

    for (let i = 1; i < spaceEntities.length; i++) {
        if (spaceEntities[i].getQuadrant() == currentQuadrant && spaceEntities[i].getCollisionRadius() != 0) {
            var dist = spaceEntities[i].position.distanceTo(spaceship.position);
            var collisionRange = spaceEntities[i].getCollisionRadius() + spaceship.getCollisionRadius();

            if (spaceEntities[i].getRemoved()) {
                // space debris vanishes
                spaceEntities[i].visible = false;
                spaceEntities[i].setCollisionRadius(0);
            }
            if (dist < collisionRange) {
                spaceship.position.subVectors(spaceship.position, spaceship.direction.multiplyScalar(collisionRange-dist));
                var setRad = getSphericalCoords(spaceship.position);
                setRad.x = ORBIT_LENGTH;
                var newPos = getCartesianCoords(setRad);
                spaceship.position.set(newPos.x, newPos.y, newPos.z);
                
                spaceEntities[i].setRemoved(true);
            } 
        }
    }

}

function init() {

    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    clock = new THREE.Clock(true);
    deltaScale = 1;
    
    createScene();
    camera[0] = createCameraO(120,0,0);
    camera[1] = createCameraP(0,120,0);
    camera[2] = new ShipCam();
    camera[2].setShip(spaceEntities[0]);
    
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp)
    window.addEventListener("resize", onResize);
}

function animate() {

    'use strict';

    deltaTime = clock.getDelta() * deltaScale;

    if(topAng) { switchCamera(); };
    if(lateralAng) { switchCamera(); };
    if(defaultAng) { switchCamera(); };
    if(planetRotation) { rotatePlanet(); };
    if(forwardMove) { moveForward(); };
    if(backwardMove) { moveBackwards(); };
    if(leftMove) { moveLeft(); };
    if(rightMove) { moveRight(); };
    
    camera[2].update();

    update();
    render();
    requestAnimationFrame(animate);
}