import * as THREE from 'three';

export class WorldManager {
    constructor(scene) {
        this.scene = scene;
        this.objects = [];
    }

    build(data) {
        // Очищення сцени перед завантаженням нового плейсу
        this.objects.forEach(obj => this.scene.remove(obj));
        this.objects = [];

        data.parts.forEach(p => {
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(...p.size),
                new THREE.MeshStandardMaterial({ color: p.color })
            );
            mesh.position.set(...p.pos);
            this.scene.add(mesh);
            this.objects.push(mesh);
        });
    }
}
