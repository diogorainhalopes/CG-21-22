/*global THREE, requestAnimationFrame, console*/
var scenes = [], currentScene = 0, renderer;
var camera = [] , indexCamera = 0;
var aspectRatio;
var viewSize = 60;

var clock, deltaScale;
var deltaTime;
var topAng = false;
var lateralAng = false;
var defaultAng = false;

var phase1Rot = false;
var phase2Rot = false;
var phase3Rot = false;

var phase1Dir = false;
var phase2Dir = false;
var phase3Dir = false;


var directLight, dlHelper, dlHelper2;

var globalLighting = false;
var shading = false;
var lightingCalculation = false;

var spotlight1 = false;
var spotlight2 = false;
var spotlight3 = false;

var group;
var vrgroup;

var palanque;
var floor;
var phase1, phase2, phase3;
var spot1, spot2, spot3;

var pause = false;

function createScene() {

    'use strict';
    scenes.push(new THREE.Scene);
    const axesHelper = new THREE.AxesHelper(1000);   
    scenes[currentScene].add(axesHelper);
    scenes[currentScene].add(new THREE.AmbientLight(0xffffff, 0.3));

    directLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    directLight.position.set(50, 50, -50);
    dlHelper = new THREE.DirectionalLightHelper(directLight, 3)
    
    directLight.visible = true;
    directLight.castShadow = true;
    
    palanque = new Palanque();
    floor = new Floor();
    phase1 = new Phase1();
    phase2 = new Phase2();
    phase3 = new Phase3();
    spot1 = new SpotLight(10, 12, 6, phase1, 0.5, 150);
    spot2 = new SpotLight(10, 12, 0, phase2, 0.5, 150);
    spot3 = new SpotLight(10, 12, -6, phase3, 0.5, 150);
    
    
    group = new THREE.Object3D();
    group.add(palanque); 
    group.add(floor); 
    group.add(phase1);
    group.add(phase2);
    group.add(phase3);
    group.add(spot1, spot2, spot3);
    //group.scale.set(0.18, 0.18, 0.18);
    scenes[currentScene].add(group);
    
    directLight.shadow.camera.top += 40;
    directLight.shadow.camera.bottom -= 40;
    directLight.shadow.camera.left -= 40;
    directLight.shadow.camera.right += 40;
    
    directLight.shadow.mapSize.width = 2048;
    directLight.shadow.mapSize.height = 2048;


    dlHelper2 = new THREE.CameraHelper(directLight.shadow.camera);
    
    scenes[currentScene].add(directLight, dlHelper, dlHelper2);


    vrgroup = new THREE.Group();
    vrgroup.position.set(45, 45, 45);  // Set the initial VR Headset Position.
}


function createCameraP(x,y,z) {
    'use strict';
    var camera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera.position.set(x,y,z);
    camera.lookAt(scenes[currentScene].position);
    return camera;

}


function createCameraO(x,y,z) {
    'use strict';

    aspectRatio = window.innerWidth / window.innerHeight;
    
    var camera = new THREE.OrthographicCamera( 
        viewSize * aspectRatio/- 2, 
        viewSize * aspectRatio / 2, 
        viewSize / 2, 
        viewSize / -2, 
        1, 
        1000
        );

    camera.position.set(x,y,z);
    camera.lookAt(0, 555, 0);
    return camera;

}

function createCameraS(x,y,z) {
    'use strict';
}


function onResize(){
    'use strict';

    aspectRatio = window.innerWidth / window.innerHeight;
    
    camera[0].aspect = window.innerWidth / window.innerHeight;
    camera[0].updateProjectionMatrix();
    camera[2].aspect = window.innerWidth / window.innerHeight;
    camera[2].updateProjectionMatrix();
    camera[1].right = viewSize * aspectRatio / 2;
    camera[1].left = -camera[1].right;
    camera[1].top = viewSize / 2;
    camera[1].bottom = -camera[1].top;
    camera[1].updateProjectionMatrix();


    renderer.setSize( window.innerWidth, window.innerHeight );

}

/* function onVRExit() {
    var str = event.display.isPresenting ? 'EXIT VR' : 'ENTER VR';
	_device = event.display;
	if(event.display.isPresenting === false){
		cameOut = true;
		camera.position.z = 0;
		camera.position.y = 0;
		camera.position.x = 0;
		camera.rotation.x = 0;
		camera.rotation.y = 0;
		camera.rotation.z = 0;
		
		camera.lookAt( scene.position );
		renderer.setSize( window.innerWidth, window.innerHeight )

    }
} */

function pauseGame() {

    
}



function resizePerspective() {
    if((window.innerWidth / window.innerHeight) < ratio) {
        camera[indexCamera].aspect = window.innerWidth / window.innerHeight;
        camera[indexCamera].updateProjectionMatrix();
        camera[indexCamera].lookAt(scenes[currentScene].position);
    }
}


function rotatePhase1() {
    'use strict'
    if(phase1Dir) {
        phase1.rotateItself(deltaTime*2);
    }
    else {
        phase1.rotateItself(-deltaTime*2);;
    }
}

function rotatePhase2() {
    'use strict'
    if(phase2Dir) {
        phase2.rotateItself(deltaTime*2);
    }
    else {
        phase2.rotateItself(-deltaTime*2);;
    }
}

function rotatePhase3() {
    'use strict'
    if(phase3Dir) {
        phase3.rotateItself(deltaTime*2);
    }
    else {
        phase3.rotateItself(-deltaTime*2);;
    }
}

function turnGlobalLighting() {
    directLight.visible = !directLight.visible;
}



function switchCamera() {
    'use strict'
    if(indexCamera === 1) {
        camera[indexCamera].lookAt(0, 10, 0);

    }
    else {
        camera[indexCamera].lookAt(scenes[currentScene].position);
    }
}

function turnSpot(spotLight) {
    spotLight.switch();
}

function switchShadows() {

    /* for(i = 0; i < group.children.length-3; i++) {
        for(j = 0; j < group.children[i].children.length; j++) {
            if (group.children[i].currentMat === 0) {
                group.children[i].children[j].material = group.children[i].mats[1];
            }
            if (group.children[i].currentMat === 1) {
                group.children[i].children[j].material = group.children[i].mats[0];
            }
            
        }
        group.children[i].currentMat = Math.abs(group.children[i].currentMat -1);
    } */
    palanque.changeMaterial();
    floor.changeMaterial();
    phase1.changeMaterial();
    phase2.changeMaterial();
    phase3.changeMaterial();
    spot1.lamp.changeMaterial();
    spot2.lamp.changeMaterial();
    spot3.lamp.changeMaterial();

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
        case 113: // q
        case 81:
            phase1Rot = true;
            phase1Dir = true;
            break;
        case 119: // w
        case 87:
            phase1Rot = true;
            phase1Dir = false;
            break;
        case 101: // e
        case 69: 
            phase2Rot = true;
            phase2Dir = true;
            break;
        case 114: // r
        case 82:
            phase2Rot = true;
            phase2Dir = false;
            break;
        case 116: // t
        case 84:
            phase3Rot = true;
            phase3Dir = true;
            break;
        case 121: // y
        case 89:
            phase3Rot = true;
            phase3Dir = false;
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
            spotlight1 = true;
            break;
        case 120: // x
        case 88: 
            spotlight2 = true;
            break;
        case 99: // c
        case 67: 
            spotlight3 = true;
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
        case 113: // q
        case 81:
            phase1Rot = false;
            break;
        case 119: // w
        case 87:
            phase1Rot = false;
            break;
        case 101: // e
        case 69: 
            phase2Rot = false;
            break;
        case 114: // r
        case 82:
            phase2Rot = false;
            break;
        case 116: // t
        case 84:
            phase3Rot = false;
            break;
        case 121: // y
        case 89:
            phase3Rot = false;
            break;
        case 115: // s
        case 83:
            lightingCalculation = false;
            break;    
    }
}

function render() {
    'use strict';
    renderer.render(scenes[currentScene], camera[indexCamera]);
}

function renderVR() {
    'use strict';
    renderer.render(scenes[currentScene], camera[indexCamera]);
    camera[indexCamera].updateWorldMatrix();
    camera[3].update(camera[indexCamera]);
    const size = new THREE.Vector2();
    renderer.getSize(size);

    renderer.setScissorTest(true);

    renderer.setScissor(0, 0, size.width / 2, size.height);
    renderer.setViewport(0, 0, size.width / 2, size.height);
    renderer.render(scenes[currentScene], camera[3].cameraL);

    renderer.setScissor(size.width / 2, 0, size.width / 2, size.height);
    renderer.setViewport(size.width / 2, 0, size.width / 2, size.height);
    renderer.render(scenes[currentScene], camera[3].cameraR);

    renderer.setScissorTest(false);
}

function update() {

}

function init() {

    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    document.body.appendChild(VRButton.createButton(renderer));
    renderer.xr.enabled = true;

    clock = new THREE.Clock(true);
    deltaScale = 1;
    
    createScene();
    camera[0] = createCameraP(45, 45, 45);
    camera[1] = createCameraP(45,15,0);
    camera[2] = createCameraP(0,45,0);
    camera[3] = new THREE.StereoCamera();

/*      ORBIT CONTROLS      */
    const controls = new THREE.OrbitControls(camera[indexCamera], renderer.domElement);
    camera[indexCamera].position.set(30, 30, 30);
    controls.update();
/*      ORBIT CONTROLS      */ 
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp)
    window.addEventListener("resize", onResize);

    renderer.xr.addEventListener('sessionstart', function () {
        scenes[currentScene].add(vrgroup);
        camera[indexCamera].lookAt(scenes[currentScene].position)
        vrgroup.add(camera[indexCamera]);
    });
    renderer.xr.addEventListener('sessionend', function () {
        scenes[currentScene].remove(vrgroup);
        vrgroup.remove(camera[indexCamera]);
    });
}

function animate() {

    'use strict';

    deltaTime = clock.getDelta() * deltaScale;

    if(topAng) { switchCamera(); };
    if(lateralAng) { switchCamera(); };
    if(defaultAng) { switchCamera(); };
    if(phase1Rot) { rotatePhase1(); };
    if(phase2Rot) { rotatePhase2(); };
    if(phase3Rot) { rotatePhase3(); };
    if(globalLighting) {turnGlobalLighting(); globalLighting=false;}
    if(spotlight1) {turnSpot(spot1); spotlight1=false;}
    if(spotlight2) {turnSpot(spot2); spotlight2=false;}
    if(spotlight3) {turnSpot(spot3); spotlight3=false;}
    if(shading) { switchShadows(); shading = false;};

    update();
    if(renderer.xr.getSession()) {
        renderVR();
        renderer.setAnimationLoop( render );
    }
    else{
        render();
        requestAnimationFrame(animate);
    }
    
}

