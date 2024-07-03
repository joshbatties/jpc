console.log("Script loaded");
  
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 1) {
        navbar.style.backgroundColor = 'white';
        console.log("Scrolled")
    } else {
        navbar.style.backgroundColor = ''; // Reset to default
        console.log("Not Scrolled")
    }
});