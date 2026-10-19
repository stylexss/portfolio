// ======================================
// Mobile Navigation Menu Toggle
// ======================================

// Get elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Toggle aria-expanded for accessibility
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded.toString());
    });
}

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// ======================================
// Smooth Scroll & Active Nav Link Highlighting
// ======================================

const sections = document.querySelectorAll('section[id]');

// Function to update active nav link on scroll
function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100; // Offset for fixed header
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', updateActiveNavLink);

// ======================================
// Back to Top Button
// ======================================

const backToTopButton = document.getElementById('back-to-top');

// Show/hide back to top button based on scroll position
function toggleBackToTop() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
}

// Scroll to top when button is clicked
if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add scroll event listener for back to top button
window.addEventListener('scroll', toggleBackToTop);

// ======================================
// Set Current Year in Footer
// ======================================

const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
}

// ======================================
// Fade-in Animation on Scroll (Intersection Observer)
// ======================================

// Select elements to animate
const animatedElements = document.querySelectorAll('.skills__category, .project__card, .contact__card');

// Create Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Set initial styles and observe elements
animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// ======================================
// Form Validation Enhancement (Optional)
// ======================================

// Get contact form
const contactForm = document.querySelector('.contact__form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Basic validation
        if (nameInput.value.trim() === '') {
            e.preventDefault();
            alert('Please enter your name.');
            nameInput.focus();
            return;
        }
        
        if (emailInput.value.trim() === '') {
            e.preventDefault();
            alert('Please enter your email.');
            emailInput.focus();
            return;
        }
        
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            emailInput.focus();
            return;
        }
        
        if (messageInput.value.trim() === '') {
            e.preventDefault();
            alert('Please enter a message.');
            messageInput.focus();
            return;
        }
        
        // If validation passes, form will submit to Formspree
        // Show a brief success message
        const submitButton = contactForm.querySelector('.contact__form-button');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Re-enable button after a delay in case of issues (Formspree handles the rest)
        setTimeout(() => {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }, 5000);
    });
}

// ======================================
// Console Welcome Message
// ======================================

console.log('%cWelcome to Alex Johnson\'s Portfolio!', 'color: #4f46e5; font-size: 16px; font-weight: bold;');
console.log('%cThanks for checking out the code! Feel free to explore and learn.', 'color: #6b7280; font-size: 12px;');