// ================================
// NAVIGATION & INTERACTIVITY
// ================================

// Cart icon click handler
document.addEventListener("DOMContentLoaded", function(){
    const cartIcon = document.querySelector(".cart-icon");
    if(cartIcon) {
        cartIcon.addEventListener("click", function(){
            window.location.href = 'cart.html';
        });
        cartIcon.style.cursor = "pointer";
    }
});

function navigateTo(page) {
    if(page === 'home') {
        window.location.href = 'index.html';
    } else if(page === 'about') {
        window.location.href = 'about.html';
    } else if(page === 'contact') {
        window.location.href = 'contact.html';
    }
}

function toggleMenu() {
    const sideMenu = document.getElementById("sideMenu");
    const header = document.querySelector(".header");
    if (sideMenu) {
        sideMenu.classList.toggle("active");
        header.classList.toggle("menu-open");
    }
}

// Mobile Navigation Menu Toggle
function toggleMobileNav() {
    const navMenu = document.getElementById("navMenuMobile");
    const header = document.querySelector(".header");
    if (navMenu) {
        navMenu.classList.toggle("active");
        header.classList.toggle("menu-open");
    }
}

// Close Mobile Navigation Menu
function closeMobileNav() {
    const navMenu = document.getElementById("navMenuMobile");
    const header = document.querySelector(".header");
    if (navMenu) {
        navMenu.classList.remove("active");
        header.classList.remove("menu-open");
    }
}

// Close menu when clicking outside
document.addEventListener("click", function(e) {
    const navMenu = document.getElementById("navMenuMobile");
    const hamburger = document.querySelector(".hamburger");
    const header = document.querySelector(".header");
    
    if (navMenu && hamburger && header) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            if (navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                header.classList.remove("menu-open");
            }
        }
    }
});

function navigateToSection(section) {
    // Remove active class from all nav links
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });
    
    // Add active class to clicked link
    const activeLink = document.querySelector(`[data-section="${section}"]`);
    if(activeLink) activeLink.classList.add("active");
    
    // Close mobile menu
    const menu = document.getElementById("sideMenu");
    if(menu) menu.classList.remove("active");
}

function filterByCategory(category) {
    // Close the hamburger menu
    const sideMenu = document.getElementById("sideMenu");
    if(sideMenu) sideMenu.classList.remove("active");
    
    // Filter and display products
    const filtered = vehicles.filter(v => v.category === category);
    
    if(filtered.length === 0) {
        document.querySelector(".products").innerHTML = `<h2 style="text-align:center; padding: 40px;">No products found in ${category}</h2>`;
        return;
    }
    
    let html = '';
    filtered.forEach((vehicle, index) => {
        const stockClass = vehicle.stock > 30
            ? "stock-high"
            : vehicle.stock > 15
                ? "stock-medium"
                : vehicle.stock > 5
                    ? "stock-low"
                    : "stock-critical";
        const stockText = vehicle.stock > 0 ? `${vehicle.stock} in stock` : "Out of stock";
        
        html += `
        <div class="card" style="opacity: 1;">
            <div class="card-image-wrapper">
                <img src="${vehicle.image}" alt="${vehicle.name}" onerror="this.src='${LOCAL_FALLBACK_IMAGE}'">
                <span class="stock-badge ${stockClass}">${stockText}</span>
            </div>
            <div class="card-content">
                <h3>${vehicle.name}</h3>
                <div class="card-rating">
                    <span class="stars">${'★'.repeat(Math.floor(vehicle.rating))}</span>
                    <span class="rating-value">${vehicle.rating}</span>
                </div>
                <p class="card-category">${vehicle.category}</p>
                <p class="card-price">KES ${vehicle.price.toLocaleString()}</p>
                <div class="card-actions">
                    <button class="home-add-btn" onclick="quickAddToCartAndOpenCart('${vehicle.name.replace(/'/g, "\\'")}',${vehicle.price},'${vehicle.image}', event)" ${vehicle.stock === 0 ? 'disabled' : ''}><i class="fas fa-plus"></i> Add</button>
                    <button class="wishlist-heart-btn ${isProductInWishlist(index) ? "liked" : ""}" data-product-id="${index}" onclick="toggleWishlistByProductId(${index}, event)" title="Like">❤️</button>
                </div>
            </div>
        </div>
        `;
    });
    
    const productContainer = document.querySelector(".products");
    if(productContainer) {
        productContainer.innerHTML = html;
        attachCardClicks();
        updateWishlistButtons();
    }
}

