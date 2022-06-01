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

function createScene() {

    'use strict';
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));
    const axesHelper = new THREE.AxesHelper(1000);   
    scene.add(axesHelper);


    buildSpaceship(0,ORBIT_LENGTH,0,PLANET_RADIUS,SPACESHIP);

    CreatePlanet(0,0,0,PLANET_RADIUS,PLANET_NAME);    
    CreateRandomDebris()
}

function createCamera(x,y,z) {
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



function CreateRandomDebris() {
    for (let i = 0; i < 22; i++) {
        CreateDebris();
    }
}

function onResize() {
    'use strict';

    aspectRatio = window.innerWidth / window.innerHeight;
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        
        camera[indexCamera].right = viewSize * aspectRatio / 2;
        camera[indexCamera].left = -camera[indexCamera].right;

        camera[indexCamera].top = viewSize / 2;
        camera[indexCamera].bottom = -camera[indexCamera].top;

        camera[indexCamera].updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }
}

function rotatePlanet() {
    'use strict'
    console.log("entrei na rotação");
    spaceEntities[1].rotateItself(deltaTime/2);

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

    }

}


function render() {
    'use strict';
    renderer.render(scene, camera[indexCamera]);
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
    camera[0] = createCamera(120,0,0);
    camera[1] = createCamera(0,120,0);
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
    
    camera[2].update();

    render();
    requestAnimationFrame(animate);
}