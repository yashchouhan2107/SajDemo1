// Saj Organic Dry Fruit Store - Interactive Engine with Indian Rupee (₹) & Scroll Reveal Engine

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
  initCartDrawer();
  initProductFilter();
  initGiftBoxBuilder();
  initInteractiveModals();
  initMobileMenu();
  init3DTiltCards();
  initLuxuryCursor();
  initButtonRipples();
});

// Mobile Navigation Toggle
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      const menu = document.getElementById('mobileMenu');
      if (menu) menu.classList.toggle('hidden');
    });
  }
}

function toggleMobileMenu(open) {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    if (open) menu.classList.remove('hidden');
    else menu.classList.add('hidden');
  }
}

// 1. Scroll-Triggered Section & Element Reveal Observer
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll, section, .luxe-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => {
    if (!el.classList.contains('reveal-on-scroll')) {
      el.classList.add('reveal-on-scroll');
    }
    observer.observe(el);
  });
}

// 2. Interactive 3D Tilt Micro-Animation for Luxe Cards
function init3DTiltCards() {
  const cards = document.querySelectorAll('.luxe-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`;
    });
  });
}

// 3. Custom Luxury Golden Following Ring Cursor (Desktop)
function initLuxuryCursor() {
  if (window.innerWidth < 1024) return;

  const cursorRing = document.createElement('div');
  cursorRing.className = 'fixed w-8 h-8 rounded-full border border-[#C5A059]/60 pointer-events-none z-50 transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2 opacity-0';
  document.body.appendChild(cursorRing);

  const cursorDot = document.createElement('div');
  cursorDot.className = 'fixed w-2 h-2 rounded-full bg-[#966840] pointer-events-none z-50 transition-all duration-75 ease-out -translate-x-1/2 -translate-y-1/2 opacity-0';
  document.body.appendChild(cursorDot);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  const interactables = document.querySelectorAll('a, button, input, .box-selectable, .luxe-card');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.6)';
      cursorRing.style.borderColor = '#966840';
      cursorRing.style.backgroundColor = 'rgba(197, 160, 89, 0.15)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.borderColor = 'rgba(197, 160, 89, 0.6)';
      cursorRing.style.backgroundColor = 'transparent';
    });
  });
}

// 4. Liquid Gold Button Ripple FX
function initButtonRipples() {
  const buttons = document.querySelectorAll('button, a.rounded-full');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.className = 'absolute rounded-full bg-[#C5A059]/40 transform scale-0 pointer-events-none animate-ping';
      
      this.classList.add('relative', 'overflow-hidden');
      this.appendChild(circle);

      setTimeout(() => circle.remove(), 600);
    });
  });
}

// 5. Shopping Cart Drawer State (Prices in ₹ INR)
let cartItems = [];

function initCartDrawer() {
  const cartBtn = document.getElementById('cartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');

  if (cartBtn && cartDrawer && cartOverlay) {
    cartBtn.addEventListener('click', () => toggleCart(true));
    closeCartBtn.addEventListener('click', () => toggleCart(false));
    cartOverlay.addEventListener('click', () => toggleCart(false));
  }
}

function toggleCart(open) {
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  if (open) {
    cartDrawer.classList.remove('translate-x-full');
    cartOverlay.classList.remove('hidden');
    setTimeout(() => cartOverlay.classList.remove('opacity-0'), 10);
  } else {
    cartDrawer.classList.add('translate-x-full');
    cartOverlay.classList.add('opacity-0');
    setTimeout(() => cartOverlay.classList.add('hidden'), 300);
  }
}

function addToCart(title, price, image) {
  const existing = cartItems.find(item => item.title === title);
  if (existing) {
    existing.qty += 1;
  } else {
    cartItems.push({ title, price, image, qty: 1 });
  }
  updateCartUI();
  toggleCart(true);
  showToast(`Added ${title} to your bag`);
}

function updateCartUI() {
  const cartList = document.getElementById('cartList');
  const cartBadge = document.getElementById('cartBadge');
  const cartSubtotal = document.getElementById('cartSubtotal');

  const totalCount = cartItems.reduce((acc, i) => acc + i.qty, 0);
  const totalPrice = cartItems.reduce((acc, i) => acc + (i.price * i.qty), 0);

  if (cartBadge) cartBadge.innerText = totalCount;
  if (cartSubtotal) cartSubtotal.innerText = `₹${totalPrice.toLocaleString('en-IN')}`;

  if (!cartList) return;

  if (cartItems.length === 0) {
    cartList.innerHTML = `
      <div class="text-center py-12 text-[#8C7769]">
        <svg class="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
        <p class="font-serif-luxury text-lg text-[#2A1D15]">Your Saj Bag is empty</p>
        <p class="text-xs mt-1">Explore our organic harvest to curate your selection.</p>
      </div>
    `;
    return;
  }

  cartList.innerHTML = cartItems.map((item, index) => `
    <div class="flex items-center space-x-4 p-3 bg-[#FAF7F2] rounded-xl border border-[#E6DCCF]">
      <img src="${item.image}" alt="${item.title}" class="w-14 h-14 object-cover rounded-lg">
      <div class="flex-1">
        <h4 class="font-serif-luxury font-semibold text-[#2A1D15] leading-tight">${item.title}</h4>
        <p class="text-xs text-[#966840] font-semibold mt-0.5">₹${item.price.toLocaleString('en-IN')}</p>
        <div class="flex items-center space-x-2 mt-2">
          <button onclick="changeQty(${index}, -1)" class="w-5 h-5 rounded bg-[#EFE7DA] text-[#2A1D15] text-xs font-bold hover:bg-[#C68B59] hover:text-white transition">-</button>
          <span class="text-xs font-semibold text-[#2A1D15]">${item.qty}</span>
          <button onclick="changeQty(${index}, 1)" class="w-5 h-5 rounded bg-[#EFE7DA] text-[#2A1D15] text-xs font-bold hover:bg-[#C68B59] hover:text-white transition">+</button>
        </div>
      </div>
      <button onclick="removeItem(${index})" class="text-[#8C7769] hover:text-red-500 text-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  `).join('');
}

function changeQty(index, delta) {
  cartItems[index].qty += delta;
  if (cartItems[index].qty <= 0) {
    cartItems.splice(index, 1);
  }
  updateCartUI();
}

function removeItem(index) {
  cartItems.splice(index, 1);
  updateCartUI();
}

// 6. Product Filter
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#966840]', 'text-white');
        b.classList.add('bg-white', 'text-[#2A1D15]');
      });
      btn.classList.add('bg-[#966840]', 'text-white');
      btn.classList.remove('bg-white', 'text-[#2A1D15]');

      const filter = btn.getAttribute('data-filter');
      productCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => card.style.opacity = '1', 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 200);
        }
      });
    });
  });
}

// 7. Interactive Gift Box Builder (Prices in ₹ INR)
let boxItems = [];
const boxBasePrice = 1450; // Base chest price in ₹

function initGiftBoxBuilder() {
  renderGiftBox();
  const items = document.querySelectorAll('.box-selectable');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const name = item.getAttribute('data-name');
      const price = parseFloat(item.getAttribute('data-price'));
      
      if (boxItems.length < 4) {
        boxItems.push({ name, price });
        renderGiftBox();
      } else {
        showToast('Your Saj Wooden Box is full (Max 4 artisanal items)');
      }
    });
  });
}

function renderGiftBox() {
  const slots = document.querySelectorAll('.box-slot');
  const totalPriceEl = document.getElementById('boxTotalPrice');
  const boxCountEl = document.getElementById('boxCount');
  
  let currentTotal = boxBasePrice;

  slots.forEach((slot, idx) => {
    if (boxItems[idx]) {
      slot.innerHTML = `
        <div class="bg-white p-3 rounded-lg border border-[#C68B59] text-center relative group shadow-sm">
          <p class="font-serif-luxury font-bold text-sm text-[#2A1D15]">${boxItems[idx].name}</p>
          <p class="text-xs text-[#966840] font-semibold">+₹${boxItems[idx].price.toLocaleString('en-IN')}</p>
          <button onclick="removeBoxItem(${idx})" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow">×</button>
        </div>
      `;
      currentTotal += boxItems[idx].price;
    } else {
      slot.innerHTML = `
        <div class="border-2 border-dashed border-[#E6DCCF] p-4 rounded-lg text-center text-[#8C7769] text-xs">
          + Click Item Below
        </div>
      `;
    }
  });

  if (totalPriceEl) totalPriceEl.innerText = `₹${currentTotal.toLocaleString('en-IN')}`;
  if (boxCountEl) boxCountEl.innerText = `${boxItems.length}/4 Selected`;
}

function removeBoxItem(index) {
  boxItems.splice(index, 1);
  renderGiftBox();
}

function addCustomBoxToCart() {
  if (boxItems.length === 0) {
    showToast('Please select at least 1 organic dry fruit item for your box');
    return;
  }
  const total = boxBasePrice + boxItems.reduce((a, b) => a + b.price, 0);
  addToCart(`Bespoke Saj Gift Box (${boxItems.length} Selection)`, total, 'assets/gift_box.jpg');
  boxItems = [];
  renderGiftBox();
}

// 8. Toast Notification
function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-6 right-6 z-50 bg-[#2A1D15] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#C5A059] text-sm flex items-center space-x-3 transition-all duration-300 transform translate-y-10 opacity-0';
  toast.innerHTML = `
    <svg class="w-5 h-5 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
    </svg>
    <span>${msg}</span>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
  }, 10);
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-10');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// 9. Interactive Modal
function initInteractiveModals() {
  // Placeholder for quick view modal hooks
}
