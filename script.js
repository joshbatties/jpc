function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.getElementById('what-we-do-btn').addEventListener('click', function() {
    const extraButtons = document.getElementById('extra-buttons');
    if (extraButtons.classList.contains('hidden')) {
        extraButtons.classList.remove('hidden');
    } else {
        extraButtons.classList.add('hidden');
    }
});

const logo = document.getElementById('main-logo');
logo.addEventListener('mouseover', function() {
    this.src = 'assets/jpc_logo_grey.png';
});

logo.addEventListener('mouseout', function() {
    this.src = 'assets/jpc_logo.png';
});