import { GlimmerConfig } from '../config.js';

export class AuthSystem {
    constructor() {
        this.user = null;
        this.token = null;
    }

    async login(username) {
        try {
            const response = await fetch(`${GlimmerConfig.serverUrl}/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username })
            });
            const data = await response.json();
            
            if (data.success) {
                this.user = data.user; // Тут прийде id, username, role (player/admin)
                console.log(`Вітаємо, ${this.user.username}! Твоя роль: ${this.user.role}`);
                return data;
            }
        } catch (e) {
            console.error("Auth Error: Сервер не відповідає");
            // Тимчасовий режим офлайн для тестів
            return { success: true, user: { username: username, role: "player" } };
        }
    }
}
