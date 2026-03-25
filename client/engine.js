import * as THREE from 'three';
import { createPlayer } from './engine/player.js';
import { Physics } from './engine/physics.js';
import { Controls } from './engine/controls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050508);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));
scene.add(new THREE.GridHelper(100, 50, 0x00ffcc, 0x222222));

const player = createPlayer();
scene.add(player);

const physics = new Physics();
const controls = new Controls();
const playerState = { vY: 0, isJumping: false };

camera.position.set(0, 5, 10);

function animate() {
    requestAnimationFrame(animate);
    
    const move = controls.getMovement();
    player.position.x += move.x;
    player.position.z += move.z;

    physics.apply(player, playerState, controls.isJumpPressed());

    camera.position.lerp(new THREE.Vector3(player.position.x, 5, player.position.z + 8), 0.1);
    camera.lookAt(player.position);
    renderer.render(scene, camera);
}
animate();
