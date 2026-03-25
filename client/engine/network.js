import { GlimmerConfig } from '../config.js';

export class Network {
    constructor(player) {
        this.player = player;
        this.apiUrl = GlimmerConfig.serverUrl;
    }

    // Функція для отримання речей з магазину на сервері
    async getShopItems() {
        try {
            const response = await fetch(`${this.apiUrl}/get-items`);
            return await response.json();
        } catch (err) {
            console.error("Glimmer Network: Сервер офлайн");
            return [];
        }
    }

    // Тут ми пізніше додамо WebSocket для реального мультиплеєра
    sendPosition() {
        // Код для передачі координат X, Y, Z
    }
}
