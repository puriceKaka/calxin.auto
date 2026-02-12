// Sample products data (same as in home-gallery.js)
const products = [
    {id: 0, name: "Engine Assembly Complete", price: 45000, category: "Engines", stock: 12, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.08 PM.jpeg", rating: 4.8},
    {id: 1, name: "Transmission Automatic", price: 38000, category: "Transmissions", stock: 8, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.09 PM.jpeg", rating: 4.7},
    {id: 2, name: "Brake Pads Set", price: 2500, category: "Brakes", stock: 45, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.16 PM.jpeg", rating: 4.9},
    {id: 3, name: "Brake Rotors Pair", price: 5800, category: "Brakes", stock: 32, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.18 PM.jpeg", rating: 4.6},
    {id: 4, name: "Car Battery 12V 100A", price: 8500, category: "Electrical", stock: 28, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.19 PM.jpeg", rating: 4.8},
    {id: 5, name: "Alternator Genuine", price: 12000, category: "Electrical", stock: 15, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.23 PM.jpeg", rating: 4.7},
    {id: 6, name: "Starter Motor", price: 9500, category: "Electrical", stock: 18, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.26 PM.jpeg", rating: 4.5},
    {id: 7, name: "Water Pump Assembly", price: 6800, category: "Cooling", stock: 22, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.27 PM.jpeg", rating: 4.6},
    {id: 8, name: "Radiator Complete", price: 11500, category: "Cooling", stock: 14, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.30 PM.jpeg", rating: 4.7},
    {id: 9, name: "Thermostat Housing", price: 3200, category: "Cooling", stock: 35, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.31 PM.jpeg", rating: 4.8},
    {id: 10, name: "Air Filter Kit", price: 1500, category: "Filters", stock: 50, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.34 PM.jpeg", rating: 4.9},
    {id: 11, name: "Oil Filter", price: 800, category: "Filters", stock: 60, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.35 PM.jpeg", rating: 5.0},
    {id: 12, name: "Cabin Air Filter", price: 1200, category: "Filters", stock: 40, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.37 PM.jpeg", rating: 4.7},
    {id: 13, name: "Spark Plugs Set 4", price: 2800, category: "Ignition", stock: 48, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.39 PM.jpeg", rating: 4.8},
    {id: 14, name: "Coil Pack", price: 4500, category: "Ignition", stock: 20, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.40 PM.jpeg", rating: 4.6},
    {id: 15, name: "Fuel Pump", price: 7800, category: "Fuel System", stock: 16, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.42 PM.jpeg", rating: 4.7},
    {id: 16, name: "Fuel Filter", price: 1800, category: "Fuel System", stock: 42, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.44 PM.jpeg", rating: 4.9},
    {id: 17, name: "Fuel Injector Set", price: 6200, category: "Fuel System", stock: 12, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.45 PM.jpeg", rating: 4.8},
    {id: 18, name: "Suspension Springs Pair", price: 8900, category: "Suspension", stock: 18, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.46 PM.jpeg", rating: 4.6},
    {id: 19, name: "Shock Absorbers Pair", price: 7500, category: "Suspension", stock: 25, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.47 PM.jpeg", rating: 4.7},
    {id: 20, name: "Stabilizer Link Kit", price: 3200, category: "Suspension", stock: 36, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.49 PM.jpeg", rating: 4.8},
    {id: 21, name: "Steering Rack Assembly", price: 15000, category: "Steering", stock: 8, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.50 PM.jpeg", rating: 4.5},
    {id: 22, name: "Tie Rod Ends Pair", price: 2800, category: "Steering", stock: 44, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.53 PM.jpeg", rating: 4.9},
    {id: 23, name: "Tyre 175/65 R14", price: 4500, category: "Tyres", stock: 38, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.55 PM.jpeg", rating: 4.8},
    {id: 24, name: "Tyre 195/55 R15", price: 5200, category: "Tyres", stock: 32, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.59 PM.jpeg", rating: 4.7},
    {id: 25, name: "Alloy Wheel 16 inch", price: 9500, category: "Wheels", stock: 16, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.00 PM.jpeg", rating: 4.8},
    {id: 26, name: "Car Wax Premium", price: 950, category: "Accessories", stock: 55, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.01 PM.jpeg", rating: 4.9},
    {id: 27, name: "Floor Mats Set", price: 1800, category: "Accessories", stock: 42, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.03 PM.jpeg", rating: 4.7},
    {id: 28, name: "Seat Covers Premium", price: 5500, category: "Accessories", stock: 24, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.05 PM.jpeg", rating: 4.8},
    {id: 29, name: "Roof Rack Bars", price: 3800, category: "Accessories", stock: 20, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.06 PM.jpeg", rating: 4.6},
    {id: 30, name: "Car Stereo System", price: 12500, category: "Audio System", stock: 11, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.08 PM.jpeg", rating: 4.7},
    {id: 31, name: "Reverse Camera Kit", price: 4200, category: "Audio System", stock: 28, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.09 PM.jpeg", rating: 4.8},
    {id: 32, name: "LED Headlights Pair", price: 8800, category: "Lighting", stock: 17, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.11 PM.jpeg", rating: 4.9},
    {id: 33, name: "Tail Light Assembly", price: 3500, category: "Lighting", stock: 31, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.12 PM.jpeg", rating: 4.8},
    {id: 34, name: "Windshield Wiper Blades", price: 1200, category: "Accessories", stock: 48, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.14 PM.jpeg", rating: 4.9},
    {id: 35, name: "Car Door Lock Actuator", price: 2800, category: "Electrical", stock: 19, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.15 PM.jpeg", rating: 4.6},
    {id: 36, name: "Window Regulator Motor", price: 3200, category: "Electrical", stock: 22, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.17 PM.jpeg", rating: 4.7},
    {id: 37, name: "HVAC Compressor", price: 14500, category: "HVAC System", stock: 9, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.18 PM.jpeg", rating: 4.8},
    {id: 38, name: "Cabin Air Vents", price: 1500, category: "HVAC System", stock: 36, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.20 PM.jpeg", rating: 4.7},
    {id: 39, name: "Engine Oil 5L Synthetic", price: 2500, category: "Oils & Fluids", stock: 58, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.22 PM.jpeg", rating: 4.9},
    {id: 40, name: "Coolant Concentrate 1L", price: 950, category: "Oils & Fluids", stock: 62, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.24 PM.jpeg", rating: 4.8},
    {id: 41, name: "Brake Fluid 500ml", price: 650, category: "Oils & Fluids", stock: 55, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.25 PM.jpeg", rating: 5.0},
    {id: 42, name: "Power Steering Fluid", price: 1100, category: "Oils & Fluids", stock: 48, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.27 PM.jpeg", rating: 4.9},
    {id: 43, name: "Transmission Fluid", price: 1800, category: "Oils & Fluids", stock: 40, image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.30 PM.jpeg", rating: 4.8},
];

const availableImageFiles = [
    "WhatsApp Image 2026-01-23 at 4.58.19 PM (1).jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.19 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.23 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.26 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.27 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.31 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.35 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.37 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.39 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.42 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.44 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.45 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.46 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.47 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.50 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.53 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.55 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.59 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.59.00 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.59.04 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 5.00.46 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 5.00.48 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 5.00.49 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 5.00.56 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 5.00.58 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 5.01.00 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 5.01.01 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 5.01.02 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 5.01.03 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 5.01.06 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 5.01.07 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 5.01.09 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 5.01.12 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 5.01.13 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 5.01.14 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 5.01.16 PM.jpeg"
];

function resolveProductImage(path, index) {
    const rawName = (path || "").split("/").pop();
    if (rawName && availableImageFiles.includes(rawName)) {
        return `calxin.images/${rawName}`;
    }
    return `calxin.images/${availableImageFiles[index % availableImageFiles.length]}`;
}

products.forEach((product, index) => {
    product.image = resolveProductImage(product.image, index);
});

let currentProduct = null;
let quantity = 1;

// Mobile menu toggle
function toggleMobileMenu() {
    const sideMenu = document.getElementById('sideMenuMobile');
    const hamburger = document.querySelector('.hamburger');
    
    if (sideMenu && hamburger) {
        sideMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const sideMenu = document.getElementById('sideMenuMobile');
    const hamburger = document.querySelector('.hamburger');
    
    if (sideMenu && hamburger) {
        sideMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const sideMenu = document.getElementById('sideMenuMobile');
    const hamburger = document.querySelector('.hamburger');
    
    if (sideMenu && hamburger && sideMenu.classList.contains('active')) {
        if (!sideMenu.contains(event.target) && !hamburger.contains(event.target)) {
            closeMobileMenu();
        }
    }
});

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
        window.location.href = 'index.html';
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