// Handle navigation link clicks
document.addEventListener("DOMContentLoaded", function(){
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", function(e){
            const href = this.getAttribute("href");
            const section = this.getAttribute("data-section");
            
            // Close mobile menu when clicking nav link
            const menu = document.getElementById("sideMenu");
            if(menu) menu.classList.remove("active");
        });
    });
});

// ================================
// CART SETUP
// ================================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let liked = JSON.parse(localStorage.getItem("liked")) || [];
const LOCAL_FALLBACK_IMAGE = "calxin.images/WhatsApp Image 2026-01-23 at 4.58.19 PM.jpeg";

// Show cart with edit functionality
function showCart() {
    // Navigate to cart page
    window.location.href = 'cart.html';
}

function updateQty(index, change) {
    const currentQty = cart[index].quantity || cart[index].qty || 1;
    const nextQty = currentQty + change;
    cart[index].quantity = nextQty;
    cart[index].qty = nextQty;
    if(nextQty <= 0) {
        removeFromCart(index);
    } else {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        showCart();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    if(cart.length === 0) {
        closeLightbox();
    } else {
        showCart();
    }
}

function checkout() {
    showSignIn();
}

function showSignIn() {
    const signInHTML = `
    <div class="signin-modal">
        <div class="signin-content">
            <span class="close" onclick="closeLightbox()">×</span>
            <h2>Sign In / Create Account</h2>
            <form onsubmit="saveUserInfo(event)">
                <div class="form-group">
                    <label>Email Address *</label>
                    <input type="email" id="userEmail" required>
                </div>
                <div class="form-group">
                    <label>Full Name *</label>
                    <input type="text" id="userName" required>
                </div>
                <div class="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" id="userPhone" required>
                </div>
                <div class="form-group">
                    <label>Delivery Address *</label>
                    <textarea id="userAddress" rows="3" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Save & Continue</button>
            </form>
        </div>
    </div>
    `;
    showLightbox(signInHTML);
}

function saveUserInfo(event) {
    event.preventDefault();
    const user = {
        email: document.getElementById("userEmail").value,
        name: document.getElementById("userName").value,
        phone: document.getElementById("userPhone").value,
        address: document.getElementById("userAddress").value
    };
    localStorage.setItem("userInfo", JSON.stringify(user));
    closeLightbox();
}

function showLightbox(content) {
    let lightbox = document.getElementById("lightbox");
    if(!lightbox) {
        lightbox = document.createElement("div");
        lightbox.id = "lightbox";
        lightbox.className = "lightbox";
        lightbox.onclick = function(e) {
            if(e.target === lightbox) closeLightbox();
        };
        document.body.appendChild(lightbox);
    }
    lightbox.innerHTML = content;
    lightbox.style.display = "flex";
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if(lightbox) lightbox.style.display = "none";
}

// Toggle like button
function toggleLike() {
    const modalName = document.getElementById("modalName").innerText;
    const likeButton = document.getElementById("likeButton");
    
    if(liked.includes(modalName)) {
        liked = liked.filter(name => name !== modalName);
        likeButton.style.background = "#f0f0f0";
        likeButton.innerHTML = '<i class="fas fa-heart"></i> Like';
    } else {
        liked.push(modalName);
        likeButton.style.background = "#ff6b6b";
        likeButton.style.color = "white";
        likeButton.innerHTML = '<i class="fas fa-heart"></i> Liked';
    }
    
    localStorage.setItem("liked", JSON.stringify(liked));
}

// Add to liked/favorites
function addToLiked(name, image, price) {
    const found = liked.find(item => item.name === name);
    if(found) {
        liked = liked.filter(item => item.name !== name);
        showToastNotification(`${name} removed from favorites`);
    } else {
        liked.push({ name, image, price });
        showToastNotification(`${name} added to favorites`);
    }
    localStorage.setItem("liked", JSON.stringify(liked));
}

function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist") || "[]");
}

function isProductInWishlist(productId) {
    return getWishlist().some(item => Number(item.id) === Number(productId));
}

function toggleWishlistByProductId(productId, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const vehicle = vehicles[Number(productId)];
    if (!vehicle) return;

    let wishlist = getWishlist();
    const exists = wishlist.some(item => Number(item.id) === Number(productId));

    if (exists) {
        wishlist = wishlist.filter(item => Number(item.id) !== Number(productId));
        showToastNotification(`${vehicle.name} removed from wishlist`);
    } else {
        wishlist.push({
            id: Number(productId),
            name: vehicle.name,
            image: vehicle.image,
            price: vehicle.price,
            category: vehicle.category,
            rating: vehicle.rating,
            stock: vehicle.stock
        });
        showToastNotification(`${vehicle.name} added to wishlist`);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistButtons();
}

function updateWishlistButtons() {
    const wishlist = getWishlist();
    document.querySelectorAll(".wishlist-heart-btn").forEach((btn) => {
        const productId = Number(btn.getAttribute("data-product-id"));
        const likedNow = wishlist.some(item => Number(item.id) === productId);
        btn.classList.toggle("liked", likedNow);
        btn.setAttribute("aria-label", likedNow ? "Remove from wishlist" : "Add to wishlist");
        btn.textContent = likedNow ? "❤️" : "🤍";
    });
}

// Add to cart
function addToCart(name, price, image) {
    const productId = vehicles.findIndex(v => v.name === name && v.price === price);
    const found = cart.find(item => item.name === name);
    if (found) {
        found.quantity = (found.quantity || found.qty || 1) + 1;
        found.qty = found.quantity;
        if ((found.productId === undefined || found.productId === null) && productId >= 0) {
            found.productId = productId;
        }
    } else {
        cart.push({ name, price, image, quantity: 1, qty: 1, productId: productId >= 0 ? productId : 0 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    
    // Show a nice toast notification
    showToastNotification(`${name} added to cart`);
}

function quickAddToCartAndOpenCart(name, price, image, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    addToCart(name, price, image);
    window.location.href = "cart.html";
}

// Toast notification function
function showToastNotification(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00a8e8, #0077be);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 122, 190, 0.4);
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    toast.innerText = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInLeft 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Open modal when image clicked
function openModal(vehicle){
    document.getElementById("modalImage").src = vehicle.image;
    document.getElementById("modalName").innerText = vehicle.name;
    
    const priceHTML = `
        <div style="display: flex; justify-content: space-around; margin-top: 10px; font-size: 0.9rem; color: #666;">
            <span><strong>Price:</strong> KES ${vehicle.price.toLocaleString()}</span>
            <span><strong>Category:</strong> ${vehicle.category}</span>
            <span><strong>Rating:</strong> ⭐ ${vehicle.rating}</span>
            <span><strong>Stock:</strong> ${vehicle.stock > 0 ? `${vehicle.stock} in stock` : 'Out of stock'}</span>
        </div>
    `;
    
    document.getElementById("modalPrice").innerHTML = "KES " + vehicle.price.toLocaleString() + priceHTML;

    const btn = document.getElementById("modalAddToCart");
    btn.onclick = function(){
        quickAddToCartAndOpenCart(vehicle.name, vehicle.price, vehicle.image);
    };
    
    if(vehicle.stock === 0) {
        btn.disabled = true;
        btn.textContent = "Out of Stock";
    } else {
        btn.disabled = false;
        btn.textContent = "Add to Cart";
    }

    // Update like button state
    const likeButton = document.getElementById("likeButton");
    if(liked.includes(vehicle.name)) {
        likeButton.style.background = "#ff6b6b";
        likeButton.style.color = "white";
        likeButton.innerHTML = '<i class="fas fa-heart"></i> Liked';
    } else {
        likeButton.style.background = "#f0f0f0";
        likeButton.style.color = "inherit";
        likeButton.innerHTML = '<i class="fas fa-heart"></i> Like';
    }

    const modal = document.getElementById("productModal");
    modal.style.display = "block";
    
    // Reset modal position
    const modalContent = document.querySelector(".modal-content");
    modalContent.style.left = "0";
    modalContent.style.top = "0";
}

// Close modal
function closeModal(){
    document.getElementById("productModal").style.display = "none";
}

// Make modal draggable
function makeDraggable() {
    const modal = document.getElementById("productModal");
    const modalContent = document.querySelector(".modal-content");
    
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    // Check if modal exists
    if (!modalContent) return;
    
    // Add drag handle to modal content header (close button area)
    const closeBtn = modalContent.querySelector(".close");
    if (closeBtn) {
        closeBtn.style.cursor = "move";
        closeBtn.onmousedown = dragMouseDown;
    }
    
    // Also make the h3 draggable
    const h3 = modalContent.querySelector("h3");
    if (h3) {
        h3.style.cursor = "move";
        h3.onmousedown = dragMouseDown;
    }
    
    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        let newTop = modalContent.offsetTop - pos2;
        let newLeft = modalContent.offsetLeft - pos1;
        
        // Keep modal within viewport
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - modalContent.offsetHeight));
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - modalContent.offsetWidth));
        
        modalContent.style.top = newTop + "px";
        modalContent.style.left = newLeft + "px";
        modalContent.style.margin = "0";
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Attach click events to all cards
function attachCardClicks(){
    const cards = document.querySelectorAll(".products .card");
    cards.forEach((card) => {
        card.style.cursor = "pointer";
        card.onclick = (event) => {
            if (event.target.closest("button, a")) {
                return;
            }
            const nameElem = card.querySelector("h3");
            const priceElem = card.querySelector(".card-price");
            const imageElem = card.querySelector("img");
            if (!nameElem || !priceElem || !imageElem) return;
            const name = nameElem.textContent.trim();
            const price = Number(priceElem.textContent.replace(/[^\d]/g, ""));
            const image = imageElem.getAttribute("src") || "";
            if (!name || !price) return;
            addToCart(name, price, image);
            window.location.href = "cart.html";
        };
    });
}

// Close modal when clicking outside
window.addEventListener("click", function(event) {
    const modal = document.getElementById("productModal");
    const modalContent = document.querySelector(".modal-content");
    if (event.target === modal) {
        closeModal();
    }
});

// Call attachCardClicks after cards are generated
document.addEventListener("DOMContentLoaded", function(){
    attachCardClicks();
});

// Update cart count in header
function updateCartCount() {
    const count = cart.reduce((total, item) => total + (item.quantity || item.qty || 0), 0);
    const cartCountElem = document.getElementById("cart-count");
    if(cartCountElem) {
        cartCountElem.innerText = count;
        // Add pop animation
        cartCountElem.style.animation = 'none';
        setTimeout(() => {
            cartCountElem.style.animation = 'pop 0.3s ease';
        }, 10);
    }
}

// Add cart icon click functionality
document.addEventListener("DOMContentLoaded", function(){
    const cartIcon = document.querySelector(".cart-icon");
    if(cartIcon) {
        cartIcon.style.cursor = "pointer";
        cartIcon.addEventListener("click", function(){
            if(cart.length === 0) {
                showToastNotification("Your cart is empty. Start adding products.");
            } else {
                let cartSummary = "YOUR CART:\n\n";
                let total = 0;
                cart.forEach((item, index) => {
                    const itemQty = item.quantity || item.qty || 1;
                    cartSummary += `${index + 1}. ${item.name}\n   KES ${item.price.toLocaleString()} x ${itemQty} = KES ${(item.price * itemQty).toLocaleString()}\n\n`;
                    total += item.price * itemQty;
                });
                cartSummary += `---\nTOTAL: KES ${total.toLocaleString()}`;
            }
        });
    }
});

// ================================
// SIDE MENU TOGGLE
// ================================
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    const header = document.querySelector(".header");
    if(menu) {
        menu.classList.toggle("active");
        if (header) {
            header.classList.toggle("menu-open");
        }
    }
}

// Close menu when clicking outside
document.addEventListener("click", function(e){
    const menu = document.getElementById("sideMenu");
    const burger = document.querySelector(".hamburger");
    const header = document.querySelector(".header");
    if(menu && burger && !menu.contains(e.target) && !burger.contains(e.target)){
        menu.classList.remove("active");
        if (header) {
            header.classList.remove("menu-open");
        }
    }
});

// Add click functionality to side menu categories
document.addEventListener("DOMContentLoaded", function(){
    const categoryItems = document.querySelectorAll("#categoryList > li");
    categoryItems.forEach(item => {
        if(item.textContent.trim() !== "" && item.tagName !== "HR") {
            item.addEventListener("click", function(){
                const category = this.textContent.trim();
                showToastNotification(`Filtering by: ${category}`);
                
                // Filter products by category
                filterProductsByCategory(category);
                document.getElementById("sideMenu").classList.remove("active");
            });
        }
    });
});

// Filter products by category
function filterProductsByCategory(category) {
    const cards = document.querySelectorAll(".products .card");
    cards.forEach((card) => {
        // For demo purposes, show/hide based on vehicle type
        card.style.animation = 'fadeIn 0.3s ease';
        card.style.display = "flex";
    });
}

// Close menu with ESC key
document.addEventListener("keydown", function(e){
    if(e.key === "Escape"){
        const menu = document.getElementById("sideMenu");
        if(menu) menu.classList.remove("active");
        closeModal();
    }
});

// ================================
// SPARE PARTS DATA
// ================================
const vehicles = [
    { name: "Engine Assembly Complete", price: 45000, category: "Engines", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.08 PM.jpeg", stock: 12, rating: 4.8 },
    { name: "Automatic Transmission", price: 38000, category: "Transmissions", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.09 PM.jpeg", stock: 8, rating: 4.7 },
    { name: "Brake Pads Set", price: 2500, category: "Brakes", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.16 PM.jpeg", stock: 45, rating: 4.9 },
    { name: "Brake Rotors Pair", price: 5800, category: "Brakes", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.18 PM.jpeg", stock: 32, rating: 4.6 },
    { name: "Car Battery 12V 100A", price: 8500, category: "Electrical", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.19 PM.jpeg", stock: 28, rating: 4.8 },
    { name: "Alternator Genuine", price: 12000, category: "Electrical", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.23 PM.jpeg", stock: 15, rating: 4.7 },
    { name: "Starter Motor", price: 9500, category: "Electrical", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.26 PM.jpeg", stock: 18, rating: 4.5 },
    { name: "Water Pump Assembly", price: 6800, category: "Cooling", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.27 PM.jpeg", stock: 22, rating: 4.6 },
    { name: "Radiator Complete", price: 11500, category: "Cooling", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.30 PM.jpeg", stock: 14, rating: 4.7 },
    { name: "Thermostat Housing", price: 3200, category: "Cooling", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.31 PM.jpeg", stock: 35, rating: 4.8 },
    { name: "Air Filter Kit", price: 1500, category: "Filters", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.34 PM.jpeg", stock: 50, rating: 4.9 },
    { name: "Oil Filter", price: 800, category: "Filters", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.35 PM.jpeg", stock: 60, rating: 5.0 },
    { name: "Cabin Air Filter", price: 1200, category: "Filters", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.37 PM.jpeg", stock: 40, rating: 4.7 },
    { name: "Spark Plug Set (4 pcs)", price: 2800, category: "Ignition", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.39 PM.jpeg", stock: 48, rating: 4.8 },
    { name: "Coil Pack", price: 4500, category: "Ignition", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.40 PM.jpeg", stock: 20, rating: 4.6 },
    { name: "Fuel Pump", price: 7800, category: "Fuel System", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.42 PM.jpeg", stock: 16, rating: 4.7 },
    { name: "Fuel Filter", price: 1800, category: "Fuel System", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.44 PM.jpeg", stock: 42, rating: 4.9 },
    { name: "Fuel Injector Set", price: 6200, category: "Fuel System", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.45 PM.jpeg", stock: 12, rating: 4.8 },
    { name: "Suspension Springs Pair", price: 8900, category: "Suspension", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.46 PM.jpeg", stock: 18, rating: 4.6 },
    { name: "Shock Absorbers Pair", price: 7500, category: "Suspension", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.47 PM.jpeg", stock: 25, rating: 4.7 },
    { name: "Stabilizer Link Kit", price: 3200, category: "Suspension", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.49 PM.jpeg", stock: 36, rating: 4.8 },
    { name: "Steering Rack Assembly", price: 15000, category: "Steering", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.50 PM.jpeg", stock: 8, rating: 4.5 },
    { name: "Tie Rod Ends Pair", price: 2800, category: "Steering", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.53 PM.jpeg", stock: 44, rating: 4.9 },
    { name: "Tyre 175/65 R14", price: 4500, category: "Tyres", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.55 PM.jpeg", stock: 38, rating: 4.8 },
    { name: "Tyre 195/55 R15", price: 5200, category: "Tyres", image: "calxin.images/WhatsApp Image 2026-01-23 at 4.58.59 PM.jpeg", stock: 32, rating: 4.7 },
    { name: "Alloy Wheel 16-inch", price: 9500, category: "Wheels", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.00 PM.jpeg", stock: 16, rating: 4.8 },
    { name: "Car Wax Premium", price: 950, category: "Accessories", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.01 PM.jpeg", stock: 55, rating: 4.9 },
    { name: "Floor Mats Set", price: 1800, category: "Accessories", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.03 PM.jpeg", stock: 42, rating: 4.7 },
    { name: "Seat Covers Premium", price: 5500, category: "Accessories", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.05 PM.jpeg", stock: 24, rating: 4.8 },
    { name: "Roof Rack Bars", price: 3800, category: "Accessories", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.06 PM.jpeg", stock: 20, rating: 4.6 },
    { name: "Car Stereo System", price: 12500, category: "Audio", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.08 PM.jpeg", stock: 11, rating: 4.7 },
    { name: "Reverse Camera Kit", price: 4200, category: "Audio", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.09 PM.jpeg", stock: 28, rating: 4.8 },
    { name: "LED Headlights Pair", price: 8800, category: "Lighting", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.11 PM.jpeg", stock: 17, rating: 4.9 },
    { name: "Tail Light Assembly", price: 3500, category: "Lighting", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.12 PM.jpeg", stock: 31, rating: 4.8 },
    { name: "Windshield Wiper Blades", price: 1200, category: "Accessories", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.14 PM.jpeg", stock: 48, rating: 4.9 },
    { name: "Car Door Lock Actuator", position: "Front Left", price: 2800, category: "Electrical", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.15 PM.jpeg", stock: 19, rating: 4.6 },
    { name: "Window Regulator Motor", price: 3200, category: "Electrical", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.01.14 PM.jpeg", stock: 22, rating: 4.7 },
    { name: "HVAC Compressor", price: 14500, category: "HVAC", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.18 PM.jpeg", stock: 9, rating: 4.8 },
    { name: "Cabin Air Vents", price: 1500, category: "HVAC", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.20 PM.jpeg", stock: 36, rating: 4.7 },
    { name: "Engine Oil 5L Synthetic", price: 2500, category: "Oils & Fluids", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.22 PM.jpeg", stock: 58, rating: 4.9 },
    { name: "Coolant Concentrate 1L", price: 950, category: "Oils & Fluids", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.24 PM.jpeg", stock: 62, rating: 4.8 },
    { name: "Brake Fluid 500ml", price: 650, category: "Oils & Fluids", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.25 PM.jpeg", stock: 55, rating: 5.0 },
    { name: "Power Steering Fluid", price: 1100, category: "Oils & Fluids", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.27 PM.jpeg", stock: 48, rating: 4.9 },
    { name: "Transmission Fluid", price: 1800, category: "Oils & Fluids", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.30 PM.jpeg", stock: 40, rating: 4.8 },
    { name: "Jump Starter Pack", price: 3500, category: "Tools", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.31 PM.jpeg", stock: 26, rating: 4.8 },
    { name: "Tool Set Complete", price: 8200, category: "Tools", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.33 PM.jpeg", stock: 14, rating: 4.7 },
    { name: "Tire Repair Kit", price: 1200, category: "Tools", image: "calxin.images/WhatsApp Image 2026-01-23 at 5.00.35 PM.jpeg", stock: 52, rating: 4.9 },
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

function resolveVehicleImage(path, index) {
    const normalized = String(path || "").replace("images.Calxin/", "calxin.images/");
    const rawName = normalized.split("/").pop();
    if (normalized.startsWith("calxin.images/") && rawName && availableImageFiles.includes(rawName)) {
        return encodeURI(normalized);
    }
    if (rawName && availableImageFiles.includes(rawName)) {
        return encodeURI(`calxin.images/${rawName}`);
    }
    return encodeURI(`calxin.images/${availableImageFiles[index % availableImageFiles.length]}`);
}

vehicles.forEach((vehicle, index) => {
    vehicle.image = resolveVehicleImage(vehicle.image, index);
});

function mergeDuplicateVehiclesByImage() {
    const mergedMap = new Map();
    vehicles.forEach((vehicle) => {
        const imageKey = decodeURI(String(vehicle.image || "").trim());
        const existing = mergedMap.get(imageKey);
        if (!existing) {
            mergedMap.set(imageKey, { ...vehicle });
            return;
        }

        existing.stock = Number(existing.stock || 0) + Number(vehicle.stock || 0);
        if ((!existing.name || existing.name.startsWith("Auto Part Gallery")) && vehicle.name) {
            existing.name = vehicle.name;
        }
        if ((!existing.category || existing.category === "Accessories") && vehicle.category) {
            existing.category = vehicle.category;
        }
        if (Number(vehicle.rating || 0) > Number(existing.rating || 0)) {
            existing.rating = vehicle.rating;
        }
        if (Number(vehicle.price || 0) > 0 && Number(existing.price || 0) === 0) {
            existing.price = vehicle.price;
        }
    });

    vehicles.length = 0;
    Array.from(mergedMap.values()).forEach((item) => vehicles.push(item));
}

mergeDuplicateVehiclesByImage();

function extendVehiclesWithGalleryImages() {
    const usedImages = new Set(
        vehicles.map(item => decodeURI(String(item.image || "").split("/").pop() || ""))
    );
    const categories = ["Accessories", "Electrical", "Cooling", "Tools", "Filters"];
    let nextIndex = 1;

    availableImageFiles.forEach((fileName) => {
        if (usedImages.has(fileName)) return;
        vehicles.push({
            name: `Auto Part Gallery ${nextIndex}`,
            price: 1200 + (nextIndex * 250),
            category: categories[nextIndex % categories.length],
            image: resolveVehicleImage(`calxin.images/${fileName}`, nextIndex),
            stock: 10 + (nextIndex % 20),
            rating: 4.5
        });
        nextIndex += 1;
    });
}

extendVehiclesWithGalleryImages();

function normalizeVehiclePrices() {
    vehicles.forEach((vehicle) => {
        const basePrice = Number(vehicle.price) || 0;
        const scaledPrice = Math.round((basePrice * 0.18) / 50) * 50;
        vehicle.price = Math.max(350, Math.min(8500, scaledPrice));
    });
}

normalizeVehiclePrices();

// ================================
// INITIALIZATION
// ================================
document.addEventListener("DOMContentLoaded", function(){
    // Update cart count
    updateCartCount();

    // Toggle menu functionality
    function toggleMenu() {
        const sideMenu = document.getElementById("sideMenu");
        const header = document.querySelector(".header");
        if (sideMenu && header) {
            sideMenu.classList.toggle("active");
            header.classList.toggle("menu-open");
        }
    }

    // Expose toggleMenu globally
    window.toggleMenu = toggleMenu;

    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll(".side-menu .nav-menu a");
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            const sideMenu = document.getElementById("sideMenu");
            const header = document.querySelector(".header");
            if (sideMenu && header) {
                sideMenu.classList.remove("active");
                header.classList.remove("menu-open");
            }
        });
    });

    // Make spare parts links in hamburger menu functional
    const sparePartItems = document.querySelectorAll(".spare-parts-menu li");
    const categoryMap = {
        "Engine Parts": "Engines",
        "Brake System": "Brakes",
        "Suspension": "Suspension",
        "Tires & Wheels": "Tyres",
        "Electrical": "Electrical",
        "Cooling System": "Cooling",
        "Transmission": "Transmissions",
        "Interior Trim": "Accessories",
        "Audio & Navigation": "Audio",
        "Lights": "Lighting",
        "Paint & Body": "Accessories",
        "Performance Parts": "Tools"
    };

    sparePartItems.forEach(item => {
        item.style.cursor = "pointer";
        item.addEventListener("click", function() {
            const label = item.textContent.trim();
            const matchedCategory = categoryMap[label];
            if (matchedCategory) {
                filterByCategory(matchedCategory);
            }
            const sideMenu = document.getElementById("sideMenu");
            const header = document.querySelector(".header");
            if (sideMenu && header) {
                sideMenu.classList.remove("active");
                header.classList.remove("menu-open");
            }
        });
    });

    // Close menu when clicking outside of it
    document.addEventListener("click", function(event) {
        const sideMenu = document.getElementById("sideMenu");
        const hamburger = document.querySelector(".hamburger");
        const header = document.querySelector(".header");
        
        if (sideMenu && hamburger && header) {
            if (!sideMenu.contains(event.target) && !hamburger.contains(event.target)) {
                if (sideMenu.classList.contains("active")) {
                    sideMenu.classList.remove("active");
                    header.classList.remove("menu-open");
                }
            }
        }
    });

    // Populate categories dynamically
    const categories = ["SUVs", "Sedans", "Sports", "Trucks", "Vans", "Hatchbacks"];
    const categoryList = document.getElementById("categoryList");
    if(categoryList) {
        categories.forEach((cat, index) => {
            const li = document.createElement("li");
            li.textContent = cat;
            li.style.opacity = "1";
            li.style.cursor = "pointer";
            li.onclick = function() {
                // Close side menu when category is clicked
                const sideMenu = document.getElementById("sideMenu");
                const header = document.querySelector(".header");
                if(sideMenu && header) {
                    sideMenu.classList.remove("active");
                    header.classList.remove("menu-open");
                }
                // Call loadGallery with category filter from home-gallery.js
                if(window.filterByCategory) {
                    window.currentFilter = cat;
                    window.loadGallery();
                }
            };
            categoryList.appendChild(li);
            if(index !== categories.length - 1){
                const hr = document.createElement("hr");
                hr.style.border = "0.5px solid rgba(255,255,255,0.3)";
                categoryList.appendChild(hr);
            }
        });
    }

    // Generate all vehicle cards dynamically
    const productsContainer = document.querySelector(".products");
    if(productsContainer){
        productsContainer.innerHTML = ""; // clear any existing HTML
        vehicles.forEach((vehicle, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.style.opacity = "1";

            // Create stock status badge
            const stockClass = vehicle.stock > 30
                ? "stock-high"
                : vehicle.stock > 15
                    ? "stock-medium"
                    : vehicle.stock > 5
                        ? "stock-low"
                        : "stock-critical";
            const stockText = vehicle.stock > 0 ? `${vehicle.stock} in stock` : "Out of stock";

            card.style.cursor = "pointer";
            card.innerHTML = `
                <div class="card-image-wrapper">
                    <img src="${vehicle.image}" alt="${vehicle.name}" onerror="this.src='${LOCAL_FALLBACK_IMAGE}'">
                    <span class="stock-badge ${stockClass}">${stockText}</span>
                </div>
                <div class="card-content">
                    <h3>${vehicle.name}</h3>
                    <div class="card-rating">
                        <span class="stars">${'★'.repeat(Math.floor(vehicle.rating))}</span>
                        <span class="rating-value">${vehicle.rating}</span>
                    </div>
                    <p class="card-category">${vehicle.category}</p>
                    <p class="card-price">KES ${vehicle.price.toLocaleString()}</p>
                    <div class="card-actions">
                        <button class="home-add-btn" onclick="quickAddToCartAndOpenCart('${vehicle.name.replace(/'/g, "\\'")}',${vehicle.price},'${vehicle.image}', event)" ${vehicle.stock === 0 ? 'disabled' : ''}><i class="fas fa-plus"></i> Add</button>
                        <button class="wishlist-heart-btn ${isProductInWishlist(index) ? "liked" : ""}" data-product-id="${index}" onclick="toggleWishlistByProductId(${index}, event)" title="Like">❤️</button>
                    </div>
                </div>
            `;
            productsContainer.appendChild(card);
        });
        
        // Attach click events after all cards are created
        attachCardClicks();
        updateWishlistButtons();
    }

    // Search functionality with smooth filtering
    const searchInput = document.getElementById("searchInput");
    if(searchInput){
        searchInput.addEventListener("input", function(){
            const text = searchInput.value.toLowerCase();
            const cards = document.querySelectorAll(".products .card");
            let visibleCount = 0;
            
            cards.forEach(card => {
                const name = card.querySelector("h3").textContent.toLowerCase();
                const category = card.querySelector(".card-category").textContent.toLowerCase();
                const price = card.querySelector(".card-price").textContent.toLowerCase();
                
                if (name.includes(text) || category.includes(text) || price.includes(text)) {
                    card.style.display = "flex";
                    card.style.animation = "fadeIn 0.3s ease";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });
            
            if (visibleCount === 0 && text.length > 0) {
                showToastNotification("No spare parts found matching your search");
            }
        });
    }
});

// View product details in modal
function viewProductDetails(index) {
    const vehicle = vehicles[index];
    const modal = `
        <div class="product-modal">
            <div class="product-modal-content">
                <span class="close" onclick="closeProductModal()">&times;</span>
                <div class="product-modal-body">
                    <div class="product-modal-image">
                        <img src="${vehicle.image}" alt="${vehicle.name}" onerror="this.src='${LOCAL_FALLBACK_IMAGE}'">
                    </div>
                    <div class="product-modal-details">
                        <h2>${vehicle.name}</h2>
                        <p class="product-modal-category">Category: ${vehicle.category}</p>
                        <div class="product-modal-rating">
                            <span class="stars">${'★'.repeat(Math.floor(vehicle.rating))}</span>
                            <span>${vehicle.rating}/5</span>
                        </div>
                        <p class="product-modal-price">KES ${vehicle.price.toLocaleString()}</p>
                        <p class="product-modal-stock">${vehicle.stock > 0 ? `${vehicle.stock} in stock` : 'Out of stock'}</p>
                        <div class="product-modal-actions">
                            <button class="btn-primary" onclick="quickAddToCartAndOpenCart('${vehicle.name.replace(/'/g, "\\'")}',${vehicle.price},'${vehicle.image}', event);" ${vehicle.stock === 0 ? 'disabled' : ''}>
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                            <a href="product-view.html?id=${index}" class="btn-secondary">
                                <i class="fas fa-eye"></i> View Details
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    showLightbox(modal);
}

function closeProductModal() {
    closeLightbox();
}

