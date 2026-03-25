import * as THREE from 'three';
import { GlimmerConfig } from './config.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Світло
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Підлога
const grid = new THREE.GridHelper(50, 50, 0x444444, 0x222222);
scene.add(grid);

// ПЕРСОНАЖ (ЗБІРНИЙ)
const character = new THREE.Group();

const addPart = (w, h, d, x, y, z, color) => {
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({ color })
    );
    mesh.position.set(x, y, z);
    character.add(mesh);
    return mesh;
};

// Тіло (Торс)
addPart(1, 1.2, 0.5, 0, 1.2, 0, 0x555555);
// Голова
const head = addPart(0.6, 0.6, 0.6, 0, 2.1, 0, 0xffdbac);
// Руки
addPart(0.4, 1.2, 0.4, -0.75, 1.2, 0, 0x555555);
addPart(0.4, 1.2, 0.4, 0.75, 1.2, 0, 0x555555);
// Ноги
addPart(0.4, 1.2, 0.4, -0.25, 0.4, 0, 0x333333);
addPart(0.4, 1.2, 0.4, 0.25, 0.4, 0, 0x333333);

// Точка для аксесуарів (Шляпи)
const accessoryPoint = new THREE.Group();
accessoryPoint.position.y = 0.35;
head.add(accessoryPoint);

scene.add(character);
camera.position.set(0, 3, 5);

// Керування
const input = {};
window.onkeydown = (e) => input[e.code] = true;
window.onkeyup = (e) => input[e.code] = false;

function loop() {
    requestAnimationFrame(loop);
    if(input['KeyW']) character.position.z -= 0.1;
    if(input['KeyS']) character.position.z += 0.1;
    if(input['KeyA']) character.position.x -= 0.1;
    if(input['KeyD']) character.position.x += 0.1;

    camera.lookAt(character.position);
    renderer.render(scene, camera);
}
loop();

// Глобальна функція одягання
window.setHat = (color) => {
    accessoryPoint.clear();
    const hat = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.2, 0.7),
        new THREE.MeshStandardMaterial({ color })
    );
    accessoryPoint.add(hat);
};
