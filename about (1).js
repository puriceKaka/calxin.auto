// ================================
// NAVIGATION & GLOBAL FUNCTIONS
// ================================
function navigateTo(page) {
    if(page === 'home') {
        window.location.href = 'project.html';
    } else if(page === 'about') {
        window.location.href = 'About (2).html';
    } else if(page === 'contact') {
        window.location.href = 'Contact (1).html';
    } else if(page === 'admin') {
        window.location.href = 'admin.html';
    }
}

function showSignIn() {
    alert('Sign In functionality - Redirect to project.html for full implementation');
}

function showCart() {
    alert('Cart functionality - Redirect to project.html for full implementation');
}

// ================================
// CART SETUP (Load from localStorage)
// ================================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentSlide = 0;

// Update cart count in header
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.qty, 0);
    const cartCountElem = document.getElementById("cart-count");
    if(cartCountElem) cartCountElem.innerText = count;
}

// ================================
// SLIDER FUNCTIONALITY
// ================================
function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    if(slides.length === 0) return;
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Calculate next slide
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
}

// Auto-rotate slides every 5 seconds
function autoSlide() {
    const slides = document.querySelectorAll('.slide');
    if(slides.length > 0) {
        changeSlide(1);
    }
}

// Add cart icon click functionality
document.addEventListener("DOMContentLoaded", function(){
    updateCartCount();
    
    // Initialize slider
    const slides = document.querySelectorAll('.slide');
    if(slides.length > 0) {
        slides[0].classList.add('active');
        setInterval(autoSlide, 5000); // Auto-rotate every 5 seconds
    }
    
    const cartIcon = document.querySelector(".cart-icon");
    if(cartIcon) {
        cartIcon.style.cursor = "pointer";
        cartIcon.addEventListener("click", function(){
            if(cart.length === 0) {
                alert("Your cart is empty. Start adding vehicles!");
            } else {
                let cartSummary = "🛒 YOUR CART:\n\n";
                let total = 0;
                cart.forEach((item, index) => {
                    cartSummary += `${index + 1}. ${item.name}\n   KES ${item.price.toLocaleString()} x ${item.qty} = KES ${(item.price * item.qty).toLocaleString()}\n\n`;
                    total += item.price * item.qty;
                });
                cartSummary += `---\nTOTAL: KES ${total.toLocaleString()}`;
                alert(cartSummary);
            }
        });
    }
});

// ================================
// HAMBURGER MENU
// ================================
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    if(menu) menu.classList.toggle("active");
}

// Close menu when clicking outside
document.addEventListener("click", function(e){
    const menu = document.getElementById("sideMenu");
    const burger = document.querySelector(".hamburger");
    if(menu && burger && !menu.contains(e.target) && !burger.contains(e.target)){
        menu.classList.remove("active");
    }
});

// Close menu with ESC key
document.addEventListener("keydown", function(e){
    if(e.key === "Escape"){
        const menu = document.getElementById("sideMenu");
        if(menu) menu.classList.remove("active");
    }
});

// Add click functionality to side menu categories
document.addEventListener("DOMContentLoaded", function(){
    const categoryItems = document.querySelectorAll(".side-menu ul li");
    categoryItems.forEach(item => {
        if(item.textContent.trim() !== "") { // Skip empty items
            item.addEventListener("click", function(){
                const category = this.textContent.trim();
                alert(`Filtering by: ${category}`);
                document.getElementById("sideMenu").classList.remove("active");
            });
        }
    });

    // Populate categories dynamically
    const categories = ["Tyres", "Engines", "Brakes", "Electrical", "Accessories"];
    const categoryList = document.getElementById("categoryList");
    if(categoryList) {
        categories.forEach((cat, index) => {
            const li = document.createElement("li");
            li.textContent = cat;
            li.addEventListener("click", function(){
                alert(`Filtering by: ${cat}`);
                document.getElementById("sideMenu").classList.remove("active");
            });
            categoryList.appendChild(li);
            if(index !== categories.length - 1){
                const hr = document.createElement("hr");
                hr.style.border = "0.5px solid #fff";
                categoryList.appendChild(hr);
            }
        });
    }
});

// ================================
// SMOOTH SCROLL & NAVIGATION
// ================================
document.addEventListener("DOMContentLoaded", function(){
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
