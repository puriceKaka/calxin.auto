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

// Update cart count in header
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.qty, 0);
    const cartCountElem = document.getElementById("cart-count");
    if(cartCountElem) cartCountElem.innerText = count;
}

// Add cart icon click functionality
document.addEventListener("DOMContentLoaded", function(){
    updateCartCount();
    
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
// CONTACT FORM FUNCTIONALITY
// ================================
function toggleOrderFields() {
    const messageType = document.getElementById("messageType").value;
    const orderFields = document.getElementById("orderFields");
    const subjectGroup = document.getElementById("subjectGroup");
    const messageGroup = document.getElementById("messageGroup");
    
    if(messageType === "order") {
        orderFields.style.display = "block";
        subjectGroup.style.display = "none";
        messageGroup.style.display = "none";
    } else {
        orderFields.style.display = "none";
        subjectGroup.style.display = "block";
        messageGroup.style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", function(){
    const contactForm = document.getElementById("contactForm");
    if(contactForm) {
        contactForm.addEventListener("submit", function(e){
            e.preventDefault();
            
            const messageType = document.getElementById("messageType").value;
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            
            // Simple validation
            if(!name || !email || !phone || !messageType) {
                showFormMessage("Please fill in all required fields!", "error");
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)) {
                showFormMessage("Please enter a valid email address!", "error");
                return;
            }
            
            // Handle Order Submission
            if(messageType === "order") {
                const vehicleType = document.getElementById("vehicleType").value;
                const quantity = document.getElementById("quantity").value;
                const budget = document.getElementById("budget").value;
                const deliveryDate = document.getElementById("deliveryDate").value;
                const features = document.getElementById("features").value;
                
                if(!vehicleType || !quantity || !budget) {
                    showFormMessage("Please fill in vehicle type, quantity, and budget!", "error");
                    return;
                }
                
                showFormMessage("🎉 Order placed successfully! Our team will contact you within 24 hours to confirm your order.", "success");
                
                console.log({
                    type: "ORDER",
                    name: name,
                    email: email,
                    phone: phone,
                    vehicleType: vehicleType,
                    quantity: quantity,
                    budget: budget,
                    deliveryDate: deliveryDate,
                    features: features
                });
            } else {
                // Handle Regular Message
                const subject = document.getElementById("subject").value;
                const message = document.getElementById("message").value;
                
                if(!subject || !message) {
                    showFormMessage("Please fill in all required fields!", "error");
                    return;
                }
                
                showFormMessage("✅ Thank you for your message! We'll get back to you shortly.", "success");
                
                console.log({
                    type: "MESSAGE",
                    name: name,
                    email: email,
                    phone: phone,
                    subject: subject,
                    message: message
                });
            }
            
            contactForm.reset();
            document.getElementById("orderFields").style.display = "none";
            document.getElementById("subjectGroup").style.display = "block";
            document.getElementById("messageGroup").style.display = "block";
        });
    }
});

function showFormMessage(message, type) {
    const messageDiv = document.getElementById("formMessage");
    if(messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
        
        // Auto-hide success message after 3 seconds
        if(type === "success") {
            setTimeout(() => {
                messageDiv.style.display = "none";
            }, 3000);
        }
    }
}

// ================================
// FAQ TOGGLE FUNCTIONALITY
// ================================
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector(".faq-answer");
    
    // Close all other FAQs
    document.querySelectorAll(".faq-item").forEach(item => {
        if(item !== faqItem) {
            item.classList.remove("open");
            item.querySelector(".faq-answer").classList.remove("open");
        }
    });
    
    // Toggle current FAQ
    faqItem.classList.toggle("open");
    answer.classList.toggle("open");
}
