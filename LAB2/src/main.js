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
const ORBIT_LENGTH = 1.20 * 100;


function createScene() {

    'use strict';
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(100));
    
    
    spaceEntities[0] = buildShip(40,40,40,15);
    spaceEntities[1] = CreatePlanet(0,0,0,50);


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
    }
}

function onKeyUp(e) {
    'use strict'

    switch (e.keyCode) {
    
    
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
    
    createScene();
    camera[0] = createCamera(120,0,0);
    camera[1] = createCamera(0,120,0);
    camera[2] = createCamera(0,0,120);
    
    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp)
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    render();
    
    requestAnimationFrame(animate);
}
