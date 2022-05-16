
var geometry, material, mesh;

var obj3;

function addCube(obj, x, y, z, l1, l2, l3) {
    'use strict';
        
    geometry = new THREE.CubeGeometry(l1, l2, l3);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function addDodecahedron(obj, x, y, z) {
    'use strict';
        
    geometry = new THREE.DodecahedronGeometry(9);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    
}

function addSphere(obj, x, y, z, r) {
    'use strict';
        
    geometry = new THREE.SphereGeometry(r);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}


function createObj3(x, y, z) {
    'use strict'

    obj3 = new THREE.Object3D();
    material = new THREE.MeshBasicMaterial({ color: 0x003212, wireframe: true });
    addCube(obj3, 5, 23, -24, 8, 8, 8);
    addCube(obj3, -40, -5, -11, 5, 2, 8);
    addDodecahedron(obj3, -20, 12, 14);
    addSphere(obj3, -25, -21, 14, 3);
    addSphere(obj3, 25, -37, -14, 7);
    
    obj3.rotation.set(x, y, z);
    scene.add(obj3);

}
