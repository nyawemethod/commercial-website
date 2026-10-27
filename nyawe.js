const databaseCatalogPayload = [
    { id: 1, title: "Scalable Python System Paradigms", category: "engineering", instructor: "Dr. Sarah Jenkins", price: "$89.99", graphics: "🐍" },
    { id: 2, title: "Deep Neural Network Architecture", category: "analytics", instructor: "Marcus Vance", price: "$124.50", graphics: "🧠" },
    { id: 3, title: "Automated Rust Compiler Engine", category: "engineering", instructor: "Linus Coburn", price: "$145.00", graphics: "🦀" },
    { id: 4, title: "Pandas & NumPy Data Pipelines", category: "analytics", instructor: "Dr. Sarah Jenkins", price: "$74.99", graphics: "📊" },
    { id: 5, title: "Full-Stack Web Component Design", category: "engineering", instructor: "Elena Rostova", price: "$99.00", graphics: "💻" },
    { id: 6, title: "Statistical Forecasting Models", category: "analytics", instructor: "Liam Chen", price: "$65.00", graphics: "📈" }
];

const DOM = {
    toggle: document.getElementById('mobile-toggle'),
    drawer: document.getElementById('navigation-drawer'),
    search: document.getElementById('search-input'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    mountPoint: document.getElementById('cards-container-mount')
};

let filterState = "all";
let textSearchState = "";

DOM.toggle.addEventListener('click', () => {
    DOM.drawer.classList.toggle('active');
});

function renderDatabaseGrid() {
    DOM.mountPoint.innerHTML = "";
    
    const processedRoster = databaseCatalogPayload.filter(course => {
        const matchesCategory = filterState === "all" || course.category === filterState;
        const matchesSearchText = course.title.toLowerCase().includes(textSearchState.toLowerCase()) ||
                                 course.instructor.toLowerCase().includes(textSearchState.toLowerCase());
        return matchesCategory && matchesSearchText;
    });

    if (processedRoster.length === 0) {
        DOM.mountPoint.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 0; color: var(--text-muted); font-size: 1.1rem;">
                No matches inside dataset registry index matching query parameter criteria.
            </div>`;
        return;
    }

    processedRoster.forEach(element => {
        const itemHTMLStructure = `
            <article class="course-card">
                <div class="thumbnail-placeholder">${element.graphics}</div>
                <div class="course-details">
                    <span class="tag">${element.category}</span>
                    <h3>${element.title}</h3>
                    <p class="instructor">By ${element.instructor}</p>
                    <div class="card-footer">
                        <span class="price">${element.price}</span>
                        <button class="enroll-btn">Enroll</button>
                    </div>
                </div>
            </article>
        `;
        DOM.mountPoint.insertAdjacentHTML('beforeend', itemHTMLStructure);
    });
}

DOM.filterButtons.forEach(buttonElement => {
    buttonElement.addEventListener('click', (eventObject) => {
        DOM.filterButtons.forEach(btn => btn.classList.remove('active'));
        eventObject.target.classList.add('active');
        filterState = eventObject.target.getAttribute('data-filter');
        renderDatabaseGrid();
    });
});

DOM.search.addEventListener('input', (eventObject) => {
    textSearchState = eventObject.target.value;
    renderDatabaseGrid();
});

renderDatabaseGrid();
