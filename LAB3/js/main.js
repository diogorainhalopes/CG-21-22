
/*global THREE, requestAnimationFrame, console*/
var scene, render;
var camera = [] , indexCamera = 0;
var scene, renderer;
var aspectRatio;
var viewSize = 150;

var clock, deltaScale;
var deltaTime;
var topAng = false;
var lateralAng = false;
var defaultAng = false;

var origamiFirstClockwise = false;
var origamiFirstCounterclockwise = false
var origamiSecondClockwise = false;
var origamiSecondCounterclockwise = false
var origamiThirdClockwise = false;
var origamiThirdCounterclockwise = false

var globalLighting = false;
var shading = false;
var lightingCalculation = false;

var spotlightFirst = false;
var spotlightSecond = false;
var spotlightThird = false;


const FLOOR_HEIGHT = 0.5;

var palanque;
var floor;

function createScene() {

    'use strict';
    scene = new THREE.Scene();
    const axesHelper = new THREE.AxesHelper(1000);   
    scene.add(axesHelper);

    palanque = new Palanque();
    floor = new Floor();
    scene.add(palanque);
    scene.add(floor);
    
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


function onResize(){
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);
    resizePerspective();

}

function resizePerspective() {
    if((window.innerWidth / window.innerHeight) < ratio) {
        camera[indexCamera].aspect = window.innerWidth / window.innerHeight;
        camera[indexCamera].updateProjectionMatrix();
        camera[indexCamera].lookAt(scene.position);
    }
}




function switchCamera() {
    'use strict'
    camera[indexCamera].lookAt(scene.position);
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
        case 119: // w
        case 87:
            origamiFirstClockwise = true;
            break;
        case 113: // q
        case 81:
            origamiFirstCounterclockwise = true;
            break;
        case 101: // e
        case 69: 
            origamiSecondClockwise = true;
            break;
        case 114: // r
        case 82:
            origamiSecondCounterclockwise = true;
            break;
        case 116: // t
        case 84:
            origamiThirdClockwise = true;
            break;
        case 121: // y
        case 89:
            origamiThirdCounterclockwise = true;
            break;
        case 97: // a 
        case 65:
            shading = true;
            break;
        case 115: // s
        case 83:
            lightingCalculation = true;
            break;
        case 100: // d
        case 68:
            globalLighting = true;
            break;
        case 122: // z
        case 90:
            spotlightFirst = true;
            break;
        case 120: // x
        case 88: 
            spotlightSecond = true;
            break;
        case 99: // c
        case 67: 
            spotlightThird = true;
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
            case 119: // w
            case 87:
                origamiFirstClockwise = false;
                break;
            case 113: // q
            case 81:
                origamiFirstCounterclockwise = false;
                break;
            case 101: // e
            case 69: 
                origamiSecondClockwise = false;
                break;
            case 114: // r
            case 82:
                origamiSecondCounterclockwise = false;
                break;
            case 116: // t
            case 84:
                origamiThirdClockwise = false;
                break;
            case 121: // y
            case 89:
                origamiThirdCounterclockwise = false;
                break;
            case 97: // a 
            case 65:
                shading = false;
                break;
            case 115: // s
            case 83:
                lightingCalculation = false;
                break;
            case 100: // d
            case 68:
                globalLighting = false;
                break;
            case 122: // z
            case 90:
                spotlightFirst = false;
                break;
            case 120: // x
            case 88: 
                spotlightSecond = false;
                break;
            case 99: // c
            case 67: 
                spotlightThird = false;
                break;
    

    }
}

function render() {
    'use strict';
    renderer.render(scene, camera[indexCamera]);
}

function update() {

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
    camera[0] = createCameraP(60,60,60);
    camera[1] = createCameraP(60,0,0);
    camera[2] = createCameraP(0,60,0);

/*      ORBIT CONTROLS      */
    const controls = new THREE.OrbitControls(camera[indexCamera], renderer.domElement);
    camera[indexCamera].position.set(0,20,100 );
    controls.update();
/*      ORBIT CONTROLS      */ 
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

    update();
    render();

    requestAnimationFrame(animate);
}




