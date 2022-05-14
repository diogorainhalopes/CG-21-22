/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    
    
    scene.add(new THREE.AxisHelper(10));
    
    createTable(0, 8, 0);
    createBall(0, 0, 15);
}

function createCamera() {
    'use strict';
    camera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera.position.set(50, 50, 50);
    camera.lookAt(scene.position);
}

function defaultAngle() {
    'use strict'
    camera.position.set(50, 50, 50);
    camera.lookAt(scene.position);
}

function topAngle() {
    'use strict'
    camera.position.set(50, 120, 0);
    camera.lookAt(scene.position);
}

function lateralAngle() {
    'use strict'
    camera.position.set(0, 25, 50);
    camera.lookAt(scene.position);
    
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;
    case 83:  //S
    case 115: //s
        ball.userData.jumping = !ball.userData.jumping;
        break;
    case 69:  //E
    case 101: //e
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
    case 49: //right arrow
        defaultAngle();
        break;
    case 50: //up arrow
        topAngle();
        break;
    case 51: //down arrow
        lateralAngle();
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
    createCamera();
    
    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';
    
    if (ball.userData.jumping) {
        ball.userData.step += 0.04;
        ball.position.y = Math.abs(30 * (Math.sin(ball.userData.step)));
        ball.position.z = 15 * (Math.cos(ball.userData.step));
    }
    render();
    
    requestAnimationFrame(animate);
}

