const ROOT_ELEMENT = document.documentElement;
const THEME_COLOR_META = document.querySelector('meta[name="theme-color"]');
const DARK_COLOR = '#0f172a';
const LIGHT_COLOR = '#ffffff';

// Fonction pour vérifier la préférence de thème initiale
function getInitialTheme() {
    return localStorage.theme || 'dark';
}

// Fonction pour appliquer le thème avec optimisation des performances
function applyTheme(theme) {
    // Utilisation de requestAnimationFrame pour optimiser les changements visuels
    requestAnimationFrame(() => {
        // Appliquer les classes en une seule opération
        ROOT_ELEMENT.className = theme;
        
        // Mettre à jour localStorage en dehors du cycle de rendu
        setTimeout(() => {
            localStorage.theme = theme;
        }, 0);
        
        // Mise à jour de la meta tag en une seule opération
        if (THEME_COLOR_META) {
            THEME_COLOR_META.content = theme === 'dark' ? DARK_COLOR : LIGHT_COLOR;
        }
        
        // Dispatch d'un événement personnalisé pour la synchronisation
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    });
}

// Fonction optimisée pour basculer entre les thèmes
function toggleTheme() {
    const newTheme = ROOT_ELEMENT.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
}

// Initialisation optimisée du thème
function initTheme() {
    const theme = getInitialTheme();
    applyTheme(theme);
    
    // Utilisation d'un IntersectionObserver pour détecter quand les éléments deviennent visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('theme-transition-ready');
                observer.unobserve(entry.target);
            }
        });
    });
    
    // Observer les éléments qui nécessitent une transition de thème
    document.querySelectorAll('[data-theme-transition]').forEach(el => observer.observe(el));
}

// Optimisation de l'écoute des changements de préférence système
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const handlePreferenceChange = (e) => {
    if (!localStorage.theme) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
};

mediaQuery.addEventListener('change', handlePreferenceChange);

// Initialisation au chargement de la page avec lazy loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

// Gestion du menu mobile
const menuButton = document.getElementById('menuButton');
const closeMenuBtn = document.getElementById('closeMenu');
const mainNav = document.getElementById('mainNav');
const menuOverlay = document.getElementById('menuOverlay');
const body = document.body;

// État du menu
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

// Configuration du menu mobile
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

// Fermer le menu mobile lors du clic sur un lien
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
