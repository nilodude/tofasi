import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
// const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

let mausY = 0
window.addEventListener('mousedown', (event)=>{
    mausY = event.clientY
    console.log(mausY)
})

let cubes = []
let num = 10
for(let i = 0; i<= num;i++){
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material )
    cube.position.x = 2*i - cubes.length -5
    cubes.push(cube)
    scene.add( cube );
}

camera.position.z = 5;


function animate() {
	
    cubes.forEach(cube=>{
        cube.rotation.x += 0.01;
        cube.rotation.y += mausY/500;

        cube.position.y = Math.sin(cube.rotation.y + cube.position.x)
    })
    
    requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();