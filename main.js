// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Set up the scene
const scene = new THREE.Scene();

// Optional: Set a background color so we know rendering is working
scene.background = new THREE.Color(0x222222);

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Set up orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// Load the model
const loader = new GLTFLoader();

loader.load(
  'token.glb',
  function (gltf) {
    const object = gltf.scene;

    // Reset transforms
    object.position.set(0, 0, 0);
    object.rotation.set(0, 0, 0);

    // Try scaling to make it visible
    object.scale.set(2, 2, 2); // You can adjust this if the model is too big/small

    scene.add(object);
    console.log('Model loaded:', object);
  },
  function (xhr) {
    if (xhr.lengthComputable) {
      console.log((xhr.loaded / xhr.total * 100).toFixed(2) + '% loaded');
    } else {
      console.log('Loading...');
    }
  },
  function (error) {
    console.error('An error happened while loading the model:', error);
  }
);

// Handle resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Required for OrbitControls damping
  renderer.render(scene, camera);
}
animate();
