// Función para generar la lista de forma dinámica
function generateMenu(items) {
    const menu = document.getElementById('menu');

    // Añadir manualmente el primer elemento "Welcome"
    const welcomeLi = document.createElement('li');
    const welcomeA = document.createElement('a');
    welcomeA.href = "#intro";
    welcomeA.textContent = "Welcome";
    welcomeLi.appendChild(welcomeA);
    menu.appendChild(welcomeLi);

    // Generar el resto de elementos desde el array
    items.forEach((item, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const ref = `ref${index + 1}`;
        a.href = `#${ref}`;
        a.textContent = item;

        li.appendChild(a);
        menu.appendChild(li);
    });
}

function assignUniqueIds() {
    const sections = document.querySelectorAll('section[id="refStandar"]');
    
    sections.forEach((section, index) => {
        const uniqueId = `ref${index + 1}`;
        section.id = uniqueId;
    });
}

// Función principal para inicializar el script
function initializePage(data) {
    // Asignar IDs únicos a las secciones
    assignUniqueIds();

    // Generar el menú
    generateMenu(data);
}

// Exportar la función para ser llamada desde el HTML
window.initializePage = initializePage;
