// ================================
// ADMIN PANEL JAVASCRIPT
// ================================

let products = JSON.parse(localStorage.getItem("adminProducts")) || [];
let posts = JSON.parse(localStorage.getItem("adminPosts")) || [];
let images = JSON.parse(localStorage.getItem("adminImages")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let editingId = null;
let editingType = null;

const SITE_IMAGE_FILES = [
    "WhatsApp Image 2026-01-23 at 4.58.16 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.18 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.19 PM (1).jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.19 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.23 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.26 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.27 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.30 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.31 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.35 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.37 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.39 PM.jpeg",
    "WhatsApp Image 2026-01-23 at 4.58.40 PM.jpeg",
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

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    loadDashboard();
    populateCategories();
    loadProductsTable();
    loadPostsTable();
    loadImagesGallery();
    loadOrdersTable();
});

// ================================
// SECTION NAVIGATION
// ================================
function showSection(sectionId, navEl) {
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
    if (navEl) {
        navEl.classList.add("active");
    }
    
    // Reload data for the section
    if(sectionId === "dashboard") {
        loadDashboard();
    } else if(sectionId === "products") {
        loadProductsTable();
    } else if(sectionId === "posts") {
        loadPostsTable();
    } else if(sectionId === "images") {
        loadImagesGallery();
    } else if(sectionId === "orders") {
        loadOrdersTable();
    }
}

