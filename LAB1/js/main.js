/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;
var aspectRatio;
var viewSize = 150;
const NUM = 2.1;
const NEAR = 1;
const FAR = 1000;

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

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    
    
    scene.add(new THREE.AxisHelper(10));
    
    // Args define the center of the object (and their rotation)
    createObj1(0, 0, 0);
    createObj2(0, 0, 0);
    createObj3(0, 21, 0);
}

function createCamera(x,y,z) {
    'use strict';

    aspectRatio = window.innerWidth / window.innerHeight;

    
    camera = new THREE.OrthographicCamera( viewSize * aspectRatio/- NUM, 
    viewSize * aspectRatio / NUM, 
    viewSize / NUM, 
    viewSize / -NUM, 
    NEAR, 
    FAR);

    camera.position.set(x,y,z);
    camera.lookAt(scene.position);
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
        obj1.rotateY(0.01);
        obj2.rotateY(0.01);
        obj3.rotateY(0.01);
    }
    else {
        obj1.rotateY(-0.01);
        obj2.rotateY(-0.01);
        obj3.rotateY(-0.01);
    }
}

function rotateV2() {
    'use strict'

    if(v2Dir) {
        obj2.rotateX(0.01);
    }
    else {
        obj2.rotateX(-0.01);
    }
}

function rotateV3() {
    'use strict'

    if(v3Dir) {
        obj3.rotateZ(0.01);
    }
    else {
        obj3.rotateZ(-0.01);
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
    obj1.translateZ(-0.4);
    obj2.translateZ(-0.4);
    obj3.translateZ(-0.4);
}

function moveBackwards() {
    obj1.translateZ(0.4);
    obj2.translateZ(0.4);
    obj3.translateZ(0.4);
}

function moveLeft() {
    obj1.translateX(-0.4);
    obj2.translateX(-0.4);
    obj3.translateX(-0.4);
}

function moveRight() {
    obj1.translateX(0.4);
    obj2.translateX(0.4);
    obj3.translateX(0.4);
}


function onResize() {
    'use strict';

    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.left = window.innerWidth / -NUM;
        camera.right = window.innerWidth / NUM;
        camera.top = window.innerHeight / NUM;
        camera.bottom = window.innerHeight / -NUM;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }


}

function onKeyDown(e) {
    'use strict';
    
    switch (e.key) {
    
        case 'E':  //E
        case 'e': //e
            scene.traverse(function (node) {
                if (node instanceof THREE.AxisHelper) {
                    node.visible = !node.visible;
                }
            });
            break;
        case '1': // 1
            defaultAng = true;
            break;
        case '2': // 2
            topAng = true;
            break;
        case '3': // 3
            lateralAng = true;
            break;
        case '4': // 4
            turnWireframe();
            break;
        case 'q' || 'Q':
            v1Rotation = true;
            v1Dir = 0;
            break;
        case 'w' || 'W':
            v1Rotation = true;
            v1Dir = 1;
            break;
        case 'a' || 'A':
            v2Rotation = true;
            v2Dir = 0;
            break;
        case 's' || 'S':
            v2Rotation = true;
            v2Dir = 1;
            break;
        case 'z' || 'Z':
            v3Rotation = true;
            v3Dir = 0;
            break;
        case 'x' || 'X':
            v3Rotation = true;
            v3Dir = 1;
            break;
        case 'ArrowUp':
            forwardMove = true;
            break;
        case 'ArrowDown':
            backwardMove = true;
            break;
        case 'ArrowLeft':
            leftMove = true;
            break;
        case 'ArrowRight':
            rightMove = true;
            break;
    }
}

function onKeyUp(e) {
    'use strict'

    switch (e.key) {
    
        case '1': // 1
            defaultAng = false;
            break;
        case '2': // 2
            topAng = false;
            break;
        case '3': // 3
            lateralAng = false;
            break;
        case 'q' || 'Q':
            v1Rotation = false;
            break;
        case 'w' || 'W':
            v1Rotation = false;
            break;
        case 'a' || 'A':
            v2Rotation = false;
            break;
        case 's' || 'S':
            v2Rotation = false;
            break;
        case 'z' || 'Z':
            v3Rotation = false;
            break;
        case 'x' || 'X':
            v3Rotation = false;
            break;
        case 'ArrowUp':
            forwardMove = false;
            break;
        case 'ArrowDown':
            backwardMove = false;
            break;
        case 'ArrowLeft':
            leftMove = false;
            break;
        case 'ArrowRight':
            rightMove = false;
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
   
    createScene();
    createCamera(50,50,50);
    
    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp)
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

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
    render();
    
    requestAnimationFrame(animate);
}

