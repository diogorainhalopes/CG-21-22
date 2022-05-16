/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    
    
    scene.add(new THREE.AxisHelper(10));
    
    createObj1(0, 0, 0);
    createObj2(0, 0, 0);
    createObj3(0, 0, 0);
    // createTable(0, 8, 0);
    // createBall(0, 0, 15);
}

function createCamera() {
    'use strict';
    camera = new THREE.OrthographicCamera( -100, 100, 100, -100, -100, 1000 );
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
    camera.position.set(0, 50, 0);
    camera.lookAt(scene.position);
}

function lateralAngle() {
    'use strict'
    camera.position.set(0, 0, 50);
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
    
    switch (e.key) {
    
    // case 'S':  //S
    // case 's': //s
    //     ball.userData.jumping = !ball.userData.jumping;
    //     break;
    case 'E':  //E
    case 'e': //e
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
    case '1': // 1
        defaultAngle();
        break;
    case '2': // 2
        topAngle();
        break;
    case '3': // 3
        lateralAngle();
        break;
    case '4': // 4
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;
    case 'q':
        cone.rotateY(-0.1);
        break;
    case 'Q':
        cone.rotateY(0.1);
        break;
    case 'z':
        cone.rotateZ(0.1);
        break;
    case 'Z':
        cone.rotateZ(0.1);
        break;
    // case 'd':
    //     table.rotateX(0.1);
    //     break;
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
    
    // if (ball.userData.jumping) {
    //     ball.userData.step += 0.04;
    //     ball.position.y = Math.abs(30 * (Math.sin(ball.userData.step)));
    //     ball.position.z = 15 * (Math.cos(ball.userData.step));
    // }
    render();
    
    requestAnimationFrame(animate);
}

