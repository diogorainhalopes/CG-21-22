
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




