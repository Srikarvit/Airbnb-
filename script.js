function toggleDropdown() {
    document.querySelector('.dropdown').classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});