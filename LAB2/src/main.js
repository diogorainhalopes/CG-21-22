/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;
var aspectRatio;
var viewSize = 150;

function createScene() {
    'use strict';

}

function createCamera(x,y,z) {
    'use strict';


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




function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
    
    }
}

function onKeyUp(e) {
    'use strict'

    switch (e.keyCode) {
    
     
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
