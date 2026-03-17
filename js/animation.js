// js/animations.js - Animation Effects

// Pause animations on hover
document.addEventListener('DOMContentLoaded', function() {
    // Pause ad boost slider on hover
    const adBoostSlider = document.getElementById('adBoostSlider');
    if (adBoostSlider) {
        adBoostSlider.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        adBoostSlider.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
    
    // Pause partner scrolling rows on hover
    const scrollRows = document.querySelectorAll('.scroll-row');
    scrollRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.app-card, .partner-card, .startup-table, .affiliate-card');
    elementsToAnimate.forEach(el => observer.observe(el));
});

/* 
// Parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const parallaxElements = hero.querySelectorAll('.phone-mockup');
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            el.style.transform = `translateY(${scrolled * speed}px) rotate(${index === 0 ? -8 : 8}deg)`;
        });
    }
}); 
*/

// Smooth reveal on scroll
window.addEventListener('scroll', function() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
});