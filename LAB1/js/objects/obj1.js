
var geometry, material, mesh;
var pi = Math.PI;

var obj1;

function addCone(obj, x, y, z, a, b, c, rad, h, s) {
    'use strict';
        
    geometry = new THREE.ConeGeometry(rad, h, s);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.set(a, b, c);
    obj.add(mesh);

}

function createObj1(x, y, z) {
    'use strict'

    obj1 = new THREE.Object3D();
    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    addCone(obj1, 50*Math.cos(pi/10)-x, 40-y, -50*Math.sin(pi/10)-z, 
            -pi/2, 0, -pi/3, 
            5, 8, 3); // top dir

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    addCone(obj1, 0-x, 20-y, -50*Math.sin(pi/2)-z, -pi/2, -pi/2, 0, 
            10, 4, 4); // top 

    material = new THREE.MeshBasicMaterial({ color: 0xff6600, wireframe: true });
    addCone(obj1, -50*Math.cos(-pi/10)-x, 0-y, -50*Math.sin(pi/10)-z, -pi/2, 0, pi/3, 
            7, 4, 5); // top esq

    material = new THREE.MeshBasicMaterial({ color: 0x9933ff, wireframe: true });
    addCone(obj1, 50*Math.cos(1.3*pi)-x, -20-y, -50*Math.sin(1.3*pi)-z, -pi/2, 0, 0.9*pi, 
            5, 8, 11); // bot esq

    material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
    addCone(obj1, 50*Math.cos(1.7*pi)-x, -40-y, -50*Math.sin(1.7*pi)-z, -pi/2, 0, 1.2*pi, 
            6, 10, 8); // bot dir

    obj1.position.set(x, y, z);
    scene.add(obj1);


}

