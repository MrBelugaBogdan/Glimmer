import { Network } from './engine/network.js';

export async function initShop(playerModel) {
    const network = new Network(playerModel);
    const items = await network.getShopItems();
    const container = document.getElementById('shop-items');

    if (items.length === 0) {
        container.innerHTML = "<p>Магазин пустий або сервер спить...</p>";
        return;
    }

    items.forEach(item => {
        const btn = document.createElement('button');
        btn.innerText = `${item.name} (${item.price} G)`;
        btn.style.display = "block";
        btn.style.margin = "5px";
        btn.onclick = () => {
            console.log(`Куплено: ${item.name}`);
            // Тут додамо логіку зміни кольору частин тіла
        };
        container.appendChild(btn);
    });
}
