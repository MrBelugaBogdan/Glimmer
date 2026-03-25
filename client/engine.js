import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020205);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const grid = new THREE.GridHelper(100, 50, 0x00ffcc, 0x111111);
scene.add(grid);

// ПЕРСОНАЖ (ROBLOX-STYLE)
const character = new THREE.Group();
const mat = new THREE.MeshStandardMaterial({ color: 0x444444 });

// Створюємо деталі тіла
const body = new THREE.Mesh(new THREE.BoxGeometry(1, 1.2, 0.5), mat); body.position.y = 1.2;
const head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), mat); head.position.y = 2.1;
const lArm = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.1, 0.35), mat); lArm.position.set(-0.7, 1.2, 0);
const rArm = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.1, 0.35), mat); rArm.position.set(0.7, 1.2, 0);
const lLeg = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.1, 0.4), mat); lLeg.position.set(-0.25, 0.5, 0);
const rLeg = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.1, 0.4), mat); rLeg.position.set(0.25, 0.5, 0);

const accSlot = new THREE.Group(); // Слот для речей із сервера
accSlot.position.y = 0.35;
head.add(accSlot);

character.add(body, head, lArm, rArm, lLeg, rLeg);
scene.add(character);
camera.position.set(0, 5, 8);

// Рух
const keys = {};
window.onkeydown = (e) => keys[e.code] = true;
window.onkeyup = (e) => keys[e.code] = false;

function loop() {
    requestAnimationFrame(loop);
    if(keys['KeyW']) character.position.z -= 0.15;
    if(keys['KeyS']) character.position.z += 0.15;
    if(keys['KeyA']) character.position.x -= 0.15;
    if(keys['KeyD']) character.position.x += 0.15;
    camera.position.lerp(new THREE.Vector3(character.position.x, 5, character.position.z + 8), 0.1);
    camera.lookAt(character.position);
    renderer.render(scene, camera);
}
loop();

// Функція оновлення вигляду (викликається шопом)
window.updateClothes = (color) => {
    accSlot.clear();
    const hat = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.2, 0.7), new THREE.MeshStandardMaterial({ color }));
    accSlot.add(hat);
};
