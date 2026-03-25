export class Controls {
    constructor() {
        this.keys = {};
        window.onkeydown = (e) => this.keys[e.code] = true;
        window.onkeyup = (e) => this.keys[e.code] = false;
    }

    getMovement() {
        const speed = 0.12;
        let x = 0, z = 0;
        if (this.keys['KeyW']) z -= speed;
        if (this.keys['KeyS']) z += speed;
        if (this.keys['KeyA']) x -= speed;
        if (this.keys['KeyD']) x += speed;
        return { x, z };
    }

    isJumpPressed() {
        return this.keys['Space'];
    }
}
