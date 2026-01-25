// Load wishlist on page load
document.addEventListener('DOMContentLoaded', function() {
    loadWishlist();
});

// Load and display wishlist items
function loadWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const container = document.getElementById('wishlistItemsContainer');
    const emptyMessage = document.getElementById('emptyWishlistMessage');

    if(wishlist.length === 0) {
        container.style.display = 'none';
        emptyMessage.style.display = 'block';
        return;
    }

    container.innerHTML = '';
    emptyMessage.style.display = 'none';

    wishlist.forEach(product => {
        const item = document.createElement('div');
        item.className = 'wishlist-item';
        item.innerHTML = `
            <div class="wishlist-item-image" onclick="viewProduct(${product.id})">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/250x200?text=${encodeURIComponent(product.name)}'">
                <div class="stock-badge">${product.stock > 0 ? product.stock + ' in Stock' : 'Out of Stock'}</div>
            </div>
            <div class="wishlist-item-info">
                <h3>${product.name}</h3>
                <p class="wishlist-item-category">${product.category}</p>
                <p class="wishlist-item-price">KES ${product.price.toLocaleString()}</p>
                <p class="wishlist-item-rating">⭐ ${product.rating}</p>
                <div class="wishlist-item-actions">
                    <button class="btn-add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn-remove" onclick="removeFromWishlist(${product.id})" title="Remove from Wishlist">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(item);
    });
}

// Remove from wishlist
function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadWishlist();
    alert('Removed from wishlist');
}

// Add to cart
function addToCart(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const product = wishlist.find(p => p.id === productId);
    
    if(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === productId);
        
        if(existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    }
}

// View product details
function viewProduct(productId) {
    window.location.href = `product-view.html?id=${productId}`;
}
