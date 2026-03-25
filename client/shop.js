import { GlimmerConfig } from './config.js';

async function fetchStore() {
    const list = document.getElementById('shop-list');
    
    try {
        // Запит до твого майбутнього сервера
        const response = await fetch(`${GlimmerConfig.api_url}/get-items`);
        const items = await response.json();

        list.innerHTML = ''; // Очищуємо "Завантаження"
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <span>${item.name} - ${item.price} G</span>
                <button onclick="apply('${item.color}')">Одягнути</button>
            `;
            list.appendChild(div);
        });
    } catch (err) {
        list.innerHTML = '<p style="color:red">Сервер Glimmer офлайн. Одяг недоступний.</p>';
    }
}

window.apply = (color) => {
    if(window.updateClothes) window.updateClothes(parseInt(color));
};

fetchStore();
