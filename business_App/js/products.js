// js/products.js
// THIS IS WHERE YOU ADD NEW PRODUCTS - just copy a block and edit the details

const products = [
  {
    id: 1,
    name: "Svelte Mesh Watch",
    category: "watches",
    price: 145.00,
    material: "Stainless Steel / Japanese Miyota Movement",
    description: "A minimalist timepiece featuring a refined mesh band and clean dial. Water-resistant to 30m. The perfect everyday watch that transitions from desk to dinner.",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1378&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1376&auto=format&fit=crop"
    ],
    features: ["Japanese Quartz Movement", "316L Stainless Steel", "Sapphire-Coated Glass", "30m Water Resistance"],
    inStock: true,
    isNew: true
  },
  {
    id: 2,
    name: "Lasso Chain Bracelet",
    category: "jewelry",
    subcategory: "bracelets",
    price: 98.00,
    material: "18k Gold Vermeil on Sterling Silver",
    description: "An elegant chain bracelet with a fluid, organic silhouette. Handcrafted in recycled sterling silver with a thick 18k gold vermeil finish. Wear alone or layer with other pieces.",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1374&auto=format&fit=crop"
    ],
    features: ["18k Gold Vermeil", "Recycled Sterling Silver", "Handcrafted", "Adjustable Clasp"],
    inStock: true,
    isNew: false
  },
  {
    id: 3,
    name: "Classic Signet Ring",
    category: "jewelry",
    subcategory: "rings",
    price: 112.00,
    material: "Sterling Silver with Oxidized Finish",
    description: "A modern take on the traditional signet ring. Clean architectural lines with a subtle oxidized finish that deepens with wear, making each piece uniquely yours.",
    images: [
      "https://images.unsplash.com/photo-1609587312208-cea54be969e7?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1374&auto=format&fit=crop"
    ],
    features: ["Solid Sterling Silver", "Oxidized Finish", "Available Sizes 5-11", "Engravable"],
    inStock: true,
    isNew: false
  },
  {
    id: 4,
    name: "Sculptural Hoops",
    category: "jewelry",
    subcategory: "earrings",
    price: 88.00,
    material: "18k Gold Vermeil",
    description: "Architectural hoop earrings with an organic, fluid shape. Lightweight enough for all-day wear, sculptural enough to make a statement.",
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1376&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1374&auto=format&fit=crop"
    ],
    features: ["18k Gold Vermeil", "Lightweight Design", "Post Back Closure", "20mm Diameter"],
    inStock: true,
    isNew: true
  },
  // ===========================================
  // ADD YOUR NEW PRODUCTS BELOW THIS LINE
  // ===========================================
  
  {
    id: 5,
    name: "Chronograph Leather Watch",
    category: "watches",
    price: 189.00,
    material: "Stainless Steel / Italian Leather",
    description: "A sophisticated chronograph with genuine Italian leather strap. Three sub-dials for precision timing. The perfect blend of function and elegance.",
    images: [
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1540&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1470&auto=format&fit=crop"
    ],
    features: ["Chronograph Movement", "Italian Leather", "40mm Case", "50m Water Resistance"],
    inStock: true,
    isNew: true
  },
  {
    id: 6,
    name: "Pearl Drop Necklace",
    category: "jewelry",
    subcategory: "necklaces",
    price: 135.00,
    material: "Freshwater Pearl / 14k Gold Chain",
    description: "A single luminous freshwater pearl suspended on a delicate 14k gold chain. Understated elegance for everyday luxury.",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a530e51cdcb2?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1470&auto=format&fit=crop"
    ],
    features: ["Freshwater Pearl", "14k Gold Chain", "Adjustable Length", "Gift Box Included"],
    inStock: true,
    isNew: false
  }
];

// Shopping Cart Logic
let cart = JSON.parse(localStorage.getItem('aurumCart')) || [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCartCount();
  saveCart();
  showAddedNotification(product.name);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartCount();
  saveCart();
  if (window.location.pathname.includes('cart')) {
    renderCart();
  }
}

function updateCartCount() {
  const countElement = document.getElementById('cart-count');
  if (countElement) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countElement.textContent = totalItems;
    countElement.style.display = totalItems > 0 ? 'inline' : 'none';
  }
}

function saveCart() {
  localStorage.setItem('aurumCart', JSON.stringify(cart));
}

function showAddedNotification(productName) {
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.innerHTML = `<i class="fas fa-check-circle"></i> ${productName} added to cart`;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }, 100);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);