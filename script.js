// DOM Elements
const searchInput = document.querySelector(".search-input");
const searchBox = document.querySelector(".nav-search");
const backToTop = document.querySelector(".foot-1");
const allBoxes = document.querySelectorAll(".box");
const body = document.body;

// State
let cartCount = 0;
let isDarkMode = false;
let debounceTimer;

// Create scroll indicator
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-indicator';
scrollIndicator.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
document.body.appendChild(scrollIndicator);

// Create toast container
const toast = document.createElement('div');
toast.className = 'toast';
document.body.appendChild(toast);

// Create modal
const modalOverlay = document.createElement('div');
modalOverlay.className = 'modal-overlay';
modalOverlay.innerHTML = `
    <div class="modal">
        <div class="modal-close">&times;</div>
        <h2 id="modal-title">Product Title</h2>
        <p id="modal-desc">Product description goes here.</p>
        <div class="modal-price" id="modal-price">$0.00</div>
        <button class="modal-btn" id="modal-add-cart">Add to Cart</button>
    </div>
`;
document.body.appendChild(modalOverlay);

// Create mobile nav
const mobileNavOverlay = document.createElement('div');
mobileNavOverlay.className = 'mobile-nav-overlay';
document.body.appendChild(mobileNavOverlay);

const mobileNav = document.createElement('div');
mobileNav.className = 'mobile-nav';
mobileNav.innerHTML = `
    <div class="mobile-nav-header">
        <h2>Menu</h2>
        <div class="mobile-nav-close">&times;</div>
    </div>
    <div class="mobile-nav-item">
        <span>Your Account</span>
        <i class="fa-solid fa-chevron-right"></i>
    </div>
    <div class="mobile-nav-item">
        <span>Your Orders</span>
        <i class="fa-solid fa-chevron-right"></i>
    </div>
    <div class="mobile-nav-item">
        <span>Your Wish List</span>
        <i class="fa-solid fa-chevron-right"></i>
    </div>
    <div class="mobile-nav-item">
        <span>Your Recommendations</span>
        <i class="fa-solid fa-chevron-right"></i>
    </div>
    <div class="mobile-nav-item">
        <span>Prime Membership</span>
        <i class="fa-solid fa-chevron-right"></i>
    </div>
    <div class="mobile-nav-item">
        <span>Customer Service</span>
        <i class="fa-solid fa-chevron-right"></i>
    </div>
`;
document.body.appendChild(mobileNav);

// Add hero particles
function createHeroParticles() {
    const heroSection = document.querySelector('.hero-section');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'hero-particles';
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
    
    heroSection.appendChild(particlesContainer);
}

// Show Toast Function
function showToast(message, type = 'default') {
    toast.textContent = message;
    toast.className = 'toast show';
    
    if (type === 'success') toast.classList.add('success');
    if (type === 'error') toast.classList.add('error');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Debounce function
function debounce(func, wait) {
    return function executedFunction(...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), wait);
    };
}

// ============ SEARCH FUNCTIONALITY ============

searchInput.addEventListener("focus", () => {
    searchBox.style.boxShadow = "0 0 20px rgba(254, 189, 104, 0.5)";
    searchBox.style.borderColor = "#febd68";
});

searchInput.addEventListener("blur", () => {
    searchBox.style.boxShadow = "none";
    searchBox.style.borderColor = "transparent";
});

// Debounced search
const handleSearch = debounce((value) => {
    if (value.trim() !== "") {
        showToast(`Searching for: "${value}"`);
    }
}, 500);

searchInput.addEventListener("input", (e) => {
    handleSearch(e.target.value);
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && searchInput.value.trim() !== "") {
        showToast(`Searching for: "${searchInput.value}"`);
    }
});

// Search Icon Click
const searchIcon = document.querySelector(".search-icon");
searchIcon.addEventListener("click", () => {
    if (searchInput.value.trim() !== "") {
        showToast(`Searching for: "${searchInput.value}"`);
    } else {
        searchInput.focus();
    }
});

// ============ SCROLL EFFECTS ============

// Scroll Indicator
window.addEventListener("scroll", () => {
    // Navbar shrink effect
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Scroll indicator visibility
    if (window.scrollY > 300) {
        scrollIndicator.classList.add("visible");
    } else {
        scrollIndicator.classList.remove("visible");
    }
});

// Scroll to Top
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

scrollIndicator.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Parallax effect on hero
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero-section');
    const scrolled = window.pageYOffset;
    if (scrolled < 400) {
        heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ============ BOX INTERACTIONS ============

// 3D Tilt effect for boxes
allBoxes.forEach((box, index) => {
    box.style.opacity = '0';
    box.style.animationDelay = `${index * 0.1}s`;
    
    // 3D Tilt Effect
    box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        box.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    box.addEventListener('mouseleave', () => {
        box.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
    
    // Fade in on load
    setTimeout(() => {
        box.style.opacity = '1';
    }, 100);
    
    // Click animation
    box.addEventListener("click", () => {
        box.style.transform = "scale(0.95)";
        setTimeout(() => {
            box.style.transform = "";
        }, 150);
        
        const categoryName = box.querySelector("h2").textContent;
        showToast(`Viewing: ${categoryName}`);
    });
    
    // Add ripple effect class
    box.classList.add("ripple");
    
    // Add Quick View button
    const quickViewBtn = document.createElement('button');
    quickViewBtn.className = 'quick-view-btn';
    quickViewBtn.textContent = 'Quick View';
    box.appendChild(quickViewBtn);
    
    // Add to Cart button
    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'add-to-cart-btn';
    addToCartBtn.textContent = 'Add to Cart';
    box.appendChild(addToCartBtn);
    
    // Quick View click
    quickViewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const title = box.querySelector('h2').textContent;
        openModal(title);
    });
    
    // Add to Cart click
    addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const title = box.querySelector('h2').textContent;
        addToCart(box, title);
    });
});

// ============ MODAL FUNCTIONALITY ============

function openModal(title) {
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalPrice = document.getElementById('modal-price');
    
    modalTitle.textContent = title;
    modalDesc.textContent = `High-quality ${title} from our curated collection. Perfect for everyday use with premium quality and durability.`;
    modalPrice.textContent = `$${(Math.random() * 100 + 10).toFixed(2)}`;
    
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelector('.modal-close').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.getElementById('modal-add-cart').addEventListener('click', () => {
    showToast('Added to cart! 🛒', 'success');
    closeModal();
    updateCartCount(1);
});

// Escape key to close modal
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
        searchInput.blur();
    }
});

// ============ ADD TO CART ANIMATION ============

function addToCart(boxElement, title) {
    const boxImg = boxElement.querySelector('.box-img');
    const rect = boxImg.getBoundingClientRect();
    const cart = document.querySelector('.nav-cart');
    const cartRect = cart.getBoundingClientRect();
    
    // Create flying item
    const flyingItem = document.createElement('div');
    flyingItem.className = 'flying-item';
    flyingItem.style.backgroundImage = boxImg.style.backgroundImage;
    flyingItem.style.left = rect.left + 'px';
    flyingItem.style.top = rect.top + 'px';
    flyingItem.style.width = '50px';
    flyingItem.style.height = '50px';
    document.body.appendChild(flyingItem);
    
    // Animate
    requestAnimationFrame(() => {
        flyingItem.style.left = cartRect.left + 'px';
        flyingItem.style.top = cartRect.top + 'px';
        flyingItem.style.width = '20px';
        flyingItem.style.height = '20px';
        flyingItem.style.opacity = '0.5';
    });
    
    // Remove and update cart
    setTimeout(() => {
        flyingItem.remove();
        updateCartCount(1);
        showToast(`${title} added to cart!`, 'success');
    }, 800);
}

function updateCartCount(increment) {
    cartCount += increment;
    const cartBadge = document.querySelector('.cart-badge');
    if (!cartBadge) {
        const badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.textContent = cartCount;
        document.querySelector('.nav-cart').appendChild(badge);
    } else {
        cartBadge.textContent = cartCount;
        badgePulse(badge);
    }
}

function badgePulse(element) {
    element.style.animation = 'none';
    element.offsetHeight; // Trigger reflow
    element.style.animation = 'badgePulse 0.5s ease';
}

// ============ DARK MODE ============

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    body.classList.toggle("dark-theme");
    
    if (isDarkMode) {
        showToast("Dark Mode Enabled 🌙", 'success');
    } else {
        showToast("Light Mode Enabled ☀️", 'success');
    }
}

// Keyboard shortcut for dark mode (Ctrl+D or Cmd+D)
document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        e.preventDefault();
        toggleDarkMode();
    }
});

// Dark mode toggle button in navbar
const darkModeBtn = document.createElement('div');
darkModeBtn.className = 'nav-cart border';
darkModeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
darkModeBtn.style.marginLeft = '10px';
darkModeBtn.title = 'Toggle Dark Mode';
document.querySelector('.navbar').appendChild(darkModeBtn);

darkModeBtn.addEventListener('click', toggleDarkMode);

// ============ MOBILE NAVIGATION ============

const menuBtn = document.createElement('div');
menuBtn.className = 'menu-btn';
menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';

const navbar = document.querySelector('.navbar');
const panel = document.querySelector('.panel');

// Add menu button to navbar
if (window.innerWidth <= 768) {
    navbar.insertBefore(menuBtn, navbar.firstChild);
}

menuBtn.addEventListener("click", () => {
    mobileNav.classList.add('active');
    mobileNavOverlay.classList.add('active');
});

document.querySelector('.mobile-nav-close').addEventListener('click', () => {
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
});

mobileNavOverlay.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
});

// Handle Window Resize
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        panel.style.display = "flex";
        panel.style.flexDirection = "row";
        panel.style.height = "40px";
        panel.style.padding = "0";
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
    } else {
        panel.style.display = "none";
    }
    
    // Re-add menu button if needed
    if (window.innerWidth <= 768 && !document.querySelector('.menu-btn')) {
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        navbar.insertBefore(menuBtn, navbar.firstChild);
        menuBtn.addEventListener("click", () => {
            mobileNav.classList.add('active');
            mobileNavOverlay.classList.add('active');
        });
    }
});

// ============ NAV ITEMS INTERACTIONS ============

// Nav Logo Click
const navLogo = document.querySelector(".nav-logo");
navLogo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    showToast("Back to Home");
});

// Cart icon interaction
const cartIcon = document.querySelector(".nav-cart");
cartIcon.addEventListener("click", () => {
    if (cartCount > 0) {
        showToast(`Your cart has ${cartCount} items 🛒`);
    } else {
        showToast("Your cart is empty 🛒");
    }
});

// Address click
const address = document.querySelector(".nav-address");
address.addEventListener("click", () => {
    showToast("Select delivery location");
});

// Sign in click
const signIn = document.querySelector(".nav-singin");
signIn.addEventListener("click", () => {
    showToast("Sign in to your account");
});

// Return click
const returns = document.querySelector(".nav-return");
returns.addEventListener("click", () => {
    showToast("View your returns & orders");
});

// ============ LAZY LOADING ============

// Lazy load images using Intersection Observer
const lazyImages = document.querySelectorAll('.box-img');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                img.style.opacity = '1';
            }, 100);
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: "50px"
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// ============ KEYBOARD NAVIGATION ============

// Tab navigation feedback
document.querySelectorAll('button, a, .border, .nav-cart, .panel-ops p, .panel-deals, .panel-all').forEach(element => {
    element.setAttribute('tabindex', '0');
    
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #febd68';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
    
    element.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            element.click();
        }
    });
});

// ============ SMOOTH SCROLL FOR INTERNAL LINKS ============

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ============ INTERSECTION OBSERVER FOR ANIMATIONS ============

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

allBoxes.forEach(box => {
    box.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(box);
});

// ============ SEARCH SELECT DROPDOWN ============

const searchSelect = document.querySelector(".search-select");
searchSelect.addEventListener("change", () => {
    showToast(`Searching in: ${searchSelect.value}`);
});

// ============ WELCOME MESSAGE ============

window.addEventListener("load", () => {
    createHeroParticles();
    
    // Staggered animation for boxes
    allBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.style.opacity = '1';
        }, index * 100);
    });
    
    // Welcome toast
    setTimeout(() => {
        showToast("Welcome to Amazon! 🛍️", 'success');
    }, 500);
});

// ============ CONSOLE INFO ============

console.log("%c🌐 Amazon Clone", "font-size: 24px; font-weight: bold; color: #FF9900;");
console.log("%cWelcome to the Amazon clone! Press Ctrl+D for dark mode.", "font-size: 14px; color: #666;");

// ============ TOUCH SWIPE SUPPORT ============

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - open mobile nav
            if (window.innerWidth <= 768) {
                mobileNav.classList.add('active');
                mobileNavOverlay.classList.add('active');
            }
        } else {
            // Swipe right - close mobile nav
            mobileNav.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
        }
    }
}

// ============ CATEGORY TABS ============

// Create category tabs
const shopSection = document.querySelector('.shop-section');
const categoryTabs = document.createElement('div');
categoryTabs.className = 'category-tabs';

const categories = ['All', 'Health & Personal Care', 'Furnitures', 'Home-Items', 'Electronic Gadgets', 'Cloths', 'Beauty Products', 'Mobile Accessories', 'Gaming Gadgets'];

categories.forEach((cat, index) => {
    const tab = document.createElement('button');
    tab.className = 'category-tab' + (index === 0 ? ' active' : '');
    tab.textContent = cat;
    categoryTabs.appendChild(tab);
    
    tab.addEventListener('click', () => {
        document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        if (cat === 'All') {
            allBoxes.forEach(box => {
                box.style.display = 'block';
                setTimeout(() => {
                    box.style.opacity = '1';
                    box.style.transform = 'translateY(0)';
                }, 100);
            });
        } else {
            allBoxes.forEach(box => {
                const title = box.querySelector('h2').textContent;
                if (title.includes(cat.replace('s', '').replace('Gadgets', 'Gadgets').replace('Items', 'Items'))) {
                    box.style.display = 'block';
                    setTimeout(() => {
                        box.style.opacity = '1';
                        box.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    box.style.opacity = '0';
                    box.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        box.style.display = 'none';
                    }, 300);
                }
            });
        }
    });
});

shopSection.insertBefore(categoryTabs, shopSection.firstChild);

// ============ PERFORMANCE - REDUCE MOTION ============

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    allBoxes.forEach(box => {
        box.style.animation = 'none';
        box.style.opacity = '1';
    });
}

// ============ MOUSE TRAIL EFFECT (Subtle) ============

let mouseX = 0;
let mouseY = 0;
let trailElements = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Only create trail occasionally for performance
    if (Math.random() > 0.9) {
        createTrailDot(mouseX, mouseY);
    }
});

function createTrailDot(x, y) {
    const dot = document.createElement('div');
    dot.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 6px;
        height: 6px;
        background: rgba(254, 189, 104, 0.4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.5s ease-out;
    `;
    document.body.appendChild(dot);
    
    setTimeout(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0)';
    }, 10);
    
    setTimeout(() => {
        dot.remove();
    }, 500);
}

