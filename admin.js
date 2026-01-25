// ================================
// ADMIN PANEL JAVASCRIPT
// ================================

let products = JSON.parse(localStorage.getItem("adminProducts")) || [];
let posts = JSON.parse(localStorage.getItem("adminPosts")) || [];
let images = JSON.parse(localStorage.getItem("adminImages")) || [];
let editingId = null;
let editingType = null;

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    loadDashboard();
    populateCategories();
    loadProductsTable();
    loadPostsTable();
    loadImagesGallery();
});

// ================================
// SECTION NAVIGATION
// ================================
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add("active");
    
    // Update nav items
    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });
    event.target.closest(".nav-item").classList.add("active");
    
    // Reload data for the section
    if(sectionId === "dashboard") {
        loadDashboard();
    } else if(sectionId === "products") {
        loadProductsTable();
    } else if(sectionId === "posts") {
        loadPostsTable();
    } else if(sectionId === "images") {
        loadImagesGallery();
    }
}

// ================================
// DASHBOARD
// ================================
function loadDashboard() {
    document.getElementById("totalProducts").textContent = products.length;
    document.getElementById("totalPosts").textContent = posts.length;
    document.getElementById("totalImages").textContent = images.length;
}

// ================================
// CATEGORIES
// ================================
function populateCategories() {
    const categories = ["Engines", "Transmissions", "Brakes", "Electrical", "Cooling", "Filters", "Ignition", "Fuel System", "Suspension", "Steering", "Tyres", "Wheels", "Accessories", "Audio", "Lighting", "HVAC", "Oils & Fluids", "Tools"];
    
    const select = document.getElementById("productCategory");
    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });
}

// ================================
// PRODUCTS MANAGEMENT
// ================================
function showAddProductForm() {
    editingId = null;
    editingType = null;
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productCategory").value = "";
    document.getElementById("productStock").value = "";
    document.getElementById("productImage").value = "";
    document.getElementById("productDescription").value = "";
    document.getElementById("productRating").value = "";
    document.getElementById("productForm").style.display = "block";
}

function hideAddProductForm() {
    document.getElementById("productForm").style.display = "none";
}

function saveProduct(event) {
    event.preventDefault();
    
    const product = {
        id: editingId || Date.now(),
        name: document.getElementById("productName").value,
        price: parseInt(document.getElementById("productPrice").value),
        category: document.getElementById("productCategory").value,
        stock: parseInt(document.getElementById("productStock").value),
        image: document.getElementById("productImage").value,
        description: document.getElementById("productDescription").value,
        rating: parseFloat(document.getElementById("productRating").value) || 4.5
    };
    
    if(editingId) {
        // Update existing product
        const index = products.findIndex(p => p.id === editingId);
        if(index !== -1) {
            products[index] = product;
        }
    } else {
        // Add new product
        products.push(product);
    }
    
    localStorage.setItem("adminProducts", JSON.stringify(products));
    hideAddProductForm();
    loadProductsTable();
    loadDashboard();
    alert("Product saved successfully!");
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if(product) {
        editingId = id;
        document.getElementById("productName").value = product.name;
        document.getElementById("productPrice").value = product.price;
        document.getElementById("productCategory").value = product.category;
        document.getElementById("productStock").value = product.stock;
        document.getElementById("productImage").value = product.image;
        document.getElementById("productDescription").value = product.description || "";
        document.getElementById("productRating").value = product.rating;
        document.getElementById("productForm").style.display = "block";
    }
}

function deleteProduct(id) {
    if(confirm("Are you sure you want to delete this product?")) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem("adminProducts", JSON.stringify(products));
        loadProductsTable();
        loadDashboard();
        alert("Product deleted successfully!");
    }
}

