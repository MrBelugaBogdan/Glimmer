import * as THREE from 'three';

export function createPlayer() {
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: 0x444444 });

    const parts = [
        [1, 1.2, 0.5, 0, 1.2, 0], // Торс
        [0.6, 0.6, 0.6, 0, 2.1, 0], // Голова
        [0.35, 1.1, 0.35, -0.7, 1.2, 0], // Л. Рука
        [0.35, 1.1, 0.35, 0.7, 1.2, 0], // П. Рука
        [0.4, 1.1, 0.4, -0.25, 0.5, 0], // Л. Нога
        [0.4, 1.1, 0.4, 0.25, 0.5, 0]   // П. Нога
    ];

    parts.forEach(p => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(p[0], p[1], p[2]), mat);
        m.position.set(p[3], p[4], p[5]);
        group.add(m);
    });

    return group;
}
