/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;
var aspectRatio;
var viewSize = 150;
const NUM = 2.1;
const NEAR = -100;
const FAR = 1000;

var clock;
var deltaT;

var g0, g1;

var topAng = false;
var lateralAng = false;
var defaultAng = false;

var v1Rotation = false;
var v1Dir = 0;

var v2Rotation = false;
var v2Dir = 0;

var v3Rotation = false;
var v3Dir = 0;

var forwardMove = false;
var backwardMove = false;
var leftMove = false;
var rightMove = false;
var upMove = false;
var downMove = false;

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    
    
    scene.add(new THREE.AxisHelper(10));
    
    // Args define the center of the object (and their rotation)
    createObj1(0, 0, 0);
    createObj2(0, 0, 0);
    createObj3(0, 0, 0);

    g1 = new THREE.Object3D();
    g1.add(obj2);
    g1.add(obj3);
    g1.position.set(0, 0, 0);

    g0 = new THREE.Object3D();
    g0.add(obj1);
    g0.add(g1);
    g0.position.set(0, 0, 0);
    scene.add(g0);
}

function createCamera(x,y,z) {
    'use strict';

    aspectRatio = window.innerWidth / window.innerHeight;
    
    camera = new THREE.OrthographicCamera( 
        viewSize * aspectRatio/- 2, 
        viewSize * aspectRatio / 2, 
        viewSize / 2, 
        viewSize / -2, 
        NEAR, 
        FAR
        );

    camera.position.set(x,y,z);
    camera.lookAt(scene.position);
}

function onResize() {
    'use strict';

    aspectRatio = window.innerWidth / window.innerHeight;
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        
        camera.right = viewSize * aspectRatio / 2;
        camera.left = -camera.right;

        camera.top = viewSize / 2;
        camera.bottom = -camera.top;

        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }
}

function defaultAngle() {
    'use strict'
    camera.position.set(50, 50, 50);
    camera.lookAt(scene.position);
}

function topAngle() {
    'use strict'
    camera.position.set(0, 50, 0);
    camera.lookAt(scene.position);
}

function lateralAngle() {
    'use strict'
    camera.position.set(0, 0, 50);
    camera.lookAt(scene.position);
    
}

function rotateV1() {
    'use strict'
    if(v1Dir) {
        g0.rotateY(deltaT*2);
    }
    else {
        g0.rotateY(-deltaT*2);
    }
}

function rotateV2() {
    'use strict'

    if(v2Dir) {
        g1.rotateX(deltaT*2);
    }
    else {
        g1.rotateX(-deltaT*2);
    }
}

function rotateV3() {
    'use strict'

    if(v3Dir) {
        obj3.rotateZ(deltaT*2);
    }
    else {
        obj3.rotateZ(-deltaT*2);
    }
}

function turnWireframe() {
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        })
}

function moveForward() {
    g0.translateX(-deltaT*50);
}

function moveBackwards() {
    g0.translateX(deltaT*50);
}

function moveLeft() {
    g0.translateY(-deltaT*50);
}

function moveRight() {
    g0.translateY(deltaT*50);
}

function moveUp() {
    g0.translateZ(-deltaT*50);
}

function moveDown() {
    g0.translateZ(deltaT*50);
}




function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
    
        case 49: // 1
            defaultAng = true;
            break;
        case 50: // 2
            topAng = true;
            break;
        case 51: // 3
            lateralAng = true;
            break;
        case 52: // 4
            turnWireframe();
            break;
        case 113: //q
        case 81:
            v1Rotation = true;
            v1Dir = 0;
            break;
        case 119: // w
        case 87:
            v1Rotation = true;
            v1Dir = 1;
            break;
        case 97: // a
        case 65:
            v2Rotation = true;
            v2Dir = 0;
            break;
        case 115: // s
        case 83:
            v2Rotation = true;
            v2Dir = 1;
            break;
        case 122: // z
        case 90:
            v3Rotation = true;
            v3Dir = 0;
            break;
        case 120: // x
        case 88:
            v3Rotation = true;
            v3Dir = 1;
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
        case 100: // d
        case 68:
            upMove = true;
            break;
        case 99: // c
        case 67:
            downMove = true;
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
        case 113: //q
        case 81:
            v1Rotation = false;
            break;
        case 119: // w
        case 87:
            v1Rotation = false;
            break;
        case 97: // a
        case 65:
            v2Rotation = false;
            break;
        case 115: // s
        case 83:
            v2Rotation = false;
            break;
        case 122: // z
        case 90:
            v3Rotation = false;
            break;
        case 120: // x
        case 88:
            v3Rotation = false;
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
        case 100: // d
        case 68:
            upMove = false;
            break;
        case 99: // c
        case 67:
            downMove = false;
            break;
    }
}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    clock = new THREE.Clock(true);

    createScene();
    createCamera(50,50,50);
    
    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp)
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';
    deltaT = clock.getDelta();

    if(topAng) { topAngle(); };
    if(lateralAng) { lateralAngle(); };
    if(defaultAng) { defaultAngle(); };
    if(v1Rotation) { rotateV1(); };
    if(v2Rotation) { rotateV2(); };
    if(v3Rotation) { rotateV3(); };
    if(forwardMove) { moveForward(); };
    if(backwardMove) { moveBackwards(); };
    if(leftMove) { moveLeft(); };
    if(rightMove) { moveRight(); };
    if(upMove) { moveUp(); };
    if(downMove) { moveDown(); };
    render();
    
    requestAnimationFrame(animate);
}

