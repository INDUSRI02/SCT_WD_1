// Product data array
// Product data array
const products = [
  {
    id: 1,
    name: "Moisturizer",
    desc: "Hydrate your skin with our gentle, non-greasy moisturizer.",
    price: 349,
    img: "moisturizer.jpeg"},
  {
    id: 2,
    name: "Sunscreen",
    desc: "Protect your skin from harmful UV rays with SPF 50+ sunscreen.",
    price: 499,
    img: "sunscreen.jpg"
  },
  {
    id: 3,
    name: "Lip Balm",
    desc: "Keep your lips soft and hydrated all day long.",
    price: 199,
    img: "lipbalm.jpg"
  },
  {
    id: 4,
    name: "Night Cream",
    desc: "Rejuvenate your skin overnight with our nourishing night cream.",
    price: 599,
    img: "night cream.jpg"
  },
  {
    id: 5,
    name: "SPF Cream",
    desc: "Lightweight SPF cream for daily protection and glow.",
    price: 399,
    img: "spf cream.jpg"
  },
];

// Cache DOM elements
const menuItems = document.querySelectorAll('#menu li');
const sections = document.querySelectorAll('main .section');
const productsList = document.getElementById('products-list');
const cartCountSpan = document.getElementById('cart-count');
const cartSection = document.getElementById('cart');
const cartItemsList = document.getElementById('cart-items');
const cartEmptyMsg = document.getElementById('cart-empty-msg');

let cart = [];

// Navigation: show/hide sections based on clicked menu
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    const sectionId = item.getAttribute('data-section');
    if (!sectionId) return;

    // Set active menu item
    menuItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    // Show only relevant section
    sections.forEach(sec => {
      if (sec.id === sectionId) {
        sec.style.display = 'block';
        sec.classList.add('active-section');
      } else {
        sec.style.display = 'none';
        sec.classList.remove('active-section');
      }
    });

    // If cart section, render cart
    if (sectionId === 'cart') renderCart();
  });
});

// Render products dynamically
function renderProducts() {
  productsList.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" title="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="price">₹${p.price}</div>
      <button data-id="${p.id}">Add to Cart</button>
    `;
    productsList.appendChild(div);
  });

  // Add event listeners to buttons
  const buttons = productsList.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.getAttribute('data-id'));
      addToCart(id);
    });
  });
}

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Update cart count badge
function updateCartCount() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  if (totalQty > 0) {
    cartCountSpan.style.display = 'inline-block';
    cartCountSpan.textContent = totalQty;
  } else {
    cartCountSpan.style.display = 'none';
  }
}

// Render cart items
function renderCart() {
  if (cart.length === 0) {
    cartItemsList.innerHTML = '';
    cartEmptyMsg.style.display = 'block';
    return;
  }
  cartEmptyMsg.style.display = 'none';

  cartItemsList.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x ${item.qty} — ₹${item.price * item.qty}`;
    cartItemsList.appendChild(li);
  });
}

// Contact form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you for contacting us! We will get back to you soon.');
  contactForm.reset();
});

// Initialize
renderProducts();
updateCartCount();
