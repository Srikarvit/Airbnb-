function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('active');
}

document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('active');
}

document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

function openLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Placeholder for login logic (e.g., API call)
    console.log("Log In:", { email, password });
    alert("Login successful! Welcome back.");
    closeLoginModal();
}

const filterButton = document.querySelector('.fil');
const filterModal = document.querySelector('#filterModal');

filterButton.addEventListener('click', function() {
    filterModal.classList.toggle('active');
});

document.addEventListener('click', function(event) {
    if (event.target === filterModal) {
        filterModal.classList.remove('active');
    }
});

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

    filterModal.classList.remove('active');
}