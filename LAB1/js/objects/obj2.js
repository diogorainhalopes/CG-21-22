
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
    addTorus(obj2, 5, -32, -24, Math.PI/2, 0, 0, 10, 3, 16, 100);
    addCylinder(obj2, 27, 32, 24, 0, 0, 0, 5, 5, 10, 32);
    
    obj2.rotation.set(x, y, z);
    scene.add(obj2);

}