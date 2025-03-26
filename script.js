// Global Variables for Filters
let currentCategoryFilter = 'all';
let currentLocationFilter = '';

// Toggle Language Dropdown
function toggleLanguageDropdown() {
    const dropdown = document.querySelector('.language-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// Toggle Profile Dropdown
function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// Toggle Support Dropdown
function toggleSupportDropdown() {
    const supportMenu = document.querySelector('.support-menu');
    if (supportMenu) {
        supportMenu.classList.toggle('active');
    }
}

// Open Login Modal
function openLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.classList.add('active');
    } else {
        console.error("Login modal not found. Ensure an element with id='loginModal' exists.");
    }
}

// Close Login Modal
function closeLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.classList.remove('active');
        document.getElementById('loginForm').reset();
    }
}

// Handle Login Form Submission
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    console.log("Log In:", { email, password });
    alert("Login successful! Welcome back.");
    closeLoginModal();
}

// Apply Filters from Filter Modal
function applyFilters() {
    const minPrice = parseInt(document.querySelector('#minPrice').value) || 0;
    const maxPrice = parseInt(document.querySelector('#maxPrice').value) || Infinity;
    const guestFavourite = document.querySelector('#guestFavourite').checked;
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const priceText = card.querySelector('.price').textContent;
        const price = parseInt(priceText.replace(/[^0-9]/g, ''));
        const hasGuestFavouriteTag = card.querySelector('.tag')?.textContent === 'Guest favourite';

        const priceInRange = price >= minPrice && price <= maxPrice;
        const matchesGuestFavourite = !guestFavourite || (guestFavourite && hasGuestFavouriteTag);

        card.style.display = priceInRange && matchesGuestFavourite ? 'block' : 'none';
    });

    const visibleCards = document.querySelectorAll('.card[style="display: block;"]');
    const emptyState = document.querySelector('.empty-state');
    emptyState.style.display = visibleCards.length === 0 ? 'block' : 'none';

    document.querySelector('#filterModal').classList.remove('active');
}

// Apply All Filters (Category, Location, Price, Guest Favourite)
function applyAllFilters() {
    const minPrice = parseInt(document.querySelector('#minPrice')?.value) || 0;
    const maxPrice = parseInt(document.querySelector('#maxPrice')?.value) || Infinity;
    const guestFavourite = document.querySelector('#guestFavourite')?.checked || false;
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const priceText = card.querySelector('.details .price')?.textContent || '0';
        const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
        const hasGuestFavouriteTag = card.getAttribute('data-guest-favourite') === 'true';
        const categories = card.getAttribute('data-category')?.split(' ') || [];
        const cardLocation = card.querySelector('.details h3')?.textContent || '';

        const priceInRange = price >= minPrice && price <= maxPrice;
        const matchesGuestFavourite = !guestFavourite || (guestFavourite && hasGuestFavouriteTag);
        const matchesCategory = currentCategoryFilter === 'all' || categories.includes(currentCategoryFilter);
        const matchesLocation = !currentLocationFilter || cardLocation.includes(currentLocationFilter);

        card.style.display = priceInRange && matchesGuestFavourite && matchesCategory && matchesLocation ? 'block' : 'none';
    });

    // Show/hide empty state message
    const visibleCards = document.querySelectorAll('.card[style="display: block;"]');
    const emptyState = document.querySelector('.empty-state');
    if (emptyState) {
        emptyState.style.display = visibleCards.length === 0 ? 'block' : 'none';
    }

    document.querySelector('.container')?.scrollIntoView({ behavior: 'smooth' });
}

// Clear Filters in Filter Modal
function clearFilters() {
    document.querySelector('#minPrice').value = '';
    document.querySelector('#maxPrice').value = '';
    document.querySelector('#guestFavourite').checked = false;

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.display = 'block';
    });

    // Hide empty state message
    const emptyState = document.querySelector('.empty-state');
    emptyState.style.display = 'none';

    document.querySelector('#filterModal').classList.remove('active');
}

// Cart Functions
function toggleCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.toggle('active');
        if (cartModal.classList.contains('active')) {
            loadCartItems();
        }
    }
}

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total strong');
    const cartCount = document.querySelector('.cart-count');

    if (cartItemsContainer && cartTotal && cartCount) {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const price = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
            total += price;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <p>${item.checkIn} to ${item.checkOut}</p>
                </div>
                <div class="cart-item-price">₹${price}</div>
                <button onclick="removeCartItem(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotal.textContent = `Total: ₹${total}`;
        cartCount.textContent = cart.length;
    }
}

function removeCartItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

function clearCart() {
    localStorage.removeItem('cart');
    loadCartItems();
}

function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Proceeding to checkout...');
    // Add checkout logic here (e.g., redirect to a checkout page)
}

// Language Change Function (Placeholder)
function changeLanguage(lang) {
    console.log("Language changed to:", lang);
    alert(`Language set to: ${lang}`);
}

// Initialize the Page
document.addEventListener('DOMContentLoaded', function() {
    // Load cart items on page load
    loadCartItems();

    // Open login modal if query parameter exists
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('openLogin') === 'true') {
        openLoginModal();
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Dynamically set container margin-top based on header and nav heights
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    const container = document.querySelector('.container');
    if (header && nav && container) {
        const headerHeight = header.offsetHeight;
        const navHeight = nav.offsetHeight;
        const totalHeight = headerHeight + navHeight + 20; // Add 20px buffer
        container.style.marginTop = `${totalHeight}px`;
    }

    // Update copyright year dynamically
    const yearSpan = document.querySelector('.footer-left span:first-child');
    if (yearSpan) {
        yearSpan.textContent = `© ${new Date().getFullYear()} Airbnb, Inc.`;
    }

    // Navigation Icon Filtering
    const iconContainers = document.querySelectorAll('.icon-container');
    const cards = document.querySelectorAll('.card');
    iconContainers.forEach(container => {
        container.addEventListener('click', function() {
            // Highlight the selected category
            iconContainers.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            currentCategoryFilter = this.getAttribute('data-filter');
            applyAllFilters();
        });
    });

    // Filter Modal Toggle
    const filterButton = document.querySelector('.fil');
    const filterModal = document.querySelector('#filterModal');
    if (filterButton && filterModal) {
        filterButton.addEventListener('click', function() {
            filterModal.classList.toggle('active');
        });
    }

    // Language Dropdown Setup
    const languageButton = document.querySelector('.language-btn');
    if (languageButton) {
        languageButton.addEventListener('click', toggleLanguageDropdown);
    }

    document.querySelectorAll('.language-menu a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const selectedLang = this.getAttribute('data-lang');
            changeLanguage(selectedLang);
            toggleLanguageDropdown(); // Close dropdown after selection
        });
    });
});

// Close Modals and Dropdowns on Outside Click
document.addEventListener('click', function(event) {
    // Close profile dropdown
    const dropdown = document.querySelector('.dropdown');
    if (dropdown && !dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
    }

    // Close support dropdown
    const supportDropdown = document.querySelector('.support-dropdown');
    const supportMenu = document.querySelector('.support-menu');
    if (supportDropdown && supportMenu && !supportDropdown.contains(event.target)) {
        supportMenu.classList.remove('active');
    }

    // Close filter modal
    const filterModal = document.querySelector('#filterModal');
    if (filterModal && event.target === filterModal) {
        filterModal.classList.remove('active');
    }

    // Close login modal
    const loginModal = document.getElementById('loginModal');
    if (loginModal && event.target === loginModal) {
        closeLoginModal();
    }

    // Close cart modal
    const cartModal = document.getElementById('cartModal');
    if (cartModal && event.target === cartModal) {
        cartModal.classList.remove('active');
    }

    // Close language dropdown
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageButton = document.querySelector('.language-btn');
    if (languageDropdown && languageButton && !languageDropdown.contains(event.target) && event.target !== languageButton) {
        languageDropdown.classList.remove('active');
    }
});

// Close Modals and Dropdowns on Escape Key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Close login modal
        const loginModal = document.getElementById('loginModal');
        if (loginModal && loginModal.classList.contains('active')) {
            closeLoginModal();
        }

        // Close support dropdown
        const supportMenu = document.querySelector('.support-menu');
        if (supportMenu && supportMenu.classList.contains('active')) {
            supportMenu.classList.remove('active');
        }

        // Close cart modal
        const cartModal = document.getElementById('cartModal');
        if (cartModal && cartModal.classList.contains('active')) {
            cartModal.classList.remove('active');
        }

        // Close language dropdown
        const languageDropdown = document.querySelector('.language-dropdown');
        if (languageDropdown && languageDropdown.classList.contains('active')) {
            languageDropdown.classList.remove('active');
        }

        // Close filter modal
        const filterModal = document.querySelector('#filterModal');
        if (filterModal && filterModal.classList.contains('active')) {
            filterModal.classList.remove('active');
        }
    }
});