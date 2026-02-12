// Load cart data on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    loadSuggestedProducts();
    setupDeliveryOptions();
});

const PORTAL_PRODUCTS = [
    { id: 1, name: "Engine Assembly Complete", price: 45000, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.19 PM.jpeg" },
    { id: 2, name: "Transmission Automatic", price: 38000, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.23 PM.jpeg" },
    { id: 3, name: "Brake Pads Set", price: 2500, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.26 PM.jpeg" },
    { id: 4, name: "Car Battery 12V 100A", price: 8500, image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.27 PM.jpeg" }
];

function resolveImagePath(path) {
    const image = String(path || "").replace("images.Calxin/", "calxin.images/");
    return image || "https://via.placeholder.com/120";
}

function normalizeCartItems(items) {
    return (items || []).map(item => ({
        productId: item.productId || item.id || 0,
        name: item.name || "Product",
        price: Number(item.price) || 0,
        quantity: Number(item.quantity || item.qty) || 1,
        image: resolveImagePath(item.image)
    }));
}

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

// Load and display cart items
function loadCart() {
    const cartData = localStorage.getItem('cart');
    const cartItems = normalizeCartItems(cartData ? JSON.parse(cartData) : []);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    const container = document.getElementById('cartItemsContainer');
    const emptyMessage = document.getElementById('emptyCartMessage');

    if(cartItems.length === 0) {
        container.style.display = 'none';
        emptyMessage.style.display = 'block';
        updateTotals();
        return;
    }

    container.style.display = 'flex';
    emptyMessage.style.display = 'none';
    container.innerHTML = '';

    cartItems.forEach((item, index) => {
        const itemElement = createCartItemElement(item, index);
        container.appendChild(itemElement);
    });

    updateTotals();
}

// Create cart item element
function createCartItemElement(item, index) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    
    const itemTotal = item.price * item.quantity;

    div.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">KES ${(item.price || 0).toLocaleString()}</div>
            <div class="cart-item-quantity">
                <button class="qty-btn" onclick="updateQuantity(${index}, -1)">−</button>
                <input type="number" id="quantity-${index}" value="${item.quantity}" min="1" readonly>
                <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
            </div>
        </div>
        <div class="cart-item-total">
            <div class="item-subtotal">KES ${itemTotal.toLocaleString()}</div>
            <button class="remove-btn" onclick="removeFromCart(${index})">
                <i class="fas fa-trash"></i> Remove
            </button>
        </div>
    `;

    return div;
}

// Update item quantity
function updateQuantity(index, change) {
    const cartData = localStorage.getItem('cart');
    const cartItems = normalizeCartItems(cartData ? JSON.parse(cartData) : []);

    if(cartItems[index]) {
        cartItems[index].quantity = Math.max(1, cartItems[index].quantity + change);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        loadCart();
    }
}

// Remove item from cart
function removeFromCart(index) {
    if(confirm('Are you sure you want to remove this item?')) {
        const cartData = localStorage.getItem('cart');
        const cartItems = normalizeCartItems(cartData ? JSON.parse(cartData) : []);

        cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        loadCart();
    }
}

// Update totals
function updateTotals() {
    const cartData = localStorage.getItem('cart');
    const cartItems = normalizeCartItems(cartData ? JSON.parse(cartData) : []);
    const deliveryFeeElement = document.querySelector('input[name="delivery"]:checked');
    const deliveryFee = deliveryFeeElement ? parseInt(deliveryFeeElement.value) : 0;

    let subtotal = 0;
    cartItems.forEach(item => {
        subtotal += (item.price || 0) * (item.quantity || 1);
    });

    // Get discount (if any promo applied)
    const discount = parseInt(localStorage.getItem('discount') || 0);

    const total = subtotal + deliveryFee - discount;

    document.getElementById('subtotal').textContent = 'KES ' + subtotal.toLocaleString();
    document.getElementById('deliveryFee').textContent = 'KES ' + deliveryFee.toLocaleString();
    document.getElementById('discount').textContent = 'KES ' + discount.toLocaleString();
    document.getElementById('total').textContent = 'KES ' + Math.max(0, total).toLocaleString();
}

// Setup delivery options
function setupDeliveryOptions() {
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    deliveryOptions.forEach(option => {
        option.addEventListener('change', function() {
            updateTotals();
        });
    });
}

// Apply promo code
function applyPromoCode() {
    const promoCode = document.getElementById('promoCode').value.trim().toUpperCase();
    
    if(!promoCode) {
        alert('Please enter a promo code');
        return;
    }

    // Promo codes (you can add more)
    const promoCodes = {
        'SAVE100': 100,
        'SAVE500': 500,
        'SAVE1000': 1000,
        'CALXIN20': 2000,
        'FIRST50': 50
    };

    if(promoCodes[promoCode]) {
        localStorage.setItem('discount', promoCodes[promoCode]);
        alert(`Promo code applied! Discount: KES ${promoCodes[promoCode]}`);
        document.getElementById('promoCode').value = '';
        updateTotals();
    } else {
        alert('Invalid promo code');
    }
}

// Checkout
function checkout() {
    const cartData = localStorage.getItem('cart');
    const cartItems = normalizeCartItems(cartData ? JSON.parse(cartData) : []);

    if(cartItems.length === 0) {
        alert('Your cart is empty');
        return;
    }

    // Get delivery option
    const deliveryOption = document.querySelector('input[name="delivery"]:checked');
    const deliveryType = deliveryOption ? deliveryOption.nextElementSibling.textContent : 'Pickup';

    // Get totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = deliveryOption ? parseInt(deliveryOption.value) : 0;
    const discount = parseInt(localStorage.getItem('discount') || 0);
    const total = subtotal + deliveryFee - discount;

    // Create order summary
    const orderSummary = {
        items: cartItems,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        deliveryType: deliveryType,
        discount: discount,
        total: total,
        date: new Date().toLocaleString()
    };

    // Save order
    let orders = localStorage.getItem('orders');
    let ordersList = orders ? JSON.parse(orders) : [];
    ordersList.push(orderSummary);
    localStorage.setItem('orders', JSON.stringify(ordersList));

    // Show order confirmation
    const confirmMessage = `
Order Confirmed!

Items: ${cartItems.length}
Subtotal: KES ${subtotal.toLocaleString()}
Delivery (${deliveryType}): KES ${deliveryFee.toLocaleString()}
${discount > 0 ? `Discount: -KES ${discount.toLocaleString()}` : ''}
TOTAL: KES ${total.toLocaleString()}

Please contact us to arrange payment and delivery:
Email: calxinkenya147@gmail.com
WhatsApp: +254712345678

Thank you for your order!`;

    alert(confirmMessage);

    // Clear cart and discount
    localStorage.removeItem('cart');
    localStorage.removeItem('discount');

    // Redirect to home
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// Load suggested products
function loadSuggestedProducts() {
    const container = document.getElementById('suggestedProducts');
    container.innerHTML = '';

    if(PORTAL_PRODUCTS.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No products available</p>';
        return;
    }

    PORTAL_PRODUCTS.forEach(product => {
        const card = document.createElement('div');
        card.className = 'suggested-card';
        card.innerHTML = `
            <div class="suggested-card-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/180x150?text=${encodeURIComponent(product.name)}'">
            </div>
            <div class="suggested-card-info">
                <div class="suggested-card-name">${product.name}</div>
                <div class="suggested-card-price">KES ${(product.price || 0).toLocaleString()}</div>
                <button class="suggested-card-btn" onclick="addSuggestedToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Add suggested product to cart
function addSuggestedToCart(id, name, price, image) {
    let cartData = localStorage.getItem('cart');
    let cartItems = normalizeCartItems(cartData ? JSON.parse(cartData) : []);

    // Check if product already in cart
    const existing = cartItems.find(item => Number(item.productId) === Number(id));
    if(existing) {
        existing.quantity += 1;
    } else {
        cartItems.push({
            productId: id,
            name: name,
            price: price,
            quantity: 1,
            image: image
        });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    loadCart();
    
    alert(`${name} added to cart!`);
}
