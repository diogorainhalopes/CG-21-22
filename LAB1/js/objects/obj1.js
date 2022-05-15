
var geometry, material, mesh;

var cone;

function addCone(obj, x, y, z, a, b, c) {
    'use strict';
        
    geometry = new THREE.ConeGeometry(4, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.rotation.set(a, b, c);
    obj.add(mesh);

}
function createObj1(x, y, z) {
    'use strict'

    cone = new THREE.Object3D();
    material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
    addCone(cone, 50*Math.cos(Math.PI/10), 40, -50*Math.sin(Math.PI/10), -Math.PI/2, 0, -Math.PI/3); // top dir
    addCone(cone, 0, 20, -50*Math.sin(Math.PI/2), -Math.PI/2, -Math.PI/2, 0, 0); // top 
    addCone(cone, -50*Math.cos(-Math.PI/10), 0, -50*Math.sin(Math.PI/10), -Math.PI/2, 0, Math.PI/3); // top esq
    addCone(cone, 50*Math.cos(1.3*Math.PI), -20, -50*Math.sin(1.3*Math.PI), -Math.PI/2, 0, 0.9*Math.PI);
    addCone(cone, 50*Math.cos(1.7*Math.PI), -40, -50*Math.sin(1.7*Math.PI), -Math.PI/2, 0, 1.2*Math.PI);
    
    cone.rotation.set(x, y, z);
    scene.add(cone);


}

