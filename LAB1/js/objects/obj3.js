
var geometry, material, mesh;

var obj3;

function addCube(obj, x, y, z) {
    'use strict';
        
    geometry = new THREE.CubeGeometry(8, 8, 8);
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

function addRing(obj, x, y, z, a, b, c) {
    'use strict';
        
    geometry = new THREE.RingGeometry(8, 15, 12, 10, 2, 4);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.set(a, b, c);
    obj.add(mesh);

}

function addLathe(obj, x, y, z, a, b, c) {
    'use strict';

    const points = [];
    for ( let i = 0; i < 10; i ++ ) {
        points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
    }

    geometry = new THREE.LatheGeometry(points, 7, 0, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.set(a, b, c);
    obj.add(mesh);

}

function addSphere(obj, x, y, z) {
    'use strict';
        
    geometry = new THREE.SphereGeometry(3);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function createObj3(x, y, z) {
    'use strict'

    obj3 = new THREE.Object3D();
    material = new THREE.MeshBasicMaterial({ color: 0x003212, wireframe: true });
    addCube(obj3, 5, 23, -24);
    addDodecahedron(obj3, -20, 12, 14);
    addRing(obj3, 12, -36, 14, Math.PI/3, 0, 0);
    addLathe(obj3, 11, 29, 12, Math.PI/3, 0, 0);
    addSphere(obj3, -25, -21, 14);
    
    obj3.rotation.set(x, y, z);
    scene.add(obj3);


}
