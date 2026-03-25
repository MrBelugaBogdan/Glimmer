import * as THREE from 'three';
import { initExplorer } from './explorer.js';
import { initProperties } from './properties.js';

export class GlimmerStudio {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.active = false;
        this.selectedObject = null;
        
        console.log("Glimmer Studio: Система готова");
    }

    toggle() {
        this.active = !this.active;
        const ui = document.getElementById('studio-ui');
        ui.style.display = this.active ? 'flex' : 'none';
        
        if (this.active) {
            console.log("Режим Студії активовано");
            initExplorer(this.scene);
        }
    }
}
