import * as THREE from 'three';
import { createPlayer } from './engine/player.js';
import { Physics } from './engine/physics.js';
import { Network } from './engine/network.js';
import { WorldManager } from './engine/world.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050508);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.6));

// Ініціалізація систем
const net = new Network();
const world = new WorldManager(scene);
const player = createPlayer();
const physics = new Physics();
const playerState = { vY: 0, isJumping: false };

scene.add(player);
camera.position.set(0, 10, 15);

// ЗАВАНТАЖЕННЯ ПЛЕЙСУ
async function start() {
    const mapData = await net.fetchPlace("lobby");
    world.build(mapData);
}
start();

// ФУНКЦІЯ ДЛЯ СПАВНУ БЛОКІВ (Для адмінів/білдерів)
window.addPart = () => {
    const newPart = {
        pos: [player.position.x, player.position.y - 1, player.position.z],
        size: [2, 0.5, 2],
        color: 0x00ffcc
    };
    // Відправляємо на сервер (навіть якщо він офлайн)
    net.savePart("lobby", newPart);
    // Оновлюємо візуально у себе
    const m = new THREE.Mesh(new THREE.BoxGeometry(2,0.5,2), new THREE.MeshStandardMaterial({color:0x00ffcc}));
    m.position.set(...newPart.pos);
    scene.add(m);
};

function animate() {
    requestAnimationFrame(animate);
    physics.apply(player, playerState); // Додай керування WASD сюди
    camera.position.lerp(new THREE.Vector3(player.position.x, 7, player.position.z + 12), 0.05);
    camera.lookAt(player.position);
    renderer.render(scene, camera);
}
animate();
