import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement );

let scaleMouseY = 500
let mausY = 0
window.addEventListener('mousemove', (event)=>{
    mausY = event.clientY
    // console.log(mausY/scaleMouseY)
})
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

const objLoader = new OBJLoader();
const textureLoader = new THREE.TextureLoader()

objLoader.load('models/model001/1.obj', (objeto) => {
   textureLoader.load('models/model001/1.png',(texture)=>{
        const material = new THREE.MeshBasicMaterial( { map:texture } );
        objeto.material = material
        objeto.position.x = 0;
        objeto.position.y = 0;
        objeto.position.z = -10;
        scene.add(objeto);
    });     
})

let cubes = []
let num = 100
for(let i = 0; i<= num;i++){
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material )
    cube.position.x = 2*i - cubes.length -num/2
    cubes.push(cube)
    scene.add( cube );
}

camera.position.z = 5;

const loader = new GLTFLoader();
// loader.load( "https://ipfs.io/ipfs/QmYqwNYxqmu4z39emTo7h9D62rbwm1esAmbAf2PctAyUvu?filename=Flamingo.glb", function ( gltf ) {
// 		let flamingoMesh = gltf.scene.children[ 0 ];
// 		/* flamingoMesh.scale.set( 0.30, 0.30, 0.30 ); */
//     flamingoMesh.rotation.y = -15;
    
//     scene.add(flamingoMesh);
// 	} );
loader.load( 'models/coche/coche2.glb', function ( gltf ) {
    console.log(gltf)
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

function animate() {
	
    cubes.forEach(cube=>{
        cube.rotation.x += 0.01;
        cube.rotation.y += mausY/scaleMouseY;

        cube.position.y = Math.sin(cube.rotation.y + cube.position.x)
    })
    
    requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();