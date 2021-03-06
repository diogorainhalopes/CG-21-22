
var geometry, material, mesh;

var obj2;

function addTorus(obj, x, y, z, a, b, c, r, t, rs, rt) {
    'use strict';
        
    geometry = new THREE.TorusGeometry(r, t, rs, rt);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.set(a, b, c);
    obj.add(mesh);
    
}

function addCylinder(obj, x, y, z, a, b, c, rt, rb, h, rw) {
    'use strict';
        
    geometry = new THREE.CylinderGeometry(rt, rb, h, rw);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.set(a, b, c);
    obj.add(mesh);
    
}

function createObj2(x, y, z) {
    'use strict'

    obj2 = new THREE.Object3D();
    material = new THREE.MeshBasicMaterial({ color: 0x0001287, wireframe: true });
    addTorus(obj2, 5-x, -32-y, -24-z, Math.PI/2, 0, 0, 10, 3, 16, 100);
    addCylinder(obj2, 27-x, 32-y, 24-z, 0, 0, 0, 5, 5, 10, 32);
    addCylinder(obj2, -15-x, -26-y, 18-z, Math.PI/2, 0, 0, 5, 5, 24, 32);
    addCylinder(obj2, -39-x, 0-y, 0-z, Math.PI/2, 0, Math.PI/2, 5, 5, 10, 32);
    addCylinder(obj2, -29-x, 7.5-y, 0-z, 0, 0, 0, 5, 5, 15, 32);
    
    obj2.position.set(x, y, z);
    scene.add(obj2);

}