document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('productContainer');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortOptions = document.getElementById('sortOptions');
  
    async function loadProducts() {
      const response = await fetch('products.json');
      const products = await response.json();
      return products;
    }
  
    function displayProducts(products) {
      productContainer.innerHTML = '';
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
          <img src="${product.imageUrl}" alt="${product.name}">
          <div class="product-info">
            <h2>${product.name}</h2>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p class="rating">Rating: ${product.rating.toFixed(1)}</p>
          </div>
        `;
        productContainer.appendChild(productCard);
      });
    }
  
    function filterAndSortProducts(products) {
      const category = categoryFilter.value;
      const sort = sortOptions.value;
  
      let filteredProducts = products;
      
      if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
      }
  
      switch (sort) {
        case 'priceAsc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'priceDesc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'ratingAsc':
          filteredProducts.sort((a, b) => a.rating - b.rating);
          break;
        case 'ratingDesc':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
      }
  
      displayProducts(filteredProducts);
    }
  
    loadProducts().then(products => {
      displayProducts(products);
  
      categoryFilter.addEventListener('change', () => filterAndSortProducts(products));
      sortOptions.addEventListener('change', () => filterAndSortProducts(products));
    });
  });
  