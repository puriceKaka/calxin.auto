// Toggle order fields based on message type selection
function toggleOrderFields() {
    const messageType = document.getElementById('messageType').value;
    const orderFields = document.getElementById('orderFields');
    
    if (messageType === 'order') {
        orderFields.style.display = 'block';
    } else {
        orderFields.style.display = 'none';
    }
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                messageType: document.getElementById('messageType').value,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
            
            // If order, include order details
            if (formData.messageType === 'order') {
                formData.vehicleType = document.getElementById('vehicleType').value;
                formData.spareParts = Array.from(document.getElementById('spareParts').selectedOptions).map(o => o.value);
                formData.budget = document.getElementById('budget').value;
            }
            
            // Log form data (in production, send to server)
            console.log('Form Submitted:', formData);
            
            // Show success message
            const messageDiv = document.querySelector('.form-message');
            if (messageDiv) {
                messageDiv.classList.remove('error');
                messageDiv.classList.add('success');
                messageDiv.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                messageDiv.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                document.getElementById('orderFields').style.display = 'none';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
            }
        });
    }
});

// Close hamburger menu when clicking on a link
function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const header = document.querySelector('.header');
    
    if (sideMenu) {
        sideMenu.classList.toggle('active');
        header.classList.toggle('menu-open');
    }
}

// Close menu when clicking on a menu item
const menuItems = document.querySelectorAll('.side-menu ul li');
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        const sideMenu = document.getElementById('sideMenu');
        const header = document.querySelector('.header');
        if (sideMenu) {
            sideMenu.classList.remove('active');
            header.classList.remove('menu-open');
        }
    });
});
