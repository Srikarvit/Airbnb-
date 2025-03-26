
    // Toggle language dropdown
    function toggleLanguageDropdown() {
        const dropdown = document.querySelector('.language-dropdown');
        dropdown.classList.toggle('active');
    }

   // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const dropdown = document.querySelector('.language-dropdown');
        const button = document.querySelector('.language-btn');
        if (!dropdown.contains(event.target) && event.target !== button) {
            dropdown.classList.remove('active');
        }
    });


    // Handle language selection
    document.querySelectorAll('.language-menu a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const selectedLang = this.getAttribute('data-lang');
            changeLanguage(selectedLang);
            toggleLanguageDropdown(); // Close dropdown after selection
        });
    });

    // Language change function (placeholder)
    function changeLanguage(lang) {
        console.log("Language changed to:", lang);
        // Add your language change logic here (e.g., update UI, localStorage, or API call)
        alert(`Language set to: ${lang}`);
    }

    // Attach toggle to button
    document.querySelector('.language-btn').addEventListener('click', toggleLanguageDropdown);


function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

function toggleSupportDropdown() {
    const supportMenu = document.querySelector('.support-menu');
    if (supportMenu) {
        supportMenu.classList.toggle('active');
    }
}

function openLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.classList.add('active');
    } else {
        console.error("Login modal not found. Ensure an element with id='loginModal' exists.");
    }
}

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

// Initialize the Page
document.addEventListener('DOMContentLoaded', function() {
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

            const filter = this.getAttribute('data-filter');
            if (filter === 'all') {
                cards.forEach(card => card.style.display = 'block');
            } else {
                cards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    card.style.display = categories.includes(filter) ? 'block' : 'none';
                });
            }

            // Show/hide empty state message
            const visibleCards = document.querySelectorAll('.card[style="display: block;"]');
            const emptyState = document.querySelector('.empty-state');
            emptyState.style.display = visibleCards.length === 0 ? 'block' : 'none';

            document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
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
    }
});