/*global THREE, requestAnimationFrame, console*/
var scene, render;
var camera = [] , indexCamera = 0;
var spaceEntities = [];
var scene, renderer;
var aspectRatio;
var viewSize = 150;
const NUM = 2.1;
const NEAR = 50;
const FAR = 1000;
const PLANET_RADIUS = 50;
const ORBIT_LENGTH = 1.20 * PLANET_RADIUS;
const PLANET_NAME = "earth";
const SPACESHIP = "orpheus";

var clock, deltaScale;
var deltaTime;
var topAng = false;
var lateralAng = false;
var defaultAng = false;
var planetRotation = false;

var forwardMove = false;
var backwardMove = false;
var leftMove = false;
var rightMove = false;

var orbit;

function createScene() {

    'use strict';
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));
    const axesHelper = new THREE.AxesHelper(1000);   
    scene.add(axesHelper);


    buildSpaceship(PLANET_RADIUS);

    CreatePlanet(0,0,0,PLANET_RADIUS,PLANET_NAME);    
    CreateRandomDebris();

    orbit = new THREE.Object3D();
    orbit.add(spaceEntities[0]);
    orbit.position.set(0, 0, 0);
    scene.add(orbit);
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



function CreateRandomDebris() {
    for (let i = 0; i < 22; i++) {
        CreateDebris();
    }
}

function onResize() { // FIX ME resize da persp cam mal
    'use strict';

    aspectRatio = window.innerWidth / window.innerHeight;
    if (window.innerHeight > 0 && window.innerWidth > 0) {

        if (window.innerWidth === 0 || window.innerHeight === 0) {
            return;
        }
            
        camera[indexCamera].right = viewSize * aspectRatio / 2;
        camera[indexCamera].left = -camera[indexCamera].right;

        camera[indexCamera].top = viewSize / 2;
        camera[indexCamera].bottom = -camera[indexCamera].top;

        camera[indexCamera].updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.updateProjectionMatrix();
    }
    
}

function rotatePlanet() {
    'use strict'
    console.log("entrei na rotação");
    spaceEntities[1].rotateItself(deltaTime/2);

}

function getSphericalCoords(pos) {
    var x = pos.x;
    var y = pos.y;
    var z = pos.z;

    var r = Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) );
    var theta = Math.atan( y / x );
    var phi = Math.atan(Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2)) / z );

    var s = new THREE.Vector3(r, theta, phi);
    
    return s;
}

function getCartesianCoords(pos) {
    var r = pos.x;
    var theta = pos.y;
    var phi = pos.z;

    var x = r * Math.sin(phi) * Math.cos(theta);
    var y = r * Math.sin(phi) * Math.sin(theta);
    var z = r * Math.cos(phi);
    var newPos = new THREE.Vector3(x, y, z);
    return newPos;
}


function moveForward() {
    var currentPosition = getSphericalCoords(spaceEntities[0].position);
    console.log("inicio move")
    console.log(spaceEntities[0].position);
    console.log(currentPosition);
    
    //currentPosition.z = currentPosition.z + Math.PI/20;
    //console.log(currentPosition);

    var newPosition = getCartesianCoords(currentPosition);
    console.log(newPosition);
    console.log("fim move");
    //spaceEntities[0].position.set(newPosition);
    //orbit.rotateOnAxis(yx, deltaTime*3);
}

function moveBackwards() {
    orbit.rotateY(-deltaTime*3);
}

function moveLeft() {
    orbit.rotateX(deltaTime*3);
}

function moveRight() {
    orbit.rotateX(-deltaTime*3);
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
        if (spaceEntities[i].getQuadrant() == currentQuadrant) {
            var dist = spaceEntities[i].position.distanceTo(spaceship.position);
            var collisionRange = spaceEntities[i].getCollisionRadius() + spaceship.getCollisionRadius();

            if (dist == collisionRange) {
                // Lixo desaparece
                spaceEntities[i].visible = false;
                spaceEntities[i].setCollisionRadius(0);
            }
            if (dist < collisionRange) {
                // TODO: spaceship.position.set()
                // A posição tem de estar na direção do movimento e verificar dist == collisionRange
            }
        }
    }

    render();
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
    requestAnimationFrame(animate);
}
