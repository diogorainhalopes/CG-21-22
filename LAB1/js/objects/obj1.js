
var geometry, material, mesh;
var pi = Math.PI;

var cone;

function addCone(obj, x, y, z, a, b, c) {
    'use strict';
        
    geometry = new THREE.ConeGeometry(4, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.set(a, b, c);
    obj.add(mesh);

}

function addConection(obj, s, x, y, z, a, b, c) {
    geometry = new THREE.CylinderGeometry(.1, .1, s, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.set(a, b, c);
    obj.add(mesh);
}

function createObj1(x, y, z) {
    'use strict'

    cone = new THREE.Object3D();
    material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
    addCone(cone, 50*Math.cos(pi/10), 40, -50*Math.sin(pi/10), -pi/2, 0, -pi/3); // top dir

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    addCone(cone, 0, 20, -50*Math.sin(pi/2), -pi/2, -pi/2, 0, 0); // top 

    material = new THREE.MeshBasicMaterial({ color: 0xff6600, wireframe: true });
    addCone(cone, -50*Math.cos(-pi/10), 0, -50*Math.sin(pi/10), -pi/2, 0, pi/3); // top esq

    material = new THREE.MeshBasicMaterial({ color: 0x9933ff, wireframe: true });
    addCone(cone, 50*Math.cos(1.3*pi), -20, -50*Math.sin(1.3*pi), -pi/2, 0, 0.9*pi); // bot esq

    material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
    addCone(cone, 50*Math.cos(1.7*pi), -40, -50*Math.sin(1.7*pi), -pi/2, 0, 1.2*pi); // bot dir

    material = new THREE.MeshBasicMaterial({ color: 0xff3399, wireframe: true });
    addConection(cone, 62, 50*Math.cos(pi/10)-24, 30, -50*Math.sin(pi/10)-17, -pi/2, -pi/8, pi/3.2); // top top dir
    addConection(cone, 62, -50*Math.cos(-pi/10)+25, 10, -50*Math.sin(pi/10)-15, pi/6.8, pi/4.5, pi/2); // top dir top esq
    addConection(cone, 62, -50*Math.cos(-pi/10)+11, -10, -50*Math.sin(pi/10)+28, pi/7.8, -pi/2.5, pi/2); // top esq bot esq
    addConection(cone, 62, 50*Math.cos(1.7*pi)-30, -29, -50*Math.sin(1.7*pi), pi/2, -pi/9.5, pi/2); // bot esq bot dir esq
    cone.rotation.set(x, y, z);
    scene.add(cone);


}