// ================================
// DASHBOARD
// ================================
function loadDashboard() {
    orders = JSON.parse(localStorage.getItem("orders")) || [];
    document.getElementById("totalProducts").textContent = products.length;
    document.getElementById("totalPosts").textContent = posts.length;
    document.getElementById("totalImages").textContent = getAllImages().length;
    document.getElementById("totalOrders").textContent = orders.length;
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
    editingType = null;
    document.getElementById("imageName").value = "";
    document.getElementById("imageFile").value = "";
    document.getElementById("imageUrl").value = "";
    document.getElementById("imageDescription").value = "";
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
    const imageUrl = document.getElementById("imageUrl").value.trim();
    const description = document.getElementById("imageDescription").value.trim();
    const existingImage = editingId ? getAllImages().find(i => Number(i.id) === Number(editingId)) : null;
    const effectiveUrl = imageUrl || (existingImage ? existingImage.url || "" : "");
    const effectiveData = existingImage ? existingImage.data || "" : "";

    if(!file && !effectiveUrl && !effectiveData) {
        alert("Select an image file or provide an image URL/path.");
        return;
    }

    const persistImage = function(imagePayload) {
        const image = {
            id: editingId || Date.now(),
            name: document.getElementById("imageName").value,
            data: imagePayload.data || effectiveData || "",
            url: imagePayload.url || effectiveUrl || "",
            type: imagePayload.type || "",
            category: document.getElementById("imageCategory").value,
            description: description,
            uploadDate: new Date().toLocaleDateString()
        };

        if(editingId) {
            // Update existing image
            const index = images.findIndex(i => i.id === editingId);
            if(index !== -1) {
                images[index] = { ...images[index], ...image };
            } else {
                images.push(image);
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

    if(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            persistImage({
                data: e.target.result,
                type: file.type
            });
        };
        reader.readAsDataURL(file);
    } else {
        persistImage({
            url: imageUrl,
            type: "text/url"
        });
    }
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

    const allImages = getAllImages();
    if(allImages.length === 0) {
        gallery.innerHTML = "<p style='text-align: center; color: #999; padding: 40px;'>No images uploaded yet.</p>";
        return;
    }

    allImages.forEach(image => {
        const card = document.createElement("div");
        card.className = "image-card";
        const imageSource = image.data ? image.data : image.url;
        const canDelete = Number(image.id) < 100000;
        const stock = Number(image.stock);
        const normalizedStock = Number.isFinite(stock) ? stock : (6 + (Math.abs(Number(image.id)) % 55));
        const stockClass = getStockClass(normalizedStock);
        const stockText = normalizedStock > 0 ? `${normalizedStock} in stock` : "Out of stock";
        card.innerHTML = `
            <div class="image-card-media">
                <span class="stock-badge ${stockClass}">${stockText}</span>
                <img src="${imageSource}" alt="${image.name}" class="image-card-img" onerror="this.src='https://via.placeholder.com/200?text=Image+Not+Found'">
            </div>
            <div class="image-card-info">
                <div class="image-card-name">${image.name}</div>
                <div class="image-card-category">Category: ${image.category}</div>
                <div class="image-card-description">${image.description || "No description"}</div>
                <div class="image-card-date">Uploaded: ${image.uploadDate}</div>
                <div class="image-card-actions">
                    <button class="btn btn-edit" onclick="editImage(${image.id})" style="margin-right: 10px;">Edit</button>
                    ${canDelete ? `<button class="btn btn-danger" onclick="deleteImage(${image.id})">Delete</button>` : `<button class="btn btn-secondary" disabled>Catalog</button>`}
                </div>
            </div>
        `;
        gallery.appendChild(card);
    });
}

function getStockClass(stock) {
    if (stock > 45) return "stock-very-high";
    if (stock > 30) return "stock-high";
    if (stock > 15) return "stock-medium";
    if (stock > 5) return "stock-low";
    if (stock > 0) return "stock-critical";
    return "stock-out";
}

// ================================
// EDIT IMAGE
// ================================
function editImage(id) {
    const image = getAllImages().find(i => i.id === id);
    if(image) {
        editingId = id;
        editingType = "image";
        document.getElementById("imageName").value = image.name;
        document.getElementById("imageCategory").value = image.category;
        document.getElementById("imageUrl").value = image.url || "";
        document.getElementById("imageDescription").value = image.description || "";
        document.getElementById("imagePreview").src = image.data || image.url;
        document.getElementById("imagePreviewContainer").style.display = "block";
        document.getElementById("imageForm").style.display = "block";
    }
}

function getCatalogImages() {
    const catalog = SITE_IMAGE_FILES.map((file, index) => ({
        id: 100000 + index,
        name: file.replace(".jpeg", ""),
        data: "",
        url: encodeURI(`calxin.images/${file}`),
        type: "catalog",
        category: "product",
        stock: 8 + (index % 52),
        description: "",
        uploadDate: "Catalog"
    }));

    const productImages = products
        .filter(product => product.image)
        .map((product, index) => ({
            id: 200000 + index,
            name: product.name || `Product ${index + 1}`,
            data: "",
            url: encodeURI(String(product.image).replace("images.Calxin/", "calxin.images/")),
            type: "product",
            category: product.category || "product",
            stock: Number(product.stock) || (10 + (index % 30)),
            description: product.description || "",
            uploadDate: "From product"
        }));

    return [...catalog, ...productImages];
}

function getAllImages() {
    const savedImages = images.map(item => ({
        ...item,
        id: Number(item.id),
        url: item.url ? encodeURI(String(item.url).replace("images.Calxin/", "calxin.images/")) : item.url
    }));

    const map = new Map();
    [...getCatalogImages(), ...savedImages].forEach(image => {
        const key = `${image.name}|${image.url || image.data || ""}`;
        map.set(key, image);
    });
    return Array.from(map.values());
}

// ================================
// ORDERS MANAGEMENT
// ================================
function loadOrdersTable() {
    orders = JSON.parse(localStorage.getItem("orders")) || [];
    const tbody = document.getElementById("ordersTableBody");
    if(!tbody) return;
    tbody.innerHTML = "";

    if(orders.length === 0) {
        tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;color:#888;'>No orders placed yet.</td></tr>";
        return;
    }

    orders
        .slice()
        .sort((a, b) => new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0))
        .forEach((order, index) => {
            const row = document.createElement("tr");
            const customer = order.user && (order.user.name || order.user.email)
                ? `${order.user.name || "User"} ${order.user.email ? `(${order.user.email})` : ""}`
                : "Unknown User";
            const itemCount = Array.isArray(order.items) ? order.items.length : 0;
            const total = Number(order.total) || 0;
            const status = order.status || "Pending";
            const orderId = order.orderId || `ORD-${index + 1}`;
            row.innerHTML = `
                <td>${orderId}</td>
                <td>${order.date || "-"}</td>
                <td>${customer}</td>
                <td>${itemCount}</td>
                <td>${total.toLocaleString()}</td>
                <td>
                    <select class="order-status-select" onchange="updateOrderStatus('${orderId}', this.value)">
                        <option value="Pending" ${status === "Pending" ? "selected" : ""}>Pending</option>
                        <option value="Processing" ${status === "Processing" ? "selected" : ""}>Processing</option>
                        <option value="Completed" ${status === "Completed" ? "selected" : ""}>Completed</option>
                        <option value="Cancelled" ${status === "Cancelled" ? "selected" : ""}>Cancelled</option>
                    </select>
                </td>
            `;
            tbody.appendChild(row);
        });
}

function updateOrderStatus(orderId, status) {
    orders = JSON.parse(localStorage.getItem("orders")) || [];
    const orderIndex = orders.findIndex(order => (order.orderId || "") === orderId);
    if(orderIndex === -1) return;
    orders[orderIndex].status = status;
    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrdersTable();
    loadDashboard();
}

// ================================
// EXPORT DATA
// ================================
function exportData() {
    const allData = {
        products: products,
        posts: posts,
        images: images,
        orders: orders,
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
            orders = data.orders || [];
            
            localStorage.setItem("adminProducts", JSON.stringify(products));
            localStorage.setItem("adminPosts", JSON.stringify(posts));
            localStorage.setItem("adminImages", JSON.stringify(images));
            localStorage.setItem("orders", JSON.stringify(orders));
            
            loadDashboard();
            loadProductsTable();
            loadPostsTable();
            loadImagesGallery();
            loadOrdersTable();
            
            alert("Data imported successfully!");
        } catch(err) {
            alert("Error importing data: " + err.message);
        }
    };
    reader.readAsText(file);
}
