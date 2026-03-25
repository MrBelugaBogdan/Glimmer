import { GlimmerConfig } from '../config.js';

export class Network {
    constructor() {
        this.baseUrl = GlimmerConfig.serverUrl;
    }

    // Запит на отримання списку блоків плейсу
    async fetchPlace(placeId) {
        try {
            const response = await fetch(`${this.baseUrl}/get-place?id=${placeId}`);
            if (!response.ok) throw new Error();
            return await response.json();
        } catch (e) {
            console.warn("Glimmer Network: Сервер не знайдено. Працюємо локально.");
            return this.getLocalBackup(placeId);
        }
    }

    // Резервні копії світів (поки залізо не ввімкнене)
    getLocalBackup(id) {
        const maps = {
            "lobby": { name: "Lobby", parts: [{pos:[0,-0.5,0], size:[50,1,50], color:0x222222}] },
            "obby": { name: "Parkour", parts: [
                {pos:[0,0,0], size:[5,1,5], color:0x00ffcc},
                {pos:[0,2,-8], size:[3,0.5,3], color:0xff0055}
            ]}
        };
        return maps[id] || maps["lobby"];
    }

    // Відправка нового блоку на сервер (Building)
    async savePart(placeId, partData) {
        console.log("Network: Спроба зберегти блок на залізо...", partData);
        try {
            await fetch(`${this.baseUrl}/save-part`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ placeId, part: partData })
            });
        } catch (e) {
            console.error("Помилка: Не вдалося відправити дані на сервер.");
        }
    }
}
