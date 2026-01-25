// Sample products data (same as in home-gallery.js)
const products = [
    {id: 1, name: "Premium SUV", price: 2500000, category: "SUVs", stock: 12, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.08 PM.jpeg", rating: 4.8},
    {id: 2, name: "Compact Sedan", price: 1800000, category: "Sedans", stock: 25, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.09 PM.jpeg", rating: 4.6},
    {id: 3, name: "Sports Coupe", price: 3500000, category: "Sports", stock: 5, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.16 PM.jpeg", rating: 4.9},
    {id: 4, name: "Family Van", price: 2200000, category: "Vans", stock: 18, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.18 PM.jpeg", rating: 4.5},
    {id: 5, name: "Executive SUV", price: 4200000, category: "SUVs", stock: 9, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.19 PM.jpeg", rating: 4.7},
    {id: 6, name: "Pickup Truck", price: 2800000, category: "Trucks", stock: 14, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.23 PM.jpeg", rating: 4.4},
    {id: 7, name: "Luxury Sedan", price: 3200000, category: "Sedans", stock: 8, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.26 PM.jpeg", rating: 4.8},
    {id: 8, name: "Hatchback", price: 1500000, category: "Hatchbacks", stock: 20, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.27 PM.jpeg", rating: 4.3},
    {id: 9, name: "Convertible", price: 4500000, category: "Sports", stock: 3, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.30 PM.jpeg", rating: 4.9},
    {id: 10, name: "Crossover SUV", price: 2100000, category: "SUVs", stock: 15, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.31 PM.jpeg", rating: 4.7},
    {id: 11, name: "Minivan", price: 2400000, category: "Vans", stock: 11, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.34 PM.jpeg", rating: 4.5},
    {id: 12, name: "Budget Sedan", price: 1200000, category: "Sedans", stock: 30, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.35 PM.jpeg", rating: 4.2},
    {id: 13, name: "Performance SUV", price: 5200000, category: "SUVs", stock: 2, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.37 PM.jpeg", rating: 4.9},
    {id: 14, name: "Luxury Truck", price: 3800000, category: "Trucks", stock: 6, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.39 PM.jpeg", rating: 4.8},
    {id: 15, name: "Eco Hybrid", price: 1900000, category: "Sedans", stock: 22, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.40 PM.jpeg", rating: 4.6},
    {id: 16, name: "Compact SUV", price: 1700000, category: "SUVs", stock: 28, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.42 PM.jpeg", rating: 4.4},
    {id: 17, name: "Roadster", price: 5800000, category: "Sports", stock: 1, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.44 PM.jpeg", rating: 5.0},
    {id: 18, name: "Work Truck", price: 2300000, category: "Trucks", stock: 10, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.45 PM.jpeg", rating: 4.3},
    {id: 19, name: "Elegant Coupe", price: 3100000, category: "Sports", stock: 4, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.46 PM.jpeg", rating: 4.7},
    {id: 20, name: "Premium Hatchback", price: 1950000, category: "Hatchbacks", stock: 18, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.47 PM.jpeg", rating: 4.5},
    {id: 21, name: "Mega SUV", price: 4800000, category: "SUVs", stock: 5, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.49 PM.jpeg", rating: 4.8},
    {id: 22, name: "Sedan Plus", price: 2600000, category: "Sedans", stock: 12, image: "images.Calxin/WhatsApp Image 2026-01-23 at 4.58.50 PM.jpeg", rating: 4.6}
];

let currentProduct = null;
let quantity = 1;

// Load product details on page load
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    
    currentProduct = products.find(p => p.id === productId);
    
    if(currentProduct) {
        loadProductDetails();
        loadRelatedProducts();
        checkWishlist();
    } else {
        window.location.href = 'project.html';
    }
});

// Load product details
function loadProductDetails() {
    document.getElementById('mainImage').src = currentProduct.image;
    document.getElementById('mainImage').onerror = function() {
        this.src = `https://via.placeholder.com/500x500?text=${encodeURIComponent(currentProduct.name)}`;
    };
    
    document.getElementById('productName').textContent = currentProduct.name;
    document.getElementById('breadcrumbName').textContent = currentProduct.name;
    document.getElementById('productCategory').textContent = currentProduct.category;
    document.getElementById('productRating').textContent = `⭐ ${currentProduct.rating}`;
    document.getElementById('productStock').textContent = `${currentProduct.stock} in Stock`;
    document.getElementById('productPrice').textContent = `KES ${currentProduct.price.toLocaleString()}`;
    
    // Specs
    document.getElementById('specCategory').textContent = currentProduct.category;
    document.getElementById('specPrice').textContent = `KES ${currentProduct.price.toLocaleString()}`;
    document.getElementById('specStock').textContent = `${currentProduct.stock} units available`;
    document.getElementById('specRating').textContent = `${currentProduct.rating}/5 (Highly Rated)`;
    
    // Related section
    document.getElementById('relatedCategory').textContent = currentProduct.category;
}

// Load related products
function loadRelatedProducts() {
    const related = products.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id).slice(0, 4);
    const container = document.getElementById('relatedProducts');
    
    if(related.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No related products</p>';
        return;
    }
    
    container.innerHTML = '';
    related.forEach(product => {
        const item = document.createElement('div');
        item.className = 'related-item';
        item.onclick = () => viewProduct(product.id);
        item.innerHTML = `
            <div class="related-item-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/200x150?text=${encodeURIComponent(product.name)}'">
            </div>
            <div class="related-item-info">
                <h4>${product.name}</h4>
                <p class="related-item-price">KES ${product.price.toLocaleString()}</p>
            </div>
        `;
        container.appendChild(item);
    });
}

// Quantity functions
function increaseQuantity() {
    quantity++;
    document.getElementById('quantity').value = quantity;
}

function decreaseQuantity() {
    if(quantity > 1) {
        quantity--;
        document.getElementById('quantity').value = quantity;
    }
}

// Add to cart
function addProductToCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === currentProduct.id);
    
    if(existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({...currentProduct, quantity: quantity});
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${quantity} x ${currentProduct.name} added to cart!`);
    quantity = 1;
    document.getElementById('quantity').value = 1;
}

// Wishlist functions
function checkWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isInWishlist = wishlist.some(item => item.id === currentProduct.id);
    
    const btn = document.getElementById('wishlistBtn');
    const text = document.getElementById('wishlistText');
    
    if(isInWishlist) {
        btn.classList.add('in-wishlist');
        text.textContent = 'Remove from Wishlist';
    } else {
        btn.classList.remove('in-wishlist');
        text.textContent = 'Add to Wishlist';
    }
}

function toggleWishlist() {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.findIndex(item => item.id === currentProduct.id);
    
    if(index > -1) {
        wishlist.splice(index, 1);
        alert('Removed from wishlist');
    } else {
        wishlist.push(currentProduct);
        alert('Added to wishlist');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    checkWishlist();
}

// View another product
function viewProduct(productId) {
    window.location.href = `product-view.html?id=${productId}`;
}