function loadProductsTable() {
    const tbody = document.getElementById("productsTableBody");
    tbody.innerHTML = "";
    
    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>KES ${product.price.toLocaleString()}</td>
            <td>${product.stock}</td>
            <td>⭐ ${product.rating}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-edit" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ================================
// POSTS MANAGEMENT
// ================================
function showAddPostForm() {
    editingId = null;
    editingType = null;
    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";
    document.getElementById("postImage").value = "";
    document.getElementById("postForm").style.display = "block";
}

function hideAddPostForm() {
    document.getElementById("postForm").style.display = "none";
}

function savePost(event) {
    event.preventDefault();
    
    const post = {
        id: editingId || Date.now(),
        title: document.getElementById("postTitle").value,
        content: document.getElementById("postContent").value,
        image: document.getElementById("postImage").value,
        dateCreated: new Date().toLocaleDateString()
    };
    
    if(editingId) {
        // Update existing post
        const index = posts.findIndex(p => p.id === editingId);
        if(index !== -1) {
            posts[index] = post;
        }
    } else {
        // Add new post
        posts.push(post);
    }
    
    localStorage.setItem("adminPosts", JSON.stringify(posts));
    hideAddPostForm();
    loadPostsTable();
    loadDashboard();
    alert("Post saved successfully!");
}

function editPost(id) {
    const post = posts.find(p => p.id === id);
    if(post) {
        editingId = id;
        document.getElementById("postTitle").value = post.title;
        document.getElementById("postContent").value = post.content;
        document.getElementById("postImage").value = post.image;
        document.getElementById("postForm").style.display = "block";
    }
}

function deletePost(id) {
    if(confirm("Are you sure you want to delete this post?")) {
        posts = posts.filter(p => p.id !== id);
        localStorage.setItem("adminPosts", JSON.stringify(posts));
        loadPostsTable();
        loadDashboard();
        alert("Post deleted successfully!");
    }
}

function loadPostsTable() {
    const tbody = document.getElementById("postsTableBody");
    tbody.innerHTML = "";
    
    posts.forEach(post => {
        const preview = post.content.substring(0, 50) + "...";
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${post.title}</td>
            <td>${post.dateCreated}</td>
            <td>${preview}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-edit" onclick="editPost(${post.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ================================
// IMAGES MANAGEMENT
// ================================
function showUploadImageForm() {
    editingId = null;
    document.getElementById("imageName").value = "";
    document.getElementById("imageFile").value = "";
    document.getElementById("imageCategory").value = "product";
    document.getElementById("imagePreviewContainer").style.display = "none";
    document.getElementById("imageForm").style.display = "block";
}

function hideUploadImageForm() {
    document.getElementById("imageForm").style.display = "none";
}

// Add image preview when file is selected
document.addEventListener("DOMContentLoaded", function() {
    const imageFileInput = document.getElementById("imageFile");
    if(imageFileInput) {
        imageFileInput.addEventListener("change", function(e) {
            const file = e.target.files[0];
            if(file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    document.getElementById("imagePreview").src = event.target.result;
                    document.getElementById("imagePreviewContainer").style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

function saveImage(event) {
    event.preventDefault();
    
    const fileInput = document.getElementById("imageFile");
    const file = fileInput.files[0];
    
    if(!file) {
        alert("Please select an image file!");
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const image = {
            id: editingId || Date.now(),
            name: document.getElementById("imageName").value,
            data: e.target.result,  // Base64 encoded image data
            type: file.type,
            category: document.getElementById("imageCategory").value,
            uploadDate: new Date().toLocaleDateString()
        };
        
        if(editingId) {
            // Update existing image
            const index = images.findIndex(i => i.id === editingId);
            if(index !== -1) {
                images[index] = image;
            }
        } else {
            // Add new image
            images.push(image);
        }
        
        localStorage.setItem("adminImages", JSON.stringify(images));
        hideUploadImageForm();
        loadImagesGallery();
        loadDashboard();
        alert("Image uploaded successfully!");
    };
    
    reader.readAsDataURL(file);
}

function deleteImage(id) {
    if(confirm("Are you sure you want to delete this image?")) {
        images = images.filter(i => i.id !== id);
        localStorage.setItem("adminImages", JSON.stringify(images));
        loadImagesGallery();
        loadDashboard();
        alert("Image deleted successfully!");
    }
}

function loadImagesGallery() {
    const gallery = document.getElementById("imagesGallery");
    gallery.innerHTML = "";
    
    if(images.length === 0) {
        gallery.innerHTML = "<p style='text-align: center; color: #999; padding: 40px;'>No images uploaded yet.</p>";
        return;
    }
    
    images.forEach(image => {
        const card = document.createElement("div");
        card.className = "image-card";
        const imageSource = image.data ? image.data : image.url;  // Use base64 data if available, otherwise URL
        card.innerHTML = `
            <img src="${imageSource}" alt="${image.name}" class="image-card-img" onerror="this.src='https://via.placeholder.com/200?text=Image+Not+Found'">
            <div class="image-card-info">
                <div class="image-card-name">${image.name}</div>
                <div class="image-card-category">Category: ${image.category}</div>
                <div class="image-card-date">Uploaded: ${image.uploadDate}</div>
                <div class="image-card-actions">
                    <button class="btn btn-edit" onclick="editImage(${image.id})" style="margin-right: 10px;">Edit</button>
                    <button class="btn btn-danger" onclick="deleteImage(${image.id})">Delete</button>
                </div>
            </div>
        `;
        gallery.appendChild(card);
    });
}

// ================================
// EDIT IMAGE
// ================================
function editImage(id) {
    const image = images.find(i => i.id === id);
    if(image) {
        editingId = id;
        editingType = "image";
        document.getElementById("imageName").value = image.name;
        document.getElementById("imageCategory").value = image.category;
        document.getElementById("imagePreview").src = image.data || image.url;
        document.getElementById("imagePreviewContainer").style.display = "block";
        document.getElementById("imageForm").style.display = "block";
    }
}

// ================================
// EXPORT DATA
// ================================
function exportData() {
    const allData = {
        products: products,
        posts: posts,
        images: images,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `calxin_admin_backup_${new Date().getTime()}.json`;
    link.click();
}

// ================================
// IMPORT DATA
// ================================
function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            products = data.products || [];
            posts = data.posts || [];
            images = data.images || [];
            
            localStorage.setItem("adminProducts", JSON.stringify(products));
            localStorage.setItem("adminPosts", JSON.stringify(posts));
            localStorage.setItem("adminImages", JSON.stringify(images));
            
            loadDashboard();
            loadProductsTable();
            loadPostsTable();
            loadImagesGallery();
            
            alert("Data imported successfully!");
        } catch(err) {
            alert("Error importing data: " + err.message);
        }
    };
    reader.readAsText(file);
}
