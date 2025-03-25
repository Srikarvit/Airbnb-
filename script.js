// Toggle Dropdown
function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown && !dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

// Filter Modal
const filterButton = document.querySelector('.fil');
const filterModal = document.querySelector('#filterModal');

if (filterButton && filterModal) {
    filterButton.addEventListener('click', function() {
        filterModal.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
        if (event.target === filterModal) {
            filterModal.classList.remove('active');
        }
    });
}

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

        if (priceInRange && matchesGuestFavourite) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Show/hide empty state message
    const visibleCards = document.querySelectorAll('.card[style="display: block;"]');
    const emptyState = document.querySelector('.empty-state');
    if (visibleCards.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }

    filterModal.classList.remove('active');
}

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

    filterModal.classList.remove('active');
}

// Login Modal Functionality
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

document.addEventListener('click', function(event) {
    const loginModal = document.getElementById('loginModal');
    if (event.target === loginModal) {
        closeLoginModal();
    }
});

document.addEventListener('keydown', function(event) {
    const loginModal = document.getElementById('loginModal');
    if (event.key === 'Escape' && loginModal && loginModal.classList.contains('active')) {
        closeLoginModal();
    }
});

// Check for query parameter to open login modal on page load
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('openLogin') === 'true') {
        openLoginModal();
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Navigation Icon Filtering
    const iconContainers = document.querySelectorAll('.icon-container');
    const cards = document.querySelectorAll('.card');

    iconContainers.forEach(container => {
        container.addEventListener('click', function() {
            // Remove active class from all icon containers
            iconContainers.forEach(c => c.classList.remove('active'));
            // Add active class to the clicked container
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            if (filter === 'all') {
                // Show all cards
                cards.forEach(card => {
                    card.style.display = 'block';
                });
            } else {
                cards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }

            // Show/hide empty state message
            const visibleCards = document.querySelectorAll('.card[style="display: block;"]');
            const emptyState = document.querySelector('.empty-state');
            if (visibleCards.length === 0) {
                emptyState.style.display = 'block';
            } else {
                emptyState.style.display = 'none';
            }

            document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Update copyright year dynamically
    const yearSpan = document.querySelector('.footer-left span:first-child');
    if (yearSpan) {
        yearSpan.textContent = `© ${new Date().getFullYear()} Airbnb, Inc.`;
    }
});

// Toggle Support Dropdown
function toggleSupportDropdown() {
    const supportDropdown = document.querySelector('.support-menu');
    if (supportDropdown) {
        supportDropdown.classList.toggle('active');
    }
}

document.addEventListener('click', function(event) {
    const supportDropdown = document.querySelector('.support-dropdown');
    const supportMenu = document.querySelector('.support-menu');
    if (supportDropdown && supportMenu && !supportDropdown.contains(event.target)) {
        supportMenu.classList.remove('active');
    }
});

document.addEventListener('keydown', function(event) {
    const supportMenu = document.querySelector('.support-menu');
    if (event.key === 'Escape' && supportMenu && supportMenu.classList.contains('active')) {
        supportMenu.classList.remove('active');
    }
});