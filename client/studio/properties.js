export function initProperties(obj) {
    const panel = document.getElementById('properties-panel');
    if (!obj) {
        panel.innerHTML = "<p>Нічого не вибрано</p>";
        return;
    }

    panel.innerHTML = `
        <div class="prop-group">
            <b>Appearance</b><br>
            Color: <input type="color" id="prop-color" value="#${obj.material.color.getHexString()}">
        </div>
        <div class="prop-group">
            <b>Transform</b><br>
            PosX: <input type="number" id="prop-px" value="${obj.position.x}" step="0.5">
            SizeX: <input type="number" id="prop-sx" value="${obj.geometry.parameters.width}" step="0.1">
        </div>
        <button class="btn" id="save-props">Зберегти на залізо</button>
    `;

    // Логіка оновлення
    document.getElementById('prop-color').oninput = (e) => {
        obj.material.color.set(e.target.value);
    };
}
