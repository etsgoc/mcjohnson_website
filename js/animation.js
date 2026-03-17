// js/animations.js - Animation Effects

document.addEventListener('DOMContentLoaded', function() {

    // ── PAUSE SCROLL ANIMATIONS ON HOVER ───
    const adBoostSlider = document.getElementById('adBoostSlider');
    if (adBoostSlider) {
        adBoostSlider.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        adBoostSlider.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }

    const scrollRows = document.querySelectorAll('.scroll-row');
    scrollRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        row.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });

    // ── SCROLL REVEAL CSS ─────────────────────────────────────
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal.from-left { transform: translateX(-40px); }
        .reveal.from-right { transform: translateX(40px); }
        .reveal.visible {
            opacity: 1;
            transform: translate(0, 0);
        }
        .reveal-stagger > * {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .reveal-stagger.visible > *:nth-child(1) { transition-delay: 0s; }
        .reveal-stagger.visible > *:nth-child(2) { transition-delay: 0.1s; }
        .reveal-stagger.visible > *:nth-child(3) { transition-delay: 0.2s; }
        .reveal-stagger.visible > *:nth-child(4) { transition-delay: 0.3s; }
        .reveal-stagger.visible > *:nth-child(5) { transition-delay: 0.4s; }
        .reveal-stagger.visible > *:nth-child(6) { transition-delay: 0.5s; }
        .reveal-stagger.visible > * {
            opacity: 1;
            transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
            .reveal, .reveal-stagger > * {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }
    `;
    document.head.appendChild(style);

    // ── SINGLE OBSERVER FOR EVERYTHING ──
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(el) {
        revealObserver.observe(el);
    });

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
