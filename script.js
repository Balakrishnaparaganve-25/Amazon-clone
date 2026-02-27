// DOM Elements
const searchInput = document.querySelector(".search-input");
const searchBox = document.querySelector(".nav-search");
const backToTop = document.querySelector(".foot-1");
const allBoxes = document.querySelectorAll(".box");
const body = document.body;

// Scroll Indicator
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-indicator';
scrollIndicator.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
document.body.appendChild(scrollIndicator);

// Toast Notification
const toast = document.createElement('div');
toast.className = 'toast';
document.body.appendChild(toast);

// Show Toast Function
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Search Focus Effects
searchInput.addEventListener("focus", () => {
    searchBox.style.boxShadow = "0 0 15px rgba(254, 189, 104, 0.6)";
    searchBox.style.borderColor = "#febd68";
});

searchInput.addEventListener("blur", () => {
    searchBox.style.boxShadow = "none";
    searchBox.style.borderColor = "transparent";
});

// Search Functionality
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

// Back to Top
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Scroll Indicator Visibility
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollIndicator.classList.add("visible");
    } else {
        scrollIndicator.classList.remove("visible");
    }
});

// Scroll to Top from Indicator
scrollIndicator.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Box Click Effects with Animation
allBoxes.forEach((box, index) => {
    box.style.opacity = '0';
    box.style.animationDelay = `${index * 0.1}s`;
    
    // Fade in on load
    setTimeout(() => {
        box.style.opacity = '1';
    }, 100);
    
    box.addEventListener("click", () => {
        // Add click animation
        box.style.transform = "scale(0.95)";
        setTimeout(() => {
            box.style.transform = "";
        }, 150);
        
        // Get the category name
        const categoryName = box.querySelector("h2").textContent;
        showToast(`Viewing: ${categoryName}`);
    });
    
    // Add ripple effect class
    box.classList.add("ripple");
});

// Nav Items Hover Sound Effect (Visual Feedback)
const navItems = document.querySelectorAll(".border, .nav-cart, .panel-ops p, .panel-deals, .panel-all");
navItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
        item.style.transition = "all 0.2s ease";
    });
});

// Dark Mode Toggle
let darkMode = false;

function toggleDarkMode() {
    darkMode = !darkMode;
    body.classList.toggle("dark-theme");
    
    if (darkMode) {
        showToast("Dark Mode Enabled 🌙");
    } else {
        showToast("Light Mode Enabled ☀️");
    }
}

// Keyboard shortcut for dark mode (Ctrl+D or Cmd+D)
document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        e.preventDefault();
        toggleDarkMode();
    }
    // Escape key to close any active state
    if (e.key === "Escape") {
        searchInput.blur();
    }
});

// Mobile Menu Toggle
const menuBtn = document.createElement('div');
menuBtn.className = 'menu-btn';
menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';

const navbar = document.querySelector('.navbar');
const panel = document.querySelector('.panel');

// Add menu button to navbar
if (window.innerWidth <= 768) {
    navbar.insertBefore(menuBtn, navbar.firstChild);
    
    menuBtn.addEventListener("click", () => {
        if (panel.style.display === "none" || panel.style.display === "") {
            panel.style.display = "flex";
            panel.style.flexDirection = "column";
            panel.style.height = "auto";
            panel.style.padding = "10px";
            showToast("Menu opened");
        } else {
            panel.style.display = "none";
            showToast("Menu closed");
        }
    });
}

// Handle Window Resize
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        panel.style.display = "flex";
        panel.style.flexDirection = "row";
        panel.style.height = "40px";
        panel.style.padding = "0";
    } else {
        panel.style.display = "none";
    }
    
    // Re-add menu button if needed
    if (window.innerWidth <= 768 && !document.querySelector('.menu-btn')) {
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        navbar.insertBefore(menuBtn, navbar.firstChild);
    }
});

// Nav Logo Click
const navLogo = document.querySelector(".nav-logo");
navLogo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    showToast("Back to Home");
});

// Add loading animation completion
window.addEventListener("load", () => {
    // Staggered animation for boxes
    allBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.style.opacity = '1';
        }, index * 100);
    });
    
    showToast("Welcome to Amazon!");
});

// Cart icon interaction
const cartIcon = document.querySelector(".nav-cart");
cartIcon.addEventListener("click", () => {
    showToast("Your cart is empty 🛒");
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

// Smooth scroll for internal links
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

// Intersection Observer for scroll animations
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
    box.style.opacity = "0";
    box.style.transform = "translateY(20px)";
    box.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(box);
});

// Search select dropdown enhancement
const searchSelect = document.querySelector(".search-select");
searchSelect.addEventListener("change", () => {
    showToast(`Searching in: ${searchSelect.value}`);
});

// Console info for developers
console.log("%c🌐 Amazon Clone", "font-size: 24px; font-weight: bold; color: #FF9900;");
console.log("%cWelcome to the Amazon clone! Press Ctrl+D for dark mode.", "font-size: 14px; color: #666;");

