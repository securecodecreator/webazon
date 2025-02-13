const ROOT_ELEMENT = document.documentElement;
const THEME_COLOR_META = document.querySelector('meta[name="theme-color"]');
const DARK_COLOR = '#0f172a';
const LIGHT_COLOR = '#ffffff';

function getInitialTheme() {
    return localStorage.theme || 'dark';
}

function applyTheme(theme) {
    requestAnimationFrame(() => {
        ROOT_ELEMENT.className = theme;
        ROOT_ELEMENT.className = theme;
        
        setTimeout(() => {
            localStorage.theme = theme;
        }, 0);
        
        if (THEME_COLOR_META) {
            THEME_COLOR_META.content = theme === 'dark' ? DARK_COLOR : LIGHT_COLOR;
        }
        
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    });
}

function toggleTheme() {
    const newTheme = ROOT_ELEMENT.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
}

function initTheme() {
    const theme = getInitialTheme();
    applyTheme(theme);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('theme-transition-ready');
                observer.unobserve(entry.target);
            }
        });
    });
    
    document.querySelectorAll('[data-theme-transition]').forEach(el => observer.observe(el));
}

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const handlePreferenceChange = (e) => {
    if (!localStorage.theme) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
};

mediaQuery.addEventListener('change', handlePreferenceChange);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

const menuButton = document.getElementById('menuButton');
const closeMenuBtn = document.getElementById('closeMenu');
const mainNav = document.getElementById('mainNav');
const menuOverlay = document.getElementById('menuOverlay');
const body = document.body;

let isMenuOpen = false;

function openMenu() {
    if (isMenuOpen) return;
    
    isMenuOpen = true;
    mainNav.classList.remove('translate-x-full');
    mainNav.classList.add('translate-x-0');
    menuOverlay.classList.remove('hidden');
    body.style.overflow = 'hidden';
    menuButton.classList.add('invisible');
}

function closeMenu() {
    if (!isMenuOpen) return;
    
    isMenuOpen = false;
    mainNav.classList.remove('translate-x-0');
    mainNav.classList.add('translate-x-full');
    menuOverlay.classList.add('hidden');
    body.style.overflow = '';
    
    setTimeout(() => {
        menuButton.classList.remove('invisible');
    }, 300);
}

const mobileMenu = document.getElementById('mobileMenu');

menuButton.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('block');
    } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('block');
    }
});

const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('block');
    });
});

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
    }
}
