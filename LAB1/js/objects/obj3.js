
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
    material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    addCube(obj3, 5-x, 23-y, -24-z, 8, 8, 8);
    addCube(obj3, -40-x, -7-y, -11-z, 5, 2, 8);
    addDodecahedron(obj3, -20-x, 12-y, 14-z);
    addSphere(obj3, 0-x, 21-y, 0-z, 3);
    addSphere(obj3, 25-x, -37-y, -14-z, 7);
    
    obj3.position.set(x, y, z);
    scene.add(obj3);

}
