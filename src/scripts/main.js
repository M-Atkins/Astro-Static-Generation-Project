import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

const scene = new THREE.Scene();

// instantiate a loader
const loader = new OBJLoader();

// load a resource
loader.load(
	// resource URL
	'src/media/models/cubeme.obj',
	// called when resource is loaded
	function ( object ) {

		scene.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// let mixer;
//
// const loader = new GLTFLoader();
// loader.load( 'src/media/models/wizard_cat.glb', function ( gltf ) {
//
// 	let mesh = gltf
//
// // Create an AnimationMixer, and get the list of AnimationClip instances
// const model = gltf.scene
// mixer = new THREE.AnimationMixer( model );
// const clips = mesh.animations;
//
// // function update () {
// // 	mixer.update( deltaSeconds );
// // }
//
// console.log(clips)
//
// const clip = THREE.AnimationClip.findByName( clips, 'Animation' );
// const action = mixer.clipAction( clip );
// action.play();
//
// scene.add( gltf.scene );
// console.log("potato!")
//
// }, undefined, function ( error ) {
//
// 	console.error( error );
//
// } );


// const renderer = new THREE.WebGLRenderer();
var renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( 320, 400 );
// document.body.appendChild( renderer.domElement );
const div = document.getElementById('threediv');
div.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

camera.position.z = 5;
const orbit = new OrbitControls( camera, renderer.domElement );

// orbit.autoRotate = true;
// orbit.enablePan = false;
// orbit.enableZoom = false;
// orbit.enabled = false;

const clock = new THREE.Clock();
function animate() {
	requestAnimationFrame( animate );
	mixer.update(clock.getDelta());
	orbit.update();
	
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}

animate();

// renderer.setAnimationLoop(animate);
