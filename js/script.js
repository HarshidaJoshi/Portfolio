/* Harshida Joshi — Portfolio Script */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Walking companion: enter → greet → disappear (every page load) --- */
    const companion = document.getElementById('walk-companion');
    const bubble = document.getElementById('walk-bubble');

    if (companion) {
        if (bubble) bubble.classList.remove('show', 'hide');
        companion.classList.remove('stopped', 'gone');
        companion.classList.add('active');

        /* Stop walking at right edge */
        setTimeout(() => companion.classList.add('stopped'), 3200);

        /* Show "Hello friend!" */
        setTimeout(() => {
            if (bubble) bubble.classList.add('show');
        }, 3600);

        /* Hide bubble */
        setTimeout(() => {
            if (bubble) {
                bubble.classList.remove('show');
                bubble.classList.add('hide');
            }
        }, 6500);

        /* Fade out entire companion */
        setTimeout(() => companion.classList.add('gone'), 7800);
    }

    /* --- Fade-up reveals --- */
    const fadeEls = document.querySelectorAll('.fade-up');
    const fadeObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => fadeObs.observe(el));

    /* --- Nav scrollspy --- */
    const sections = Array.from(document.querySelectorAll('section[id], header[id]'));
    const navLinks = document.querySelectorAll('.nav-link');

    const setActiveNav = () => {
        const scrollPos = window.scrollY + 120;
        let currentId = sections[0]?.id || '';

        sections.forEach((section, i) => {
            const top = section.getBoundingClientRect().top + window.scrollY;
            const next = sections[i + 1];
            const bottom = next
                ? next.getBoundingClientRect().top + window.scrollY
                : top + section.offsetHeight;

            if (scrollPos >= top && scrollPos < bottom) {
                currentId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    };

    window.addEventListener('scroll', setActiveNav, { passive: true });
    window.addEventListener('resize', setActiveNav, { passive: true });
    setActiveNav();

    /* --- Mobile menu --- */
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    const setMenu = (open) => {
        navMenu.classList.toggle('open', open);
        menuBtn.classList.toggle('open', open);
        menuBtn.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
    };

    if (menuBtn) {
        menuBtn.addEventListener('click', () => setMenu(!navMenu.classList.contains('open')));
        navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) setMenu(false);
        });
    }

    /* --- Smooth scroll --- */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                setTimeout(setActiveNav, 100);
                setTimeout(setActiveNav, 500);
            }
        });
    });
});
