
import * as THREE from 'three';

// 1. Налаштування сцени
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Блакитне небо

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Світло (щоб бачити персонажа)
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5).normalize();
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// 3. Підлога (наша карта)
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 }); // Зелена трава
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// 4. ПЕРСОНАЖ (Glimmer-аватар)
// Робимо його капсулою, щоб не було проблем з LEGO/Roblox
const geometry = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
const material = new THREE.MeshStandardMaterial({ color: 0xff4400 }); // Початковий колір
const player = new THREE.Mesh(geometry, material);
player.position.y = 1; // Щоб не провалився крізь підлогу
scene.add(player);

camera.position.z = 5;
camera.position.y = 3;
camera.lookAt(player.position);

// 5. КЕРУВАННЯ (WASD)
const keys = {};
window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

function update() {
    const speed = 0.1;
    if (keys['KeyW']) player.position.z -= speed;
    if (keys['KeyS']) player.position.z += speed;
    if (keys['KeyA']) player.position.x -= speed;
    if (keys['KeyD']) player.position.x += speed;

    // Камера слідує за гравцем
    camera.position.x = player.position.x;
    camera.position.z = player.position.z + 5;
    camera.lookAt(player.position);
}

// 6. Цикл анімації
function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
}

animate();

// Функція для зміни скіна (викликатимемо з магазину)
window.changeSkin = function(newColor) {
    player.material.color.setHex(newColor);
};
