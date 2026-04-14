// SalcedoEq Store Engine

const products = window.SalcedoProducts || [];

let filters = {
    globalType: null, // "Mobiliario" or "Equipamiento"
    category: null,
    subcategory: null,
    search: "",
    brand: null,
    priceMin: null,
    priceMax: null
};

let currentPage = 1;
let itemsPerPage = 9;

// Calculate dynamic rows based on viewport Grid layout widths.
function calculateItemsPerPage() {
    const grid = document.getElementById('product-grid');
    if (!grid) return 9;
    
    // Evaluate grid width directly (avoids breaking fast on resize shifts)
    const containerWidth = grid.clientWidth;
    if (containerWidth === 0) return itemsPerPage; // Hidden state default ignore
    
    // minmax(220px, 1fr) with a 1rem (16px) gap => ~236px per column mathematical block.
    let columns = Math.floor((containerWidth + 16) / 236);
    if (columns < 1) columns = 1;

    // Based on requirements, maintain exactly 3 full scale rows
    let newItemsPerPage = columns * 3;
    
    if (newItemsPerPage !== itemsPerPage) {
        itemsPerPage = newItemsPerPage;
        return true; // value changed
    }
    return false;
}

window.addEventListener('resize', () => {
    if (calculateItemsPerPage()) {
        // Enforce boundary refresh if layout shifts drastically
        currentPage = 1; 
        applyFilters(false);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Determine initial capacities
    calculateItemsPerPage();

    // 1. Read URL Params
    const urlParams = new URLSearchParams(window.location.search);
    
    const globalParam = urlParams.get('global');
    if (globalParam) {
        filters.globalType = globalParam.charAt(0).toUpperCase() + globalParam.slice(1).toLowerCase();
    }

    const searchParam = urlParams.get('search');
    if (searchParam) {
        filters.search = searchParam;
    }

    bindEvents();
    applyFilters();
});

function bindEvents() {
    // Sidebar Category Header Toggle
    const catToggle = document.getElementById('cat-toggle');
    const catListContent = document.getElementById('cat-list-content');
    
    if (catToggle && catListContent) {
        // Mobile Resize Auto-Collapse
        const mql = window.matchMedia('(max-width: 992px)');
        const updateCatState = (isMobile) => {
            catListContent.style.display = isMobile ? 'none' : 'block';
            catToggle.querySelector('span').textContent = isMobile ? '▶' : '▼';
        };
        
        // Initial state
        updateCatState(mql.matches);
        
        // Listen to screen size changes
        mql.addEventListener('change', (e) => updateCatState(e.matches));

        catToggle.addEventListener('click', () => {
            if (window.getComputedStyle(catListContent).display === 'none') {
                catListContent.style.display = 'block';
                catToggle.querySelector('span').textContent = '▼';
            } else {
                catListContent.style.display = 'none';
                catToggle.querySelector('span').textContent = '▶';
            }
        });
    }

    // Sidebar Categories (Accordion Toggle + Filtering)
    const catItems = document.querySelectorAll('.cat-item > a');
    catItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const parentLi = link.parentElement;
            
            // Toggle Accordion 
            const wasActive = parentLi.classList.contains('active');
            document.querySelectorAll('.cat-item').forEach(li => li.classList.remove('active'));
            if (!wasActive) {
                parentLi.classList.add('active');
            }

            // If clicked directly on the Chevron (SVG), ONLY unfold the menu, do NOT apply the main filter
            if (e.target.closest('.chevron') || e.target.tagName.toLowerCase() === 'svg' || e.target.tagName.toLowerCase() === 'path') {
                return;
            }

            // Apply broad category filter
            const catName = link.childNodes[0].textContent.trim();
            filters.category = catName;
            filters.subcategory = null; // reset subcat
            currentPage = 1;
            applyFilters(true);
        });
    });

    // Subcategories (Specific Filter)
    const subCatLinks = document.querySelectorAll('.sub-cat-list a');
    subCatLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // prevent triggering parent accordion
            
            // Extract the subcategory name directly from the link text to guarantee accuracy
            const subcatName = link.textContent.trim();
            
            // Auto setup parent category name
            const parentCatLink = link.closest('.cat-item').querySelector('a');
            filters.category = parentCatLink.childNodes[0].textContent.trim();
            
            filters.subcategory = subcatName;
            currentPage = 1;
            applyFilters(true);
        });
    });

    // Sidebar Search
    const sideSearchForm = document.querySelector('.sidebar-search form');
    if (sideSearchForm) {
        sideSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = sideSearchForm.querySelector('input').value;
            filters.search = input;
            currentPage = 1;
            applyFilters(true);
        });
    }

    // Fast Search Submit
    const fastSearchForm = document.querySelector('.fastSearch-form');
    if (fastSearchForm) {
        const applyBtn = document.querySelector('.fastSearch-btn');
        if (applyBtn) {
            applyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const tipoSelect = fastSearchForm.querySelector('.form-tipo select');
                const marcaSelect = fastSearchForm.querySelector('.form-marca select');
                
                if (tipoSelect && tipoSelect.value !== "TIPO") {
                    filters.category = tipoSelect.value;
                    filters.subcategory = null;
                }
                if (marcaSelect && marcaSelect.value !== "MARCA") {
                    filters.brand = marcaSelect.value;
                }
                
                currentPage = 1;
                applyFilters(true);
            });
        }
    }
}

function updateDynamicHeader() {
    const headerTitle = document.querySelector('.shop-header h2');
    if (!headerTitle) return;

    if (filters.subcategory) {
        headerTitle.textContent = filters.category + ' - ' + filters.subcategory;
    } else if (filters.category) {
        headerTitle.textContent = filters.category;
    } else if (filters.globalType) {
        headerTitle.textContent = 'Equipos: ' + filters.globalType;
    } else {
        headerTitle.textContent = 'Todos los Productos';
    }
}

function checkActiveFilters() {
    // Check if any filter is active
    let isActive = false;
    const activePills = [];

    if (filters.globalType) { isActive = true; activePills.push({ label: `Tipo: ${filters.globalType}`, key: 'globalType' }); }
    if (filters.subcategory) { 
        isActive = true; 
        activePills.push({ label: `Subcategoría: ${filters.subcategory}`, key: 'subcategory' }); 
    } else if (filters.category) { 
        isActive = true; 
        activePills.push({ label: `Categoría: ${filters.category}`, key: 'category' }); 
    }
    if (filters.search) { isActive = true; activePills.push({ label: `Buscar: ${filters.search}`, key: 'search' }); }
    if (filters.brand) { isActive = true; activePills.push({ label: `Marca: ${filters.brand}`, key: 'brand' }); }

    // Hide fastSearch banner if active (Anti Layout Shift)
    const heroBanner = document.querySelector('.fastSearch-heroBanner');
    if (heroBanner) {
        const header = document.querySelector('.shop-header');
        const scrollOffsetY = window.scrollY;
        const headerOffsetTop = header ? header.getBoundingClientRect().top : 0;

        const currentlyActive = heroBanner.style.display === 'none';
        
        if (currentlyActive !== isActive) {
            heroBanner.style.display = isActive ? 'none' : 'block';
            
            // Fix layout jump when disappearing, but don't force a scroll here
            if (isActive && header && !window.pendingSmoothScroll) {
                const newHeaderOffset = header.getBoundingClientRect().top;
                window.scrollBy(0, newHeaderOffset - headerOffsetTop);
            }
        }
    }

    // Update active filters UI
    const container = document.getElementById('active-filters-container');
    const list = document.getElementById('active-filters-list');
    
    if (isActive) {
        container.style.display = 'flex';
        list.innerHTML = '';
        activePills.forEach(pill => {
            const span = document.createElement('span');
            span.className = 'filter-pill';
            span.innerHTML = `${pill.label} <span class="pill-close">&times;</span>`;
            span.addEventListener('click', () => {
                filters[pill.key] = null;
                // If category cleared, subcategory must clear too
                if (pill.key === 'category') filters.subcategory = null;
                
                if (pill.key === 'search') {
                    const sideInput = document.querySelector('.sidebar-search input');
                    if (sideInput) sideInput.value = '';
                }
                currentPage = 1;
                applyFilters(true);
            });
            list.appendChild(span);
        });
    } else {
        container.style.display = 'none';
        // Remove accordion active classes if category is cleared
        document.querySelectorAll('.cat-item').forEach(li => li.classList.remove('active'));
    }
    
    updateDynamicHeader();

    return isActive; // Return state to applyFilters
}

function applyFilters(doScroll = false) {
    let result = products;

    if (filters.globalType) {
        result = result.filter(p => p.globalType === filters.globalType);
    }
    if (filters.category) {
        result = result.filter(p => p.category === filters.category);
    }
    if (filters.subcategory) {
        result = result.filter(p => p.subcategory === filters.subcategory);
    }
    if (filters.brand) {
        result = result.filter(p => p.brand === filters.brand);
    }
    if (filters.search) {
        const q = filters.search.toLowerCase();
        result = result.filter(p => p.name.toLowerCase().includes(q));
    }

    if (doScroll) {
        window.pendingSmoothScroll = true;
    }

    const filtersActive = checkActiveFilters();
    renderProducts(result);
    renderPagination(result);

    if (doScroll) {
        const target = filtersActive 
            ? document.querySelector('.shop-header') 
            : document.querySelector('.fastSearch-heroBanner');

        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        
        setTimeout(() => window.pendingSmoothScroll = false, 500);
    }
}

function renderProducts(filteredProducts) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const toShow = filteredProducts.slice(start, end);

    if (toShow.length === 0) {
        grid.innerHTML = '<p class="no-results" style="grid-column: 1/-1;">No se encontraron productos con estos filtros.</p>';
        return;
    }

    toShow.forEach(p => {
        const cardHTML = `
            <div class="card product-item border-0 mb-4">
                <div class="wrap-product-img card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img class="product-img img-fluid w-100" src="${p.img}" alt="${p.name}">
                </div>
                <div class="card-body text-center p-0 pt-3 pb-3">
                    <h6 class="product-name text-truncate mb-3">${p.name}</h6>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function renderPagination(filteredProducts) {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    let navUI = document.querySelector('.pagination');
    let navStore = document.querySelector('.nav-store');
    
    if (!navStore) return;

    if (!navUI) {
        navStore.innerHTML = '<ul class="pagination m-0"></ul>';
        navUI = document.querySelector('.pagination');
    }

    navUI.innerHTML = '';

    if (totalPages <= 1) {
        navStore.style.display = 'none';
        return;
    }
    
    navStore.style.display = 'block';

    // Prev Button
    if (currentPage > 1) {
        navUI.innerHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${currentPage - 1}">Anterior</a></li>`;
    }

    // Smart Truncation (Ellipsis logic)
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > 5) {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 4;
        } else if (currentPage >= totalPages - 2) {
            startPage = totalPages - 3;
            endPage = totalPages;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }
    }

    // Insert First Page & Left Ellipsis if detached
    if (startPage > 1) {
        navUI.innerHTML += `<li class="page-item"><a class="page-link" href="#" data-page="1">1</a></li>`;
        if (startPage > 2) {
            navUI.innerHTML += `<li class="page-item"><span class="page-link" style="border: none; background: transparent;">...</span></li>`;
        }
    }

    // Sequential Pages Build Frame
    for (let i = startPage; i <= endPage; i++) {
        navUI.innerHTML += `<li class="page-item ${currentPage === i ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    }

    // Insert Right Ellipsis & Last Page if detached
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            navUI.innerHTML += `<li class="page-item"><span class="page-link" style="border: none; background: transparent;">...</span></li>`;
        }
        navUI.innerHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a></li>`;
    }

    // Next Button
    if (currentPage < totalPages) {
        navUI.innerHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${currentPage + 1}">Siguiente</a></li>`;
    }

    // Bind Pagination Events
    navUI.querySelectorAll('.page-link[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = e.target.parentElement;
            if (parent.classList.contains('active')) return;
            
            currentPage = parseInt(e.target.getAttribute('data-page'));
            applyFilters(true);
        });
    });
}
