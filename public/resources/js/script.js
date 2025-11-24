document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const darkIcon = document.querySelector('.dark-icon');
    const lightIcon = document.querySelector('.light-icon');
    const html = document.documentElement;

    // Check Local Storage or System Preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light') {
        html.setAttribute('data-theme', 'light');
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'block';
    } else if (savedTheme === 'dark') {
        html.removeAttribute('data-theme');
        darkIcon.style.display = 'block';
        lightIcon.style.display = 'none';
    } else {
        // No saved preference, use system
        if (!systemPrefersDark) {
            html.setAttribute('data-theme', 'light');
            darkIcon.style.display = 'none';
            lightIcon.style.display = 'block';
        } else {
            html.removeAttribute('data-theme');
            darkIcon.style.display = 'block';
            lightIcon.style.display = 'none';
        }
    }

    themeToggle.addEventListener('click', () => {
        if (html.getAttribute('data-theme') === 'light') {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            darkIcon.style.display = 'block';
            lightIcon.style.display = 'none';
        } else {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            darkIcon.style.display = 'none';
            lightIcon.style.display = 'block';
        }
    });

    // Mobile Menu
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.section-title, .project-card, .about-text, .education-card, .skill-item, .soft-skill-card, .contact-card');
    hiddenElements.forEach(el => {
        el.classList.add('hidden-element');
        observer.observe(el);
    });

    // Header Scroll Effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active Link Highlighting
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

            if (sectionsClass) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    sectionsClass.classList.add('active');
                } else {
                    sectionsClass.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);
});
