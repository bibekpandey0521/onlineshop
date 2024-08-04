document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const categorySelect = document.getElementById('category');
    const sortSelect = document.getElementById('sort');

    async function fetchProducts() {
        const response = await fetch('https://bibekpandey0521.github.io/onlineshop/products.json');
        return response.json();
    }

    function renderProducts(products) {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="price">$${product.price.toFixed(2)}</div>
                <div class="rating">${'★'.repeat(Math.round(product.rating))}</div>
            `;
            productGrid.appendChild(card);
        });
    }

    function applyFilters(products) {
        const category = categorySelect.value;
        const sort = sortSelect.value;

        let filteredProducts = products;

        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }

        if (sort.includes('price')) {
            filteredProducts.sort((a, b) => sort.includes('asc') ? a.price - b.price : b.price - a.price);
        } else if (sort.includes('rating')) {
            filteredProducts.sort((a, b) => sort.includes('asc') ? a.rating - b.rating : b.rating - a.rating);
        }

        renderProducts(filteredProducts);
    }

    fetchProducts().then(products => {
        renderProducts(products);

        categorySelect.addEventListener('change', () => applyFilters(products));
        sortSelect.addEventListener('change', () => applyFilters(products));
    });
});
