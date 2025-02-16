// Configuration du thème et dépendances
const themeConfig = `
<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    sm: '2rem',
                    lg: '4rem',
                    xl: '5rem',
                }
            }
        }
    }
}
</script>
<style>
.theme-transition-ready {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* Configuration du mode sombre */
@media (prefers-color-scheme: dark) {
    :root {
        color-scheme: dark;
    }
}
</style>

<script>
// Fonction pour gérer le thème
function initTheme() {
    // Vérifie si un thème est déjà enregistré
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');

    // Écouteur pour le changement de thème système
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.classList.toggle('dark', e.matches);
        }
    });
}

// Fonction pour basculer le thème
function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialiser le thème au chargement
document.addEventListener('DOMContentLoaded', initTheme);

// Fonction pour insérer un composant dans la prévisualisation
function insertComponent(html) {
    const container = document.getElementById('preview-container') || document.body;
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    container.appendChild(template.content.firstElementChild);
}
</script>`;

const htmlAssets = {
    headers: {
        simple: {
            name: "En-tête Simple",
            html: `<header class="theme-transition-ready bg-white dark:bg-gray-900 py-4 w-full">
                <div class="container mx-auto px-4">
                    <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold theme-transition-ready text-gray-800 dark:text-white text-center">Votre Titre</h1>
                </div>
            </header>`
        },
        withNav: {
            name: "En-tête avec Navigation",
            html: `<header class="theme-transition-ready bg-white dark:bg-gray-800 py-4 w-full">
                <div class="mx-auto px-4">
                    <nav class="relative z-[100] flex justify-between items-center">
                        <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold theme-transition-ready text-gray-800 dark:text-white">Nom du site</h1>
                        <button id="mobile-menu-button" onclick="this.querySelector('.menu-open').classList.toggle('hidden'); this.querySelector('.menu-close').classList.toggle('hidden'); document.getElementById('mobile-menu').classList.toggle('hidden');" class="sm:hidden theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path class="menu-open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                <path class="menu-close hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <ul id="mobile-menu" class="hidden sm:flex flex-col sm:flex-row absolute sm:relative w-full sm:w-auto left-0 top-full sm:top-auto bg-white dark:bg-gray-900 sm:bg-transparent sm:dark:bg-transparent py-4 sm:py-0 mt-2 sm:mt-0 shadow-lg sm:shadow-none sm:items-center sm:space-x-6">
                            <li><a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-base block sm:inline-block px-4 sm:px-0 py-2 sm:py-0">Accueil</a></li>
                            <li><a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-base block sm:inline-block px-4 sm:px-0 py-2 sm:py-0">Services</a></li>
                            <li><a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-base block sm:inline-block px-4 sm:px-0 py-2 sm:py-0">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>`
        },
        modern: {
            name: "En-tête Moderne",
            html: `<header class="theme-transition-ready bg-white dark:bg-gray-900 shadow-lg py-4 w-full">
                <div class="mx-auto px-4">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center space-x-8">
                            <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Logo</h1>
                            <nav class="hidden md:flex space-x-6">
                                <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Accueil</a>
                                <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Produits</a>
                                <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Services</a>
                                <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Contact</a>
                            </nav>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div class="hidden md:flex space-x-4">
                                <button class="theme-transition-ready px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">Connexion</button>
                                <button class="theme-transition-ready px-4 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800">Inscription</button>
                            </div>
                            <button id="modern-menu-button" onclick="this.querySelector('.menu-open').classList.toggle('hidden'); this.querySelector('.menu-close').classList.toggle('hidden'); document.getElementById('modern-mobile-menu').classList.toggle('hidden');" class="md:hidden theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path class="menu-open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    <path class="menu-close hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <nav id="modern-mobile-menu" class="md:hidden hidden mt-4 space-y-2">
                        <a href="#" class="block theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 py-2">Accueil</a>
                        <a href="#" class="block theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 py-2">Produits</a>
                        <a href="#" class="block theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 py-2">Services</a>
                        <a href="#" class="block theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 py-2">Contact</a>
                        <div class="pt-4 space-y-2">
                            <button class="w-full theme-transition-ready px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">Connexion</button>
                            <button class="w-full theme-transition-ready px-4 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800">Inscription</button>
                        </div>
                    </nav>
                </div>
            </header>`
        },
        minimal: {
            name: "En-tête Minimaliste",
            html: `<header class="theme-transition-ready bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4 w-full">
                <div class="mx-auto px-4">
                    <div class="flex justify-between items-center">
                        <h1 class="text-xl font-medium theme-transition-ready text-gray-800 dark:text-white">MinimalBrand</h1>
                        <div class="flex items-center space-x-4">
                            <nav class="hidden md:flex items-center space-x-4">
                                <a href="#" class="theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Menu</a>
                                <div class="h-4 border-l border-gray-300 dark:border-gray-700"></div>
                                <button class="theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    <i class="fas fa-search"></i>
                                </button>
                            </nav>
                            <button id="minimal-menu-button" onclick="this.querySelector('.menu-open').classList.toggle('hidden'); this.querySelector('.menu-close').classList.toggle('hidden'); document.getElementById('minimal-mobile-menu').classList.toggle('hidden');" class="md:hidden theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path class="menu-open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    <path class="menu-close hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <nav id="minimal-mobile-menu" class="md:hidden hidden mt-3 pt-3 border-t theme-transition-ready border-gray-200 dark:border-gray-800">
                        <a href="#" class="block theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2">Menu</a>
                        <button class="w-full text-left theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2">
                            <i class="fas fa-search mr-2"></i> Rechercher
                        </button>
                    </nav>
                </div>
            </header>`
        },
        gradient: {
            name: "En-tête Gradient",
            html: `<header class="theme-transition-ready bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 py-4 w-full">
                <div class="mx-auto px-4">
                    <div class="flex justify-between items-center">
                        <h1 class="text-2xl font-bold text-white">GradientBrand</h1>
                        <nav class="hidden md:flex items-center space-x-8">
                            <a href="#" class="text-white/90 hover:text-white dark:text-white/80 dark:hover:text-white transition-colors">Accueil</a>
                            <a href="#" class="text-white/90 hover:text-white dark:text-white/80 dark:hover:text-white transition-colors">À propos</a>
                            <a href="#" class="text-white/90 hover:text-white dark:text-white/80 dark:hover:text-white transition-colors">Services</a>
                            <a href="#" class="text-white/90 hover:text-white dark:text-white/80 dark:hover:text-white transition-colors">Contact</a>
                            <button class="px-4 py-2 bg-white text-blue-500 dark:bg-gray-800 dark:text-white rounded-lg hover:bg-opacity-90 dark:hover:bg-gray-700 transition-colors">
                                Commencer
                            </button>
                        </nav>
                        <button id="gradient-menu-button" onclick="this.querySelector('.menu-open').classList.toggle('hidden'); this.querySelector('.menu-close').classList.toggle('hidden'); document.getElementById('gradient-mobile-menu').classList.toggle('hidden');" class="md:hidden text-white">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path class="menu-open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                <path class="menu-close hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <nav id="gradient-mobile-menu" class="md:hidden hidden mt-4 space-y-2">
                        <a href="#" class="block text-white/90 hover:text-white py-2">Accueil</a>
                        <a href="#" class="block text-white/90 hover:text-white py-2">À propos</a>
                        <a href="#" class="block text-white/90 hover:text-white py-2">Services</a>
                        <a href="#" class="block text-white/90 hover:text-white py-2">Contact</a>
                        <button class="mt-2 w-full px-4 py-2 bg-white text-blue-500 dark:bg-gray-800 dark:text-white rounded-lg hover:bg-opacity-90 dark:hover:bg-gray-700 transition-colors">
                            Commencer
                        </button>
                    </nav>
                </div>
            </header>`
        },
        centered: {
            name: "En-tête Centré",
            html: `<header class="theme-transition-ready bg-white dark:bg-gray-900 shadow-md py-4 w-full">
                <div class="mx-auto px-4">
                    <div class="flex md:justify-center justify-between items-center">
                        <h1 class="text-3xl font-bold theme-transition-ready text-gray-900 dark:text-white">CenteredBrand</h1>
                        <button id="centered-menu-button" onclick="this.querySelector('.menu-open').classList.toggle('hidden'); this.querySelector('.menu-close').classList.toggle('hidden'); document.getElementById('centered-mobile-menu').classList.toggle('hidden');" class="md:hidden theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path class="menu-open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                <path class="menu-close hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <nav class="hidden md:flex justify-center mt-4 space-x-8">
                        <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Accueil</a>
                        <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Collection</a>
                        <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Lookbook</a>
                        <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Contact</a>
                    </nav>
                    <nav id="centered-mobile-menu" class="md:hidden hidden mt-4">
                        <div class="flex flex-col justify-between">
                            <a href="#" class="block theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 py-2">Accueil</a>
                            <a href="#" class="block theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 py-2">Collection</a>
                            <a href="#" class="block theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 py-2">Lookbook</a>
                            <a href="#" class="block theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 py-2">Contact</a>
                        </div>
                    </nav>
                </div>
            </header>`
        },
        minuit: {
            name: "En-tête Dégradé Bleu Minuit",
            html: `<header class="relative w-full py-4 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 shadow-lg">
                <div class="mx-auto px-4 max-w-7xl">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center space-x-2">
                            <h1 class="text-2xl font-bold text-white tracking-wider">Brand</h1>
                            <span class="hidden sm:block h-6 w-px bg-blue-400/30"></span>
                            <span class="hidden sm:block text-blue-200 text-sm">Innovation & Design</span>
                        </div>
                        <nav class="hidden md:flex items-center space-x-8">
                            <a href="#" class="text-blue-100 hover:text-white relative group">
                                Accueil
                                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all group-hover:w-full"></span>
                            </a>
                            <a href="#" class="text-blue-100 hover:text-white relative group">
                                Services
                                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all group-hover:w-full"></span>
                            </a>
                            <a href="#" class="text-blue-100 hover:text-white relative group">
                                Portfolio
                                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all group-hover:w-full"></span>
                            </a>
                            <button class="px-6 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-blue-600 hover:border-blue-500">
                                <span class="flex items-center space-x-2">
                                    <span>Nous Contacter</span>
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                    </svg>
                                </span>
                            </button>
                        </nav>
                        <button id="trans-menu-button" onclick="this.querySelector('.menu-open').classList.toggle('hidden'); this.querySelector('.menu-close').classList.toggle('hidden'); document.getElementById('trans-mobile-menu').classList.toggle('hidden');" class="md:hidden text-white p-2 rounded-lg hover:bg-blue-800/50 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path class="menu-open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                <path class="menu-close hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <nav id="trans-mobile-menu" class="md:hidden hidden mt-4 bg-blue-800/50 rounded-lg p-4 backdrop-blur-sm">
                        <div class="space-y-3">
                            <a href="#" class="block text-blue-100 hover:text-white hover:bg-blue-700/50 px-4 py-2 rounded-md transition-colors">Accueil</a>
                            <a href="#" class="block text-blue-100 hover:text-white hover:bg-blue-700/50 px-4 py-2 rounded-md transition-colors">Services</a>
                            <a href="#" class="block text-blue-100 hover:text-white hover:bg-blue-700/50 px-4 py-2 rounded-md transition-colors">Portfolio</a>
                            <a href="#" class="block text-blue-100 hover:text-white hover:bg-blue-700/50 px-4 py-2 rounded-md transition-colors">Contact</a>
                            <button class="w-full mt-4 px-6 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-blue-600 hover:border-blue-500">
                                <span class="flex items-center justify-center space-x-2">
                                    <span>Nous Contacter</span>
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>`
        },
        compact: {
            name: "En-tête Compact",
            html: `<header class="theme-transition-ready bg-white dark:bg-gray-900 py-4 w-full">
                <div class="mx-auto px-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <span class="font-medium theme-transition-ready text-gray-900 dark:text-white">CompactBrand</span>
                        </div>
                        <div class="flex items-center">
                            <nav class="hidden md:flex items-center space-x-6">
                                <a href="#" class="theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">Accueil</a>
                                <a href="#" class="theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">Produits</a>
                                <a href="#" class="theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">Support</a>
                                <button class="theme-transition-ready text-sm px-3 py-1 bg-blue-500 dark:bg-blue-600 text-white rounded-full hover:bg-blue-600 dark:hover:bg-blue-700">Login</button>
                            </nav>
                            <button id="compact-menu-button" onclick="this.querySelector('.menu-open').classList.toggle('hidden'); this.querySelector('.menu-close').classList.toggle('hidden'); document.getElementById('compact-mobile-menu').classList.toggle('hidden');" class="md:hidden theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 ml-4">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path class="menu-open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    <path class="menu-close hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <nav id="compact-mobile-menu" class="md:hidden hidden py-4 space-y-2 border-t theme-transition-ready border-gray-200 dark:border-gray-800 mt-2">
                        <a href="#" class="block theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 py-2">Accueil</a>
                        <a href="#" class="block theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 py-2">Produits</a>
                        <a href="#" class="block theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 py-2">Support</a>
                        <button class="mt-2 w-full theme-transition-ready text-sm px-3 py-1 bg-blue-500 dark:bg-blue-600 text-white rounded-full hover:bg-blue-600 dark:hover:bg-blue-700">Login</button>
                    </nav>
                </div>
            </header>`
        },
        creative: {
            name: "En-tête Créatif",
            html: `<header class="theme-transition-ready bg-white dark:bg-gray-900 relative overflow-hidden py-4 w-full">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5"></div>
                <div class="mx-auto px-4 relative">
                    <div class="flex justify-between items-center">
                        <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">CreativeBrand</h1>
                        <nav class="hidden md:flex items-center space-x-8">
                            <a href="#" class="relative group">
                                <span class="theme-transition-ready text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400">Accueil</span>
                                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 dark:bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                            </a>
                            <a href="#" class="relative group">
                                <span class="theme-transition-ready text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400">Portfolio</span>
                                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 dark:bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                            </a>
                            <a href="#" class="relative group">
                                <span class="theme-transition-ready text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400">Blog</span>
                                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 dark:bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                            </a>
                        </nav>
                        <button id="creative-menu-button" onclick="this.querySelector('.menu-open').classList.toggle('hidden'); this.querySelector('.menu-close').classList.toggle('hidden'); document.getElementById('creative-mobile-menu').classList.toggle('hidden');" class="md:hidden theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path class="menu-open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                <path class="menu-close hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <nav id="creative-mobile-menu" class="md:hidden hidden mt-4 space-y-2">
                        <a href="#" class="block theme-transition-ready text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 py-2">Accueil</a>
                        <a href="#" class="block theme-transition-ready text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 py-2">Portfolio</a>
                        <a href="#" class="block theme-transition-ready text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 py-2">Blog</a>
                    </nav>
                </div>
            </header>`
        },
        ecommerce: {
            name: "En-tête E-commerce",
            html: `<header class="theme-transition-ready bg-white dark:bg-gray-900 w-full">
                <div class="mx-auto">
                    <!-- Barre supérieure -->
                    <div class="py-2 border-b theme-transition-ready border-gray-200 dark:border-gray-800">
                        <div class="flex justify-between items-center px-4">
                            <div class="flex items-center space-x-4">
                                <a href="#" class="theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">Support</a>
                                <a href="#" class="theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">Trouver un magasin</a>
                            </div>
                            <div class="flex items-center space-x-4">
                                <a href="#" class="theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">FR</a>
                                <a href="#" class="theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">EUR €</a>
                            </div>
                        </div>
                    </div>
                    <!-- Barre principale -->
                    <div class="py-4 px-4">
                        <div class="flex justify-between items-center">
                            <h1 class="text-2xl font-bold theme-transition-ready text-gray-900 dark:text-white">ShopBrand</h1>
                            <div class="flex items-center space-x-8">
                                <div class="hidden md:flex items-center space-x-6">
                                    <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Nouveautés</a>
                                    <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Femmes</a>
                                    <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Hommes</a>
                                    <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Enfants</a>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <button class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                                        <i class="fas fa-search text-xl"></i>
                                    </button>
                                    <button class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                                        <i class="fas fa-user text-xl"></i>
                                    </button>
                                    <button class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 relative">
                                        <i class="fas fa-shopping-bag text-xl"></i>
                                        <span class="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 dark:bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">3</span>
                                    </button>
                                    <button id="shop-menu-button" onclick="this.querySelector('.menu-open').classList.toggle('hidden'); this.querySelector('.menu-close').classList.toggle('hidden'); document.getElementById('shop-mobile-menu').classList.toggle('hidden');" class="md:hidden theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path class="menu-open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                            <path class="menu-close hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- Menu mobile -->
                        <nav id="shop-mobile-menu" class="md:hidden hidden mt-4 py-4 space-y-4 theme-transition-ready border-t border-gray-200 dark:border-gray-800">
                            <a href="#" class="block theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-2 py-2">Nouveautés</a>
                            <a href="#" class="block theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-2 py-2">Femmes</a>
                            <a href="#" class="block theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-2 py-2">Hommes</a>
                            <a href="#" class="block theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-2 py-2">Enfants</a>
                            <div class="pt-4 mt-4 border-t theme-transition-ready border-gray-200 dark:border-gray-800">
                                <a href="#" class="block theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 px-2 py-2">Support</a>
                                <a href="#" class="block theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 px-2 py-2">Trouver un magasin</a>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>`
        },
    },

    // Section À propos
    about: {
        simple: {
            name: "À propos Simple",
            html: `<section class="theme-transition-ready bg-white dark:bg-gray-900 py-12">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="max-w-3xl mx-auto text-center">
                        <h2 class="text-3xl font-bold theme-transition-ready text-gray-800 dark:text-white mb-4">À Propos de Nous</h2>
                        <p class="text-lg theme-transition-ready text-gray-600 dark:text-gray-300">Nous sommes une équipe passionnée qui s'efforce d'offrir les meilleures solutions pour nos clients. Notre mission est de créer des expériences exceptionnelles qui dépassent les attentes.</p>
                    </div>
                </div>
            </section>`
        },
        withImage: {
            name: "À propos avec Image",
            html: `<section class="theme-transition-ready bg-white dark:bg-gray-900 py-16">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex flex-col lg:flex-row items-center gap-12">
                        <div class="lg:w-1/2">
                            <img src="https://placehold.co/600x400" alt="Notre équipe" class="rounded-xl shadow-lg">
                        </div>
                        <div class="lg:w-1/2">
                            <h2 class="text-3xl font-bold theme-transition-ready text-gray-800 dark:text-white mb-6">Notre Histoire</h2>
                            <p class="text-lg theme-transition-ready text-gray-600 dark:text-gray-300 mb-6">Fondée en 2020, notre entreprise a toujours eu pour objectif d'innover et d'exceller dans notre domaine. Nous croyons en la puissance de la technologie pour transformer les entreprises.</p>
                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 class="text-2xl font-bold theme-transition-ready text-gray-800 dark:text-white mb-2">100+</h3>
                                    <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Clients satisfaits</p>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-bold theme-transition-ready text-gray-800 dark:text-white mb-2">50+</h3>
                                    <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Projets réalisés</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`
        },
        team: {
            name: "Équipe",
            html: `<section class="theme-transition-ready bg-white dark:bg-gray-900 py-16">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold theme-transition-ready text-gray-800 dark:text-white mb-4">Notre Équipe</h2>
                        <p class="text-lg theme-transition-ready text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Des experts passionnés qui travaillent ensemble pour créer des solutions exceptionnelles.</p>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                            <img src="https://placehold.co/150x150" alt="Membre 1" class="w-32 h-32 rounded-full mx-auto mb-4">
                            <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-2">Jean Dupont</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300 mb-4">CEO & Fondateur</p>
                            <div class="flex justify-center space-x-4">
                                <a href="#" class="text-blue-500 hover:text-blue-600"><i class="fab fa-linkedin"></i></a>
                                <a href="#" class="text-blue-400 hover:text-blue-500"><i class="fab fa-twitter"></i></a>
                            </div>
                        </div>
                        <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                            <img src="https://placehold.co/150x150" alt="Membre 2" class="w-32 h-32 rounded-full mx-auto mb-4">
                            <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-2">Marie Martin</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300 mb-4">Directrice Marketing</p>
                            <div class="flex justify-center space-x-4">
                                <a href="#" class="text-blue-500 hover:text-blue-600"><i class="fab fa-linkedin"></i></a>
                                <a href="#" class="text-blue-400 hover:text-blue-500"><i class="fab fa-twitter"></i></a>
                            </div>
                        </div>
                        <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                            <img src="https://placehold.co/150x150" alt="Membre 3" class="w-32 h-32 rounded-full mx-auto mb-4">
                            <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-2">Pierre Dubois</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300 mb-4">Lead Developer</p>
                            <div class="flex justify-center space-x-4">
                                <a href="#" class="text-blue-500 hover:text-blue-600"><i class="fab fa-linkedin"></i></a>
                                <a href="#" class="text-blue-400 hover:text-blue-500"><i class="fab fa-twitter"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`
        },
        stats: {
            name: "Statistiques",
            html: `<section class="theme-transition-ready bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-16">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div class="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
                            <h3 class="text-4xl font-bold bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent mb-2" data-count="2000" data-suffix="+">0</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Clients</p>
                        </div>
                        <div class="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
                            <h3 class="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2" data-count="500" data-suffix="+">0</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Projets</p>
                        </div>
                        <div class="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
                            <h3 class="text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent mb-2" data-count="50" data-suffix="+">0</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Employés</p>
                        </div>
                        <div class="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
                            <h3 class="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent mb-2" data-count="15" data-suffix="+">0</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Pays</p>
                        </div>
                    </div>
                </div>
            </section>`
        },
        mission: {
            name: "Notre Mission",
            html: `<section class="theme-transition-ready bg-white dark:bg-gray-900 py-16">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="max-w-3xl mx-auto">
                        <div class="text-center mb-12">
                            <h2 class="text-3xl font-bold theme-transition-ready text-gray-800 dark:text-white mb-4">Notre Mission</h2>
                            <p class="text-lg theme-transition-ready text-gray-600 dark:text-gray-300">Transformer le monde numérique en créant des solutions innovantes et accessibles à tous.</p>
                        </div>
                        <div class="grid gap-8">
                            <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                                <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-4">Vision</h3>
                                <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Devenir le leader mondial des solutions numériques innovantes d'ici 2025.</p>
                            </div>
                            <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                                <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-4">Valeurs</h3>
                                <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Innovation, intégrité, collaboration et excellence sont au cœur de tout ce que nous faisons.</p>
                            </div>
                            <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                                <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-4">Objectifs</h3>
                                <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Créer un impact positif sur la société à travers nos solutions technologiques.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`
        },
        values: {
            name: "Nos Valeurs",
            html: `<section class="theme-transition-ready bg-white dark:bg-gray-900 py-16">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold theme-transition-ready text-gray-800 dark:text-white mb-4">Nos Valeurs</h2>
                        <p class="text-lg theme-transition-ready text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Les principes qui guident nos actions et décisions au quotidien.</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 p-8 rounded-xl text-center">
                            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i class="fas fa-lightbulb text-2xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-4">Innovation</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Nous repoussons constamment les limites pour créer des solutions novatrices.</p>
                        </div>
                        <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 p-8 rounded-xl text-center">
                            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i class="fas fa-handshake text-2xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-4">Intégrité</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Nous agissons avec honnêteté et transparence dans toutes nos interactions.</p>
                        </div>
                        <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 p-8 rounded-xl text-center">
                            <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i class="fas fa-users text-2xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-4">Collaboration</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Nous croyons en la force du travail d'équipe et de la diversité.</p>
                        </div>
                    </div>
                </div>
            </section>`
        },
        timeline: {
            name: "Notre Histoire Timeline",
            html: `<section class="theme-transition-ready bg-white dark:bg-gray-900 py-16">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold theme-transition-ready text-gray-800 dark:text-white text-center mb-12">Notre Histoire</h2>
                    <div class="max-w-3xl mx-auto">
                        <div class="space-y-8">
                            <div class="flex">
                                <div class="flex flex-col items-center mr-4">
                                    <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                                    <div class="w-0.5 h-full bg-blue-500"></div>
                                </div>
                                <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 p-6 rounded-xl flex-1">
                                    <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-2">2020</h3>
                                    <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Fondation de l'entreprise</p>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="flex flex-col items-center mr-4">
                                    <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                                    <div class="w-0.5 h-full bg-blue-500"></div>
                                </div>
                                <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 p-6 rounded-xl flex-1">
                                    <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-2">2021</h3>
                                    <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Expansion internationale</p>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="flex flex-col items-center mr-4">
                                    <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                                </div>
                                <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 p-6 rounded-xl flex-1">
                                    <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-2">2022</h3>
                                    <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Lancement de nouveaux produits</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`
        },
        testimonials: {
            name: "Témoignages",
            html: `<section class="theme-transition-ready bg-white dark:bg-gray-900 py-16">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold theme-transition-ready text-gray-800 dark:text-white mb-4">Ce que disent nos clients</h2>
                        <p class="text-lg theme-transition-ready text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Découvrez les expériences de ceux qui nous font confiance.</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                            <div class="flex items-center mb-4">
                                <img src="https://placehold.co/60x60" alt="Client 1" class="w-12 h-12 rounded-full mr-4">
                                <div>
                                    <h3 class="font-semibold theme-transition-ready text-gray-800 dark:text-white">Sophie Laurent</h3>
                                    <p class="text-sm theme-transition-ready text-gray-600 dark:text-gray-300">CEO, TechStart</p>
                                </div>
                            </div>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300">"Une expérience exceptionnelle. L'équipe a su répondre parfaitement à nos besoins."</p>
                        </div>
                        <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                            <div class="flex items-center mb-4">
                                <img src="https://placehold.co/60x60" alt="Client 2" class="w-12 h-12 rounded-full mr-4">
                                <div>
                                    <h3 class="font-semibold theme-transition-ready text-gray-800 dark:text-white">Marc Bernard</h3>
                                    <p class="text-sm theme-transition-ready text-gray-600 dark:text-gray-300">CTO, InnovateCorp</p>
                                </div>
                            </div>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300">"Des solutions innovantes qui ont transformé notre façon de travailler."</p>
                        </div>
                        <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                            <div class="flex items-center mb-4">
                                <img src="https://placehold.co/60x60" alt="Client 3" class="w-12 h-12 rounded-full mr-4">
                                <div>
                                    <h3 class="font-semibold theme-transition-ready text-gray-800 dark:text-white">Julie Moreau</h3>
                                    <p class="text-sm theme-transition-ready text-gray-600 dark:text-gray-300">Directrice Marketing, DigitalPlus</p>
                                </div>
                            </div>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300">"Un partenaire de confiance sur qui nous pouvons compter."</p>
                        </div>
                    </div>
                </div>
            </section>`
        },
        cta: {
            name: "Call-to-Action",
            html: `<section class="theme-transition-ready bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 py-16">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="max-w-3xl mx-auto text-center">
                        <h2 class="text-3xl font-bold text-white mb-6">Prêt à commencer l'aventure avec nous ?</h2>
                        <p class="text-xl text-white/90 mb-8">Rejoignez les milliers d'entreprises qui nous font déjà confiance.</p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <button class="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                Commencer maintenant
                            </button>
                            <button class="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                                En savoir plus
                            </button>
                        </div>
                    </div>
                </div>
            </section>`
        },
        contact: {
            name: "Contact Info",
            html: `<section class="theme-transition-ready bg-white dark:bg-gray-900 py-16">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="max-w-4xl mx-auto">
                        <div class="text-center mb-12">
                            <h2 class="text-3xl font-bold theme-transition-ready text-gray-800 dark:text-white mb-4">Contactez-nous</h2>
                            <p class="text-lg theme-transition-ready text-gray-600 dark:text-gray-300">Nous sommes là pour répondre à toutes vos questions.</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
                                <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i class="fas fa-map-marker-alt text-xl text-white"></i>
                                </div>
                                <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-2">Adresse</h3>
                                <p class="theme-transition-ready text-gray-600 dark:text-gray-300">123 Rue de l'Innovation<br>75000 Paris, France</p>
                            </div>
                            <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
                                <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i class="fas fa-phone text-xl text-white"></i>
                                </div>
                                <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-2">Téléphone</h3>
                                <p class="theme-transition-ready text-gray-600 dark:text-gray-300">+33 1 23 45 67 89<br>Lun-Ven: 9h-18h</p>
                            </div>
                            <div class="theme-transition-ready bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
                                <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i class="fas fa-envelope text-xl text-white"></i>
                                </div>
                                <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-2">Email</h3>
                                <p class="theme-transition-ready text-gray-600 dark:text-gray-300">contact@entreprise.com<br>support@entreprise.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`
        }
    },

    // Sections de contenu
    sections: {
        hero: {
            name: "Section Héro",
            html: `<section class="theme-transition-ready bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 sm:py-20 lg:py-24 px-4 w-full">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div class="text-center space-y-8">
                        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold theme-transition-ready text-gray-900 dark:text-white leading-tight">Titre Principal</h2>
                        <p class="text-xl sm:text-2xl theme-transition-ready text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">Votre texte descriptif ici</p>
                        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <button class="theme-transition-ready bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto">Action Principale</button>
                            <button class="theme-transition-ready bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 transform hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto">En savoir plus</button>
                        </div>
                    </div>
                </div>
            </section>`
        },
        heroWithImage: {
            name: "Section Héro avec Image",
            html: `<section class="theme-transition-ready bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 sm:py-20 lg:py-24 px-4 w-full overflow-hidden">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        <div class="w-full lg:w-1/2 text-center lg:text-left">
                            <span class="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">Nouveau</span>
                            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold theme-transition-ready text-gray-900 dark:text-white mb-6 leading-tight">Titre avec Image</h2>
                            <p class="text-xl theme-transition-ready text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">Une description plus détaillée de votre produit ou service qui capture l'attention de vos visiteurs.</p>
                            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button class="theme-transition-ready bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                                    <span class="flex items-center justify-center gap-2">
                                        <span>Commencer</span>
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                        </svg>
                                    </span>
                                </button>
                                <button class="theme-transition-ready bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 transform hover:-translate-y-0.5 transition-all duration-300">En savoir plus</button>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2">
                            <div class="relative">
                                <div class="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-30 blur-xl"></div>
                                <div class="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                                    <img src="https://placehold.co/800x450" alt="Hero Image" class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`
        },
        heroGradient: {
            name: "Section Héro avec Gradient",
            html: `<section class="relative overflow-hidden theme-transition-ready bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-900 py-20 sm:py-28 lg:py-32 px-4 w-full">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMGgydjMwem0tMiAwSDJ2MmgzMnYtMnptMCAydjI4aDJ2LTI4aC0yem0yLTJ2LTNoLTJ2M2gyem0tMiAwSDB2MmgzNHYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.7))]"></div>
                <div class="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div class="text-center space-y-8">
                        <span class="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold mb-2">
                            <span class="relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            Nouveau
                        </span>
                        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Titre Accrocheur</h2>
                        <p class="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">Une description captivante qui met en valeur votre proposition unique de valeur.</p>
                        <div class="flex flex-col sm:flex-row gap-6 justify-center">
                            <button class="group theme-transition-ready bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                                <span class="flex items-center justify-center gap-2">
                                    <span>Démarrer</span>
                                    <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                    </svg>
                                </span>
                            </button>
                            <button class="theme-transition-ready bg-transparent border-2 border-white/80 hover:border-white text-white rounded-xl text-lg font-semibold px-8 py-4 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                                <span class="flex items-center justify-center gap-2">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <span>Voir la démo</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>`
        },
        features: {
            name: "Section Fonctionnalités",
            html: `<section class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                <div class="max-w-7xl mx-auto">
                    <div class="text-center mb-16">
                        <span class="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">Caractéristiques</span>
                        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold theme-transition-ready text-gray-900 dark:text-white mb-6">Fonctionnalités Essentielles</h2>
                        <p class="text-xl theme-transition-ready text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">Découvrez les fonctionnalités qui font la différence dans votre expérience utilisateur</p>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
                        <div class="theme-transition-ready bg-white dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50 text-center">
                            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg mx-auto">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold theme-transition-ready text-gray-900 dark:text-white mb-4">Fonctionnalité 1</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300 leading-relaxed">Description détaillée de la fonctionnalité avec des exemples concrets d'utilisation.</p>
                        </div>
                        <div class="theme-transition-ready bg-white dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50 text-center">
                            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 shadow-lg mx-auto">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold theme-transition-ready text-gray-900 dark:text-white mb-4">Fonctionnalité 2</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300 leading-relaxed">Description détaillée de la fonctionnalité avec des exemples concrets d'utilisation.</p>
                        </div>
                        <div class="theme-transition-ready bg-white dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50 text-center">
                            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg mx-auto">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold theme-transition-ready text-gray-900 dark:text-white mb-4">Fonctionnalité 3</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300 leading-relaxed">Description détaillée de la fonctionnalité avec des exemples concrets d'utilisation.</p>
                        </div>
                    </div>
                </div>
            </section>`
        },
        featuresWithIcons: {
            name: "Section Fonctionnalités avec Icônes",
            html: `<section class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                <div class="max-w-7xl mx-auto">
                    <div class="text-center mb-16">
                        <span class="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">Fonctionnalités</span>
                        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold theme-transition-ready text-gray-900 dark:text-white mb-6">Nos Fonctionnalités</h2>
                        <p class="text-xl theme-transition-ready text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">Découvrez tout ce que nous pouvons faire pour vous avec notre suite complète d'outils innovants</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
                        <div class="theme-transition-ready bg-white dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50 group">
                            <div class="relative w-14 h-14 mb-8 mx-auto">
                                <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity"></div>
                                <div class="relative w-full h-full bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                                    <i class="fas fa-rocket text-white text-2xl"></i>
                                </div>
                            </div>
                            <h3 class="text-xl font-bold theme-transition-ready text-gray-900 dark:text-white mb-4 text-center">Performance</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-center">Des performances optimales pour une expérience utilisateur exceptionnelle et des résultats rapides.</p>
                            <div class="text-center">
                                <a href="#" class="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                                    En savoir plus
                                    <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div class="theme-transition-ready bg-white dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50 group">
                            <div class="relative w-14 h-14 mb-8 mx-auto">
                                <div class="absolute inset-0 bg-gradient-to-br from-green-600 to-green-400 rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity"></div>
                                <div class="relative w-full h-full bg-gradient-to-br from-green-600 to-green-400 rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                                    <i class="fas fa-shield-alt text-white text-2xl"></i>
                                </div>
                            </div>
                            <h3 class="text-xl font-bold theme-transition-ready text-gray-900 dark:text-white mb-4 text-center">Sécurité</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-center">Protection maximale de vos données avec des protocoles de sécurité avancés.</p>
                            <div class="text-center">
                                <a href="#" class="inline-flex items-center text-green-600 dark:text-green-400 font-semibold group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                                    En savoir plus
                                    <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div class="theme-transition-ready bg-white dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50 group">
                            <div class="relative w-14 h-14 mb-8 mx-auto">
                                <div class="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-400 rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity"></div>
                                <div class="relative w-full h-full bg-gradient-to-br from-purple-600 to-purple-400 rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                                    <i class="fas fa-magic text-white text-2xl"></i>
                                </div>
                            </div>
                            <h3 class="text-xl font-bold theme-transition-ready text-gray-900 dark:text-white mb-4 text-center">Innovation</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-center">Des solutions innovantes et créatives pour répondre à tous vos besoins.</p>
                            <div class="text-center">
                                <a href="#" class="inline-flex items-center text-purple-600 dark:text-purple-400 font-semibold group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                                    En savoir plus
                                    <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`
        },
        featuresGrid: {
            name: "Section Fonctionnalités en Grille",
            html: `<section class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                <div class="max-w-7xl mx-auto">
                    <div class="text-center mb-16">
                        <span class="inline-block px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4">Tout-en-un</span>
                        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold theme-transition-ready text-gray-900 dark:text-white mb-6">Fonctionnalités Complètes</h2>
                        <p class="text-xl theme-transition-ready text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">Une suite complète d'outils puissants pour propulser votre réussite</p>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        <div class="theme-transition-ready bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50 group text-center">
                            <div class="relative w-12 h-12 mb-6 mx-auto">
                                <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl opacity-20 group-hover:opacity-30 blur-lg transition-opacity"></div>
                                <div class="relative w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                                    <i class="fas fa-chart-line text-white text-xl"></i>
                                </div>
                            </div>
                            <h3 class="text-lg font-bold theme-transition-ready text-gray-900 dark:text-white mb-3">Analytique</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Suivez et analysez vos performances en temps réel</p>
                        </div>
                        <div class="theme-transition-ready bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50 group text-center">
                            <div class="relative w-12 h-12 mb-6 mx-auto">
                                <div class="absolute inset-0 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl opacity-20 group-hover:opacity-30 blur-lg transition-opacity"></div>
                                <div class="relative w-full h-full bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                                    <i class="fas fa-users text-white text-xl"></i>
                                </div>
                            </div>
                            <h3 class="text-lg font-bold theme-transition-ready text-gray-900 dark:text-white mb-3">Collaboration</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Travaillez efficacement en équipe</p>
                        </div>
                        <div class="theme-transition-ready bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50 group text-center">
                            <div class="relative w-12 h-12 mb-6 mx-auto">
                                <div class="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl opacity-20 group-hover:opacity-30 blur-lg transition-opacity"></div>
                                <div class="relative w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                                    <i class="fas fa-cloud text-white text-xl"></i>
                                </div>
                            </div>
                            <h3 class="text-lg font-bold theme-transition-ready text-gray-900 dark:text-white mb-3">Cloud</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Accédez à vos données de partout</p>
                        </div>
                        <div class="theme-transition-ready bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50 group text-center">
                            <div class="relative w-12 h-12 mb-6 mx-auto">
                                <div class="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl opacity-20 group-hover:opacity-30 blur-lg transition-opacity"></div>
                                <div class="relative w-full h-full bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                                    <i class="fas fa-lock text-white text-xl"></i>
                                </div>
                            </div>
                            <h3 class="text-lg font-bold theme-transition-ready text-gray-900 dark:text-white mb-3">Sécurité</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Protection avancée de vos données</p>
                        </div>
                    </div>
                </div>
            </section>`
        }
    },

    // Compteurs
    counters: {
        counterSimple: {
            name: "Compteur Inversé",
            html: `<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                <div class="max-w-7xl mx-auto">
                    <div class="text-center mb-16">
                        <span class="inline-block px-4 py-2 rounded-full bg-red-500 text-white text-sm font-semibold mb-4">Offre Limitée</span>
                        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold theme-transition-ready text-gray-900 dark:text-white mb-8">Ne Manquez Pas Cette Opportunité</h2>
                        <p class="text-gray-600 dark:text-gray-400 mb-8">Cette offre exceptionnelle se termine bientôt !</p>
                        <div class="grid grid-cols-4 gap-4 max-w-lg mx-auto mb-8">
                            <div class="theme-transition-ready bg-gradient-to-b from-purple-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                                <div id="days" class="text-4xl lg:text-5xl font-bold text-white">01</div>
                                <div class="text-xs lg:text-sm text-white/90 mt-1">Jours</div>
                            </div>
                            <div class="theme-transition-ready bg-gradient-to-b from-red-500 to-red-600 p-4 rounded-2xl shadow-lg">
                                <div id="hours" class="text-4xl lg:text-5xl font-bold text-white">08</div>
                                <div class="text-xs lg:text-sm text-white/90 mt-1">Heures</div>
                            </div>
                            <div class="theme-transition-ready bg-gradient-to-b from-orange-500 to-orange-600 p-4 rounded-2xl shadow-lg">
                                <div id="minutes" class="text-4xl lg:text-5xl font-bold text-white">20</div>
                                <div class="text-xs lg:text-sm text-white/90 mt-1">Minutes</div>
                            </div>
                            <div class="theme-transition-ready bg-gradient-to-b from-yellow-500 to-yellow-600 p-4 rounded-2xl shadow-lg">
                                <div id="seconds" class="text-4xl lg:text-5xl font-bold text-white">18</div>
                                <div class="text-xs lg:text-sm text-white/90 mt-1">Secondes</div>
                            </div>
                        </div>
                        <button class="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl">
                            Profiter de l'Offre Maintenant
                        </button>
                    </div>
                </div>
                <script>
                    (function() {
                        const STORAGE_KEY = 'countdownEndTime';
                        let endTime = localStorage.getItem(STORAGE_KEY);
                        const COUNTDOWN_DURATION = 60 * 60 * 1000; // 1 heure en millisecondes
                        
                        function resetCountdown() {
                            const now = new Date();
                            endTime = now.getTime() + COUNTDOWN_DURATION;
                            localStorage.setItem(STORAGE_KEY, endTime);
                        }
                        
                        if (!endTime) {
                            resetCountdown();
                        }

                        function updateCountdown() {
                            const now = new Date().getTime();
                            const distance = endTime - now;

                            if (distance < 0) {
                                resetCountdown();
                                return;
                            }

                            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                            document.getElementById('days').textContent = days.toString().padStart(2, '0');
                            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
                        }

                        updateCountdown();
                        setInterval(updateCountdown, 1000);
                    })();
                </script>
            </div>`
        },
        neonCountdown: {
            name: "Compteur Néon Moderne",
            html: `<div class="theme-transition-ready bg-gray-900 p-8 rounded-2xl shadow-2xl">
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-center mb-8 text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 [text-shadow:_0_0_10px_rgb(236_72_153_/_60%)]">
                        Offre Limitée
                    </h2>
                    
                    <div class="flex flex-col items-center space-y-8">
                        <div class="grid grid-cols-4 gap-4 sm:gap-6 w-full max-w-2xl">
                            <div class="flex flex-col items-center">
                                <div id="neon-days" class="text-2xl sm:text-4xl md:text-5xl font-bold text-white p-4 rounded-lg bg-gradient-to-b from-gray-800 to-gray-900 border border-purple-500/30 [text-shadow:_0_0_10px_rgb(168_85_247_/_80%)] [box-shadow:_0_0_15px_rgb(168_85_247_/_30%)]">
                                    00
                                </div>
                                <div class="text-xs sm:text-sm text-purple-400 mt-2 font-medium">Jours</div>
                            </div>
                            
                            <div class="flex flex-col items-center">
                                <div id="neon-hours" class="text-2xl sm:text-4xl md:text-5xl font-bold text-white p-4 rounded-lg bg-gradient-to-b from-gray-800 to-gray-900 border border-blue-500/30 [text-shadow:_0_0_10px_rgb(59_130_246_/_80%)] [box-shadow:_0_0_15px_rgb(59_130_246_/_30%)]">
                                    00
                                </div>
                                <div class="text-xs sm:text-sm text-blue-400 mt-2 font-medium">Heures</div>
                            </div>
                            
                            <div class="flex flex-col items-center">
                                <div id="neon-minutes" class="text-2xl sm:text-4xl md:text-5xl font-bold text-white p-4 rounded-lg bg-gradient-to-b from-gray-800 to-gray-900 border border-pink-500/30 [text-shadow:_0_0_10px_rgb(236_72_153_/_80%)] [box-shadow:_0_0_15px_rgb(236_72_153_/_30%)]">
                                    00
                                </div>
                                <div class="text-xs sm:text-sm text-pink-400 mt-2 font-medium">Minutes</div>
                            </div>
                            
                            <div class="flex flex-col items-center">
                                <div id="neon-seconds" class="text-2xl sm:text-4xl md:text-5xl font-bold text-white p-4 rounded-lg bg-gradient-to-b from-gray-800 to-gray-900 border border-cyan-500/30 [text-shadow:_0_0_10px_rgb(34_211_238_/_80%)] [box-shadow:_0_0_15px_rgb(34_211_238_/_30%)]">
                                    00
                                </div>
                                <div class="text-xs sm:text-sm text-cyan-400 mt-2 font-medium">Secondes</div>
                            </div>
                        </div>
                        
                        <button class="relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgb(168_85_247_/_50%)] group">
                            <span class="relative z-10">Profiter de l'Offre</span>
                            <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                        </button>
                    </div>
                </div>
                
                <script>
                    (function() {
                        const STORAGE_KEY = 'neonCountdownEndTime';
                        let endTime = localStorage.getItem(STORAGE_KEY);
                        const COUNTDOWN_DURATION = 60 * 60 * 1000; // 1 heure
                        
                        function resetCountdown() {
                            const now = new Date();
                            endTime = now.getTime() + COUNTDOWN_DURATION;
                            localStorage.setItem(STORAGE_KEY, endTime);
                        }
                        
                        if (!endTime) {
                            resetCountdown();
                        }

                        function updateCountdown() {
                            const now = new Date().getTime();
                            const distance = endTime - now;

                            if (distance < 0) {
                                resetCountdown();
                                return;
                            }

                            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                            document.getElementById('neon-days').textContent = days.toString().padStart(2, '0');
                            document.getElementById('neon-hours').textContent = hours.toString().padStart(2, '0');
                            document.getElementById('neon-minutes').textContent = minutes.toString().padStart(2, '0');
                            document.getElementById('neon-seconds').textContent = seconds.toString().padStart(2, '0');
                        }

                        updateCountdown();
                        setInterval(updateCountdown, 1000);
                    })();
                </script>
            </div>`
        },
        retro: {
            name: "Compteur Rétro",
            html: `<div class="theme-transition-ready bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                <div class="max-w-3xl mx-auto">
                    <h2 class="text-2xl md:text-3xl font-bold text-center theme-transition-ready text-gray-800 dark:text-gray-200 mb-8">Offre Limitée</h2>
                    
                    <div class="flex justify-center gap-4 md:gap-8 mb-8">
                        <div class="relative w-20 h-24 md:w-24 md:h-28 bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-inner overflow-hidden">
                            <div class="absolute inset-0.5 bg-white dark:bg-gray-900 rounded-md"></div>
                            <span id="retro-days" class="absolute inset-0 flex items-center justify-center font-mono text-3xl md:text-4xl font-bold theme-transition-ready text-gray-800 dark:text-gray-200">00</span>
                            <span class="absolute bottom-1 left-0 right-0 text-center text-xs theme-transition-ready text-gray-600 dark:text-gray-400">JOURS</span>
                        </div>

                        <div class="relative w-20 h-24 md:w-24 md:h-28 bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-inner overflow-hidden">
                            <div class="absolute inset-0.5 bg-white dark:bg-gray-900 rounded-md"></div>
                            <span id="retro-hours" class="absolute inset-0 flex items-center justify-center font-mono text-3xl md:text-4xl font-bold theme-transition-ready text-gray-800 dark:text-gray-200">00</span>
                            <span class="absolute bottom-1 left-0 right-0 text-center text-xs theme-transition-ready text-gray-600 dark:text-gray-400">HEURES</span>
                        </div>

                        <div class="relative w-20 h-24 md:w-24 md:h-28 bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-inner overflow-hidden">
                            <div class="absolute inset-0.5 bg-white dark:bg-gray-900 rounded-md"></div>
                            <span id="retro-minutes" class="absolute inset-0 flex items-center justify-center font-mono text-3xl md:text-4xl font-bold theme-transition-ready text-gray-800 dark:text-gray-200">00</span>
                            <span class="absolute bottom-1 left-0 right-0 text-center text-xs theme-transition-ready text-gray-600 dark:text-gray-400">MINUTES</span>
                        </div>

                        <div class="relative w-20 h-24 md:w-24 md:h-28 bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-inner overflow-hidden">
                            <div class="absolute inset-0.5 bg-white dark:bg-gray-900 rounded-md"></div>
                            <span id="retro-seconds" class="absolute inset-0 flex items-center justify-center font-mono text-3xl md:text-4xl font-bold theme-transition-ready text-gray-800 dark:text-gray-200">00</span>
                            <span class="absolute bottom-1 left-0 right-0 text-center text-xs theme-transition-ready text-gray-600 dark:text-gray-400">SECONDES</span>
                        </div>
                    </div>

                    <button class="mx-auto block px-8 py-3 rounded-lg theme-transition-ready bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium text-lg transition-all duration-300">
                        Profiter de l'Offre
                    </button>
                </div>

                <script>
                    (function() {
                        const STORAGE_KEY = 'retroCountdownEndTime';
                        let endTime = localStorage.getItem(STORAGE_KEY);
                        const COUNTDOWN_DURATION = 60 * 60 * 1000; // 1 heure
                        
                        function resetCountdown() {
                            const now = new Date();
                            endTime = now.getTime() + COUNTDOWN_DURATION;
                            localStorage.setItem(STORAGE_KEY, endTime);
                        }
                        
                        if (!endTime) {
                            resetCountdown();
                        }

                        function updateCountdown() {
                            const now = new Date().getTime();
                            const distance = endTime - now;

                            if (distance < 0) {
                                resetCountdown();
                                return;
                            }

                            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                            // Ajout d'une animation de flip
                            function updateElement(id, value) {
                                const element = document.getElementById(id);
                                if (element.textContent !== value.toString().padStart(2, '0')) {
                                    element.style.transform = 'rotateX(90deg)';
                                    setTimeout(() => {
                                        element.textContent = value.toString().padStart(2, '0');
                                        element.style.transform = 'rotateX(0deg)';
                                    }, 150);
                                }
                            }

                            updateElement('retro-days', days);
                            updateElement('retro-hours', hours);
                            updateElement('retro-minutes', minutes);
                            updateElement('retro-seconds', seconds);
                        }

                        updateCountdown();
                        setInterval(updateCountdown, 1000);

                        
                    })();
                </script>
            </div>`
        },
hologram: {
    name: "Compte à rebours Hologramme",
    html: `<div class="theme-transition-ready bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-2xl relative overflow-hidden">
        <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div class="relative z-10">
            <h2 class="text-center mb-8 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">Temps Restant</h2>
            
            <div class="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div class="relative group">
                    <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div class="relative bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
                        <div id="holo-days" class="text-4xl font-bold text-center text-cyan-400 mb-2 [text-shadow:0_0_15px_rgba(34,211,238,0.5)]">00</div>
                        <div class="text-sm text-center text-cyan-300/80">Jours</div>
                    </div>
                </div>
                
                <div class="relative group">
                    <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div class="relative bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
                        <div id="holo-hours" class="text-4xl font-bold text-center text-cyan-400 mb-2 [text-shadow:0_0_15px_rgba(34,211,238,0.5)]">00</div>
                        <div class="text-sm text-center text-cyan-300/80">Heures</div>
                    </div>
                </div>
                
                <div class="relative group">
                    <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div class="relative bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
                        <div id="holo-minutes" class="text-4xl font-bold text-center text-cyan-400 mb-2 [text-shadow:0_0_15px_rgba(34,211,238,0.5)]">00</div>
                        <div class="text-sm text-center text-cyan-300/80">Minutes</div>
                    </div>
                </div>
                
                <div class="relative group">
                    <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div class="relative bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
                        <div id="holo-seconds" class="text-4xl font-bold text-center text-cyan-400 mb-2 [text-shadow:0_0_15px_rgba(34,211,238,0.5)]">00</div>
                        <div class="text-sm text-center text-cyan-300/80">Secondes</div>
                    </div>
                </div>
            </div>

            <style>
                .bg-grid-pattern {
                    background-image: linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px);
                    background-size: 20px 20px;
                }
            </style>

            <script>
                (function() {
                    const COUNTDOWN_DURATION = 24 * 60 * 60 * 1000; // 24 heures
                    const STORAGE_KEY = 'holoCountdownEnd';
                    let endTime = parseInt(localStorage.getItem(STORAGE_KEY));

                    function resetCountdown() {
                        const now = new Date();
                        endTime = now.getTime() + COUNTDOWN_DURATION;
                        localStorage.setItem(STORAGE_KEY, endTime);
                    }

                    if (!endTime) {
                        resetCountdown();
                    }

                    function updateCountdown() {
                        const now = new Date().getTime();
                        const distance = endTime - now;

                        if (distance < 0) {
                            resetCountdown();
                            return;
                        }

                        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                        function updateElement(id, value) {
                            const element = document.getElementById(id);
                            if (element && element.textContent !== value.toString().padStart(2, '0')) {
                                element.style.transform = 'perspective(400px) rotateX(90deg)';
                                element.style.opacity = '0';
                                setTimeout(() => {
                                    element.textContent = value.toString().padStart(2, '0');
                                    element.style.transform = 'perspective(400px) rotateX(0deg)';
                                    element.style.opacity = '1';
                                }, 150);
                            }
                        }

                        updateElement('holo-days', days);
                        updateElement('holo-hours', hours);
                        updateElement('holo-minutes', minutes);
                        updateElement('holo-seconds', seconds);
                    }

                    updateCountdown();
                    setInterval(updateCountdown, 1000);
                })();
            </script>
        </div>
    </div>`
}
},
    
    
    // Formulaires
    forms: {
        contact: {
            name: "Formulaire de Contact",
            html: `<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form class="theme-transition-ready max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow w-full sm:w-11/12 lg:w-full">
                    <div class="mb-4">
                        <label class="block theme-transition-ready text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base">Nom</label>
                        <input type="text" class="theme-transition-ready w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent">
                    </div>
                    <div class="mb-4">
                        <label class="block theme-transition-ready text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base">Email</label>
                        <input type="email" class="theme-transition-ready w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent">
                    </div>
                    <div class="mb-4">
                        <label class="block theme-transition-ready text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base">Message</label>
                        <textarea class="theme-transition-ready w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent" rows="4"></textarea>
                    </div>
                    <button type="submit" class="theme-transition-ready w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 rounded-lg text-sm sm:text-base">Envoyer</button>
                </form>
            </div>`
        },
        login: {
            name: "Formulaire de Connexion",
            html: `<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form class="theme-transition-ready max-w-sm mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
                    <h2 class="text-2xl font-bold mb-6 text-center theme-transition-ready text-gray-800 dark:text-white">Connexion</h2>
                    <div class="mb-4">
                        <label class="block theme-transition-ready text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <input type="email" class="theme-transition-ready w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent">
                    </div>
                    <div class="mb-6">
                        <label class="block theme-transition-ready text-gray-700 dark:text-gray-300 mb-2">Mot de passe</label>
                        <input type="password" class="theme-transition-ready w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent">
                        <a href="#" class="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mt-2 inline-block">Mot de passe oublié ?</a>
                    </div>
                    <button type="submit" class="theme-transition-ready w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 rounded-lg mb-4">Se connecter</button>
                    <p class="text-center theme-transition-ready text-gray-600 dark:text-gray-400">
                        Pas encore de compte ? 
                        <a href="#" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">S'inscrire</a>
                    </p>
                </form>
            </div>`
        },
        register: {
            name: "Formulaire d'Inscription",
            html: `<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form class="theme-transition-ready max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
                    <h2 class="text-2xl font-bold mb-6 text-center theme-transition-ready text-gray-800 dark:text-white">Créer un compte</h2>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="block theme-transition-ready text-gray-700 dark:text-gray-300 mb-2">Prénom</label>
                            <input type="text" class="theme-transition-ready w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent">
                        </div>
                        <div>
                            <label class="block theme-transition-ready text-gray-700 dark:text-gray-300 mb-2">Nom</label>
                            <input type="text" class="theme-transition-ready w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent">
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="block theme-transition-ready text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <input type="email" class="theme-transition-ready w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent">
                    </div>
                    <div class="mb-4">
                        <label class="block theme-transition-ready text-gray-700 dark:text-gray-300 mb-2">Mot de passe</label>
                        <input type="password" class="theme-transition-ready w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent">
                    </div>
                    <div class="mb-6">
                        <label class="block theme-transition-ready text-gray-700 dark:text-gray-300 mb-2">Confirmer le mot de passe</label>
                        <input type="password" class="theme-transition-ready w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent">
                    </div>
                    <div class="mb-6">
                        <label class="flex items-center">
                            <input type="checkbox" class="form-checkbox text-blue-500 dark:text-blue-400">
                            <span class="ml-2 theme-transition-ready text-gray-600 dark:text-gray-400">J'accepte les conditions d'utilisation</span>
                        </label>
                    </div>
                    <button type="submit" class="theme-transition-ready w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 rounded-lg mb-4">S'inscrire</button>
                    <p class="text-center theme-transition-ready text-gray-600 dark:text-gray-400">
                        Déjà inscrit ? 
                        <a href="#" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">Se connecter</a>
                    </p>
                </form>
            </div>`
        },
        newsletter: {
            name: "Inscription Newsletter",
            html: `<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="theme-transition-ready max-w-2xl mx-auto p-8 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 rounded-xl shadow-lg">
                    <div class="text-center mb-6">
                        <h3 class="text-2xl font-bold text-white mb-2">Restez informé</h3>
                        <p class="text-white/90">Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités</p>
                    </div>
                    <form class="flex flex-col sm:flex-row gap-4">
                        <input type="email" placeholder="Votre adresse email" class="theme-transition-ready flex-1 px-4 py-3 rounded-lg border-2 border-transparent focus:border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/20">
                        <button type="submit" class="theme-transition-ready px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold transition-colors duration-200">S'inscrire</button>
                    </form>
                    <p class="text-white/70 text-sm mt-4 text-center">Vous pouvez vous désinscrire à tout moment. En vous inscrivant, vous acceptez notre politique de confidentialité.</p>
                </div>
            </div>`
        },
        search: {
            name: "Barre de Recherche",
            html: `<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div class="theme-transition-ready max-w-2xl mx-auto">
                    <div class="relative">
                        <input type="search" placeholder="Rechercher..." class="theme-transition-ready w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i class="fas fa-search theme-transition-ready text-gray-400 dark:text-gray-500"></i>
                        </div>
                        <button class="theme-transition-ready absolute inset-y-0 right-0 px-4 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                            <i class="fas fa-sliders-h"></i>
                        </button>
                    </div>
                    <div class="mt-2 flex flex-wrap gap-2">
                        <button class="theme-transition-ready px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400">Populaire</button>
                        <button class="theme-transition-ready px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400">Récent</button>
                        <button class="theme-transition-ready px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400">Tendances</button>
                    </div>
                </div>
            </div>`
        },
        searchAdvanced: {
            name: "Recherche Avancée",
            html: `<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="theme-transition-ready max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
                    <h3 class="text-xl font-semibold mb-6 theme-transition-ready text-gray-800 dark:text-white">Recherche avancée</h3>
                    <form>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label class="block theme-transition-ready text-gray-700 dark:text-gray-300 mb-2">Mots-clés</label>
                                <input type="text" class="theme-transition-ready w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent">
                            </div>
                            <div>
                                <label class="block theme-transition-ready text-gray-700 dark:text-gray-300 mb-2">Catégorie</label>
                                <select class="theme-transition-ready w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent">
                                    <option>Toutes les catégories</option>
                                    <option>Catégorie 1</option>
                                    <option>Catégorie 2</option>
                                    <option>Catégorie 3</option>
                                </select>
                            </div>
                            <div>
                                <label class="block theme-transition-ready text-gray-700 dark:text-gray-300 mb-2">Date de début</label>
                                <input type="date" class="theme-transition-ready w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent">
                            </div>
                            <div>
                                <label class="block theme-transition-ready text-gray-700 dark:text-gray-300 mb-2">Date de fin</label>
                                <input type="date" class="theme-transition-ready w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent">
                            </div>
                        </div>
                        <div class="flex flex-col sm:flex-row gap-4 justify-end">
                            <button type="reset" class="theme-transition-ready px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Réinitialiser</button>
                            <button type="submit" class="theme-transition-ready px-6 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg">Rechercher</button>
                        </div>
                    </form>
                </div>
            </div>`
        }
    },

    // FAQ
    faq: {
        simple: {
            name: "FAQ Simple",
            html: `<div class="max-w-3xl mx-auto p-6">
                <div class="space-y-4">
                    <details class="theme-transition-ready bg-white dark:bg-gray-800 rounded-lg">
                        <summary class="px-4 py-3 cursor-pointer theme-transition-ready text-gray-800 dark:text-white font-medium">Comment puis-je créer un compte ?</summary>
                        <div class="px-4 py-3 theme-transition-ready text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
                            Pour créer un compte, cliquez sur le bouton "S'inscrire" en haut à droite de la page et suivez les instructions.
                        </div>
                    </details>
                    <details class="theme-transition-ready bg-white dark:bg-gray-800 rounded-lg">
                        <summary class="px-4 py-3 cursor-pointer theme-transition-ready text-gray-800 dark:text-white font-medium">Comment réinitialiser mon mot de passe ?</summary>
                        <div class="px-4 py-3 theme-transition-ready text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
                            Cliquez sur "Mot de passe oublié" sur la page de connexion et suivez les instructions envoyées par email.
                        </div>
                    </details>
                </div>
            </div>`
        },
        modern: {
            name: "FAQ Moderne",
            html: `<div class="max-w-3xl mx-auto p-6">
                <div class="space-y-4">
                    <div class="theme-transition-ready bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <details class="group">
                            <summary class="flex items-center justify-between px-6 py-4 cursor-pointer">
                                <h3 class="theme-transition-ready text-gray-800 dark:text-white font-medium">Quels sont les modes de paiement acceptés ?</h3>
                                <span class="theme-transition-ready text-blue-500 group-open:rotate-180 transition-transform">
                                    <i class="fas fa-chevron-down"></i>
                                </span>
                            </summary>
                            <div class="px-6 py-4 theme-transition-ready text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700">
                                Nous acceptons les cartes de crédit (Visa, MasterCard, American Express), PayPal et les virements bancaires.
                            </div>
                        </details>
                    </div>
                    <div class="theme-transition-ready bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <details class="group">
                            <summary class="flex items-center justify-between px-6 py-4 cursor-pointer">
                                <h3 class="theme-transition-ready text-gray-800 dark:text-white font-medium">Quel est le délai de livraison ?</h3>
                                <span class="theme-transition-ready text-blue-500 group-open:rotate-180 transition-transform">
                                    <i class="fas fa-chevron-down"></i>
                                </span>
                            </summary>
                            <div class="px-6 py-4 theme-transition-ready text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700">
                                Le délai de livraison varie entre 3 et 5 jours ouvrables selon votre localisation.
                            </div>
                        </details>
                    </div>
                </div>
            </div>`
        },
        gradient: {
            name: "FAQ Gradient",
            html: `<div class="max-w-3xl mx-auto p-6">
                <div class="space-y-4">
                    <details class="group theme-transition-ready bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md">
                        <summary class="flex items-center justify-between px-6 py-4 cursor-pointer">
                            <h3 class="theme-transition-ready text-gray-800 dark:text-white font-medium">Comment contacter le support ?</h3>
                            <span class="theme-transition-ready text-blue-500 group-open:rotate-180 transition-transform">
                                <i class="fas fa-chevron-down"></i>
                            </span>
                        </summary>
                        <div class="px-6 py-4 theme-transition-ready text-gray-600 dark:text-gray-300 border-t border-gray-200/50 dark:border-gray-600/50">
                            Notre équipe support est disponible 24/7 via email ou chat en direct.
                        </div>
                    </details>
                    <details class="group theme-transition-ready bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md">
                        <summary class="flex items-center justify-between px-6 py-4 cursor-pointer">
                            <h3 class="theme-transition-ready text-gray-800 dark:text-white font-medium">Quelle est la politique de retour ?</h3>
                            <span class="theme-transition-ready text-blue-500 group-open:rotate-180 transition-transform">
                                <i class="fas fa-chevron-down"></i>
                            </span>
                        </summary>
                        <div class="px-6 py-4 theme-transition-ready text-gray-600 dark:text-gray-300 border-t border-gray-200/50 dark:border-gray-600/50">
                            Vous disposez de 30 jours pour retourner un produit non utilisé.
                        </div>
                    </details>
                </div>
            </div>`
        },
        boxed: {
            name: "FAQ Encadrée",
            html: `<div class="max-w-3xl mx-auto p-6">
                <div class="theme-transition-ready bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
                    <details class="group">
                        <summary class="flex items-center gap-4 cursor-pointer">
                            <span class="flex-none w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                <i class="fas fa-question"></i>
                            </span>
                            <h3 class="theme-transition-ready text-gray-800 dark:text-white font-medium">Quelles sont les fonctionnalités principales ?</h3>
                            <span class="ml-auto theme-transition-ready text-blue-500 group-open:rotate-180 transition-transform">
                                <i class="fas fa-chevron-down"></i>
                            </span>
                        </summary>
                        <div class="mt-4 ml-12 theme-transition-ready text-gray-600 dark:text-gray-300">
                            Nos fonctionnalités principales incluent la gestion de projet, le suivi du temps et la collaboration en temps réel.
                        </div>
                    </details>
                    <div class="border-t border-gray-200 dark:border-gray-700"></div>
                    <details class="group">
                        <summary class="flex items-center gap-4 cursor-pointer">
                            <span class="flex-none w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                                <i class="fas fa-cog"></i>
                            </span>
                            <h3 class="theme-transition-ready text-gray-800 dark:text-white font-medium">Comment configurer mon compte ?</h3>
                            <span class="ml-auto theme-transition-ready text-blue-500 group-open:rotate-180 transition-transform">
                                <i class="fas fa-chevron-down"></i>
                            </span>
                        </summary>
                        <div class="mt-4 ml-12 theme-transition-ready text-gray-600 dark:text-gray-300">
                            La configuration se fait en quelques étapes simples depuis votre tableau de bord.
                        </div>
                    </details>
                </div>
            </div>`
        },
        numbered: {
            name: "FAQ Numérotée",
            html: `<div class="max-w-3xl mx-auto p-6">
                <div class="space-y-4">
                    <div class="theme-transition-ready bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                        <details class="group">
                            <summary class="flex items-center gap-4 px-6 py-4 cursor-pointer">
                                <span class="flex-none w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 flex items-center justify-center font-semibold">1</span>
                                <h3 class="theme-transition-ready text-gray-800 dark:text-white font-medium">Comment démarrer un projet ?</h3>
                                <span class="ml-auto theme-transition-ready text-blue-500 group-open:rotate-180 transition-transform">
                                    <i class="fas fa-chevron-down"></i>
                                </span>
                            </summary>
                            <div class="px-6 py-4 ml-12 theme-transition-ready text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700">
                                Cliquez sur "Nouveau Projet" et suivez l'assistant de création pas à pas.
                            </div>
                        </details>
                    </div>
                    <div class="theme-transition-ready bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                        <details class="group">
                            <summary class="flex items-center gap-4 px-6 py-4 cursor-pointer">
                                <span class="flex-none w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 flex items-center justify-center font-semibold">2</span>
                                <h3 class="theme-transition-ready text-gray-800 dark:text-white font-medium">Comment inviter des collaborateurs ?</h3>
                                <span class="ml-auto theme-transition-ready text-blue-500 group-open:rotate-180 transition-transform">
                                    <i class="fas fa-chevron-down"></i>
                                </span>
                            </summary>
                            <div class="px-6 py-4 ml-12 theme-transition-ready text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700">
                                Dans les paramètres du projet, utilisez la section "Invitations" pour ajouter des membres.
                            </div>
                        </details>
                    </div>
                </div>
            </div>`
        },
        cards: {
            name: "FAQ Accordéon Animé",
            html: `<div class="max-w-3xl mx-auto p-6">
                <div class="space-y-4">
                    <details class="group theme-transition-ready bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <summary class="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                    <i class="fas fa-shield-alt text-blue-500 dark:text-blue-400"></i>
                                </div>
                                <h3 class="theme-transition-ready text-gray-800 dark:text-white font-medium">Sécurité des données</h3>
                            </div>
                            <div class="theme-transition-ready transform group-open:rotate-180">
                                <i class="fas fa-chevron-down text-blue-500 dark:text-blue-400"></i>
                            </div>
                        </summary>
                        <div class="px-6 py-4 theme-transition-ready text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                            <p class="mb-2">Vos données sont protégées par :</p>
                            <ul class="list-disc list-inside space-y-1 ml-4">
                                <li>Cryptage de bout en bout</li>
                                <li>Authentification à deux facteurs</li>
                                <li>Sauvegardes automatiques</li>
                            </ul>
                        </div>
                    </details>
                    <details class="group theme-transition-ready bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <summary class="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                    <i class="fas fa-sync text-green-500 dark:text-green-400"></i>
                                </div>
                                <h3 class="theme-transition-ready text-gray-800 dark:text-white font-medium">Mises à jour</h3>
                            </div>
                            <div class="theme-transition-ready transform group-open:rotate-180">
                                <i class="fas fa-chevron-down text-green-500 dark:text-green-400"></i>
                            </div>
                        </summary>
                        <div class="px-6 py-4 theme-transition-ready text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                            <p>Les mises à jour sont automatiques et incluent :</p>
                            <ul class="list-disc list-inside space-y-1 ml-4">
                                <li>Nouvelles fonctionnalités</li>
                                <li>Corrections de bugs</li>
                                <li>Améliorations de sécurité</li>
                            </ul>
                        </div>
                    </details>
                </div>
            </div>`
        },
        sidebar: {
            name: "FAQ Accordéon Interactif",
            html: `<div class="max-w-3xl mx-auto p-6">
                <div class="space-y-4">
                    <details class="group theme-transition-ready bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <summary class="relative flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 overflow-hidden">
                            <div class="flex items-center gap-4 z-10">
                                <span class="flex-none w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-500 flex items-center justify-center font-semibold">Q</span>
                                <h3 class="theme-transition-ready text-gray-800 dark:text-white font-medium">Comment puis-je accéder à mon compte ?</h3>
                            </div>
                            <div class="theme-transition-ready transform group-open:rotate-180 z-10">
                                <i class="fas fa-chevron-down text-purple-500"></i>
                            </div>
                            <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </summary>
                        <div class="px-6 py-4 theme-transition-ready text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                            <div class="flex gap-4">
                                <span class="flex-none w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 flex items-center justify-center font-semibold">R</span>
                                <p>Connectez-vous en utilisant votre email et mot de passe. Si vous avez oublié vos identifiants, utilisez l'option "Mot de passe oublié".</p>
                            </div>
                        </div>
                    </details>
                    <details class="group theme-transition-ready bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <summary class="relative flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 overflow-hidden">
                            <div class="flex items-center gap-4 z-10">
                                <span class="flex-none w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-500 flex items-center justify-center font-semibold">Q</span>
                                <h3 class="theme-transition-ready text-gray-800 dark:text-white font-medium">Comment modifier mes paramètres ?</h3>
                            </div>
                            <div class="theme-transition-ready transform group-open:rotate-180 z-10">
                                <i class="fas fa-chevron-down text-purple-500"></i>
                            </div>
                            <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </summary>
                        <div class="px-6 py-4 theme-transition-ready text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                            <div class="flex gap-4">
                                <span class="flex-none w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 flex items-center justify-center font-semibold">R</span>
                                <p>Accédez à votre tableau de bord et cliquez sur "Paramètres". Vous pourrez y modifier vos préférences personnelles.</p>
                            </div>
                        </div>
                    </details>
                </div>
            </div>`
        },
        grid: {
            name: "FAQ Accordéon Élégant",
            html: `<div class="max-w-3xl mx-auto p-6">
                <div class="space-y-4">
                    <details class="group theme-transition-ready bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <summary class="flex items-center justify-between px-6 py-4 cursor-pointer bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/40 dark:hover:to-purple-900/40">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                                    <i class="fas fa-user-shield text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="theme-transition-ready text-gray-800 dark:text-white font-medium">Protection des données</h3>
                                    <p class="text-sm theme-transition-ready text-gray-500 dark:text-gray-400">Sécurité et confidentialité</p>
                                </div>
                            </div>
                            <div class="theme-transition-ready transform group-open:rotate-180">
                                <i class="fas fa-chevron-down text-blue-500 dark:text-blue-400"></i>
                            </div>
                        </summary>
                        <div class="theme-transition-ready bg-white dark:bg-gray-800">
                            <div class="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
                                <div class="prose dark:prose-invert max-w-none theme-transition-ready text-gray-600 dark:text-gray-300">
                                    <p>Nous prenons la sécurité de vos données très au sérieux. Voici nos mesures de protection :</p>
                                    <ul class="list-disc list-inside space-y-2 mt-2">
                                        <li>Cryptage de bout en bout</li>
                                        <li>Authentification multi-facteurs</li>
                                        <li>Surveillance 24/7</li>
                                        <li>Conformité RGPD</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </details>
                    <details class="group theme-transition-ready bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <summary class="flex items-center justify-between px-6 py-4 cursor-pointer bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 hover:from-green-100 hover:to-teal-100 dark:hover:from-green-900/40 dark:hover:to-teal-900/40">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white shadow-lg">
                                    <i class="fas fa-headset text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="theme-transition-ready text-gray-800 dark:text-white font-medium">Support client</h3>
                                    <p class="text-sm theme-transition-ready text-gray-500 dark:text-gray-400">Assistance et aide</p>
                                </div>
                            </div>
                            <div class="theme-transition-ready transform group-open:rotate-180">
                                <i class="fas fa-chevron-down text-green-500 dark:text-green-400"></i>
                            </div>
                        </summary>
                        <div class="theme-transition-ready bg-white dark:bg-gray-800">
                            <div class="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
                                <div class="prose dark:prose-invert max-w-none theme-transition-ready text-gray-600 dark:text-gray-300">
                                    <p>Notre équipe support est disponible pour vous aider :</p>
                                    <ul class="list-disc list-inside space-y-2 mt-2">
                                        <li>Support 24/7</li>
                                        <li>Chat en direct</li>
                                        <li>Email support</li>
                                        <li>Base de connaissances</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </details>
                </div>
            </div>`
        },
        minimal: {
            name: "FAQ Minimale",
            html: `<div class="max-w-3xl mx-auto p-6">
                <div class="space-y-6">
                    <details class="group">
                        <summary class="flex items-center justify-between cursor-pointer pb-3 theme-transition-ready text-gray-800 dark:text-white font-medium border-b border-gray-200 dark:border-gray-700">
                            <span>Quelle est la durée d'engagement ?</span>
                            <span class="theme-transition-ready text-blue-500 group-open:rotate-180 transition-transform">
                                <i class="fas fa-plus group-open:hidden"></i>
                                <i class="fas fa-minus hidden group-open:block"></i>
                            </span>
                        </summary>
                        <div class="pt-3 theme-transition-ready text-gray-600 dark:text-gray-300">
                            Aucun engagement de durée, vous pouvez annuler à tout moment.
                        </div>
                    </details>
                    <details class="group">
                        <summary class="flex items-center justify-between cursor-pointer pb-3 theme-transition-ready text-gray-800 dark:text-white font-medium border-b border-gray-200 dark:border-gray-700">
                            <span>Y a-t-il une période d'essai ?</span>
                            <span class="theme-transition-ready text-blue-500 group-open:rotate-180 transition-transform">
                                <i class="fas fa-plus group-open:hidden"></i>
                                <i class="fas fa-minus hidden group-open:block"></i>
                            </span>
                        </summary>
                        <div class="pt-3 theme-transition-ready text-gray-600 dark:text-gray-300">
                            Oui, vous bénéficiez d'une période d'essai gratuite de 14 jours.
                        </div>
                    </details>
                </div>
            </div>`
        },
        interactive: {
            name: "FAQ Interactive",
            html: `<div class="max-w-3xl mx-auto p-6">
                <div class="space-y-4">
                    <details class="group theme-transition-ready bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <summary class="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div class="flex items-center gap-4">
                                <span class="flex-none w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 flex items-center justify-center">
                                    <i class="fas fa-laptop"></i>
                                </span>
                                <h3 class="theme-transition-ready text-gray-800 dark:text-white font-medium">Configuration requise</h3>
                            </div>
                            <span class="theme-transition-ready text-blue-500 group-open:rotate-180 transition-transform">
                                <i class="fas fa-chevron-down"></i>
                            </span>
                        </summary>
                        <div class="px-6 py-4 theme-transition-ready text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50">
                            <ul class="space-y-2 list-disc list-inside">
                                <li>Navigateur web moderne</li>
                                <li>Connexion Internet stable</li>
                                <li>2GB RAM minimum</li>
                            </ul>
                        </div>
                    </details>
                    <details class="group theme-transition-ready bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <summary class="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div class="flex items-center gap-4">
                                <span class="flex-none w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 text-green-500 flex items-center justify-center">
                                    <i class="fas fa-credit-card"></i>
                                </span>
                                <h3 class="theme-transition-ready text-gray-800 dark:text-white font-medium">Options de paiement</h3>
                            </div>
                            <span class="theme-transition-ready text-blue-500 group-open:rotate-180 transition-transform">
                                <i class="fas fa-chevron-down"></i>
                            </span>
                        </summary>
                        <div class="px-6 py-4 theme-transition-ready text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50">
                            <div class="flex flex-wrap gap-4">
                                <span class="px-3 py-1 bg-white dark:bg-gray-600 rounded-full text-sm">Visa</span>
                                <span class="px-3 py-1 bg-white dark:bg-gray-600 rounded-full text-sm">MasterCard</span>
                                <span class="px-3 py-1 bg-white dark:bg-gray-600 rounded-full text-sm">PayPal</span>
                            </div>
                        </div>
                    </details>
                </div>
            </div>`
        },
        shareButtons: {
            name: "Boutons de Partage",
            html: `<div class="flex flex-wrap justify-center gap-4 p-4">
                <button class="theme-transition-ready flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                    <i class="fab fa-facebook-f"></i>
                    <span>Partager</span>
                </button>
                <button class="theme-transition-ready flex items-center gap-2 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg">
                    <i class="fab fa-twitter"></i>
                    <span>Tweet</span>
                </button>
                <button class="theme-transition-ready flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">
                    <i class="fab fa-whatsapp"></i>
                    <span>WhatsApp</span>
                </button>
                <button class="theme-transition-ready flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg">
                    <i class="fab fa-linkedin-in"></i>
                    <span>LinkedIn</span>
                </button>
            </div>`
        },
        minimalShare: {
            name: "Partage Minimal",
            html: `<div class="flex items-center justify-center gap-6 p-4">
                <button class="theme-transition-ready group flex flex-col items-center">
                    <span class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-500 group-hover:text-white">
                        <i class="fab fa-facebook-f text-xl"></i>
                    </span>
                    <span class="mt-2 text-sm text-gray-600 dark:text-gray-400">12k</span>
                </button>
                <button class="theme-transition-ready group flex flex-col items-center">
                    <span class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-400 group-hover:text-white">
                        <i class="fab fa-twitter text-xl"></i>
                    </span>
                    <span class="mt-2 text-sm text-gray-600 dark:text-gray-400">8.5k</span>
                </button>
                <button class="theme-transition-ready group flex flex-col items-center">
                    <span class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-pink-500 group-hover:text-white">
                        <i class="fab fa-instagram text-xl"></i>
                    </span>
                    <span class="mt-2 text-sm text-gray-600 dark:text-gray-400">15k</span>
                </button>
            </div>`
        },
        shareCard: {
            name: "Carte de Partage",
            html: `<div class="max-w-sm mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h3 class="text-lg font-semibold mb-4 theme-transition-ready text-gray-800 dark:text-white">Partagez cet article</h3>
                <div class="flex flex-wrap gap-3">
                    <button class="theme-transition-ready flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-blue-500 hover:text-white rounded-lg">
                        <i class="fab fa-facebook-f"></i>
                        <span>Facebook</span>
                    </button>
                    <button class="theme-transition-ready flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-blue-400 hover:text-white rounded-lg">
                        <i class="fab fa-twitter"></i>
                        <span>Twitter</span>
                    </button>
                    <button class="theme-transition-ready flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-pink-500 hover:text-white rounded-lg">
                        <i class="fab fa-instagram"></i>
                        <span>Instagram</span>
                    </button>
                </div>
            </div>`
        },
        socialStats: {
            name: "Statistiques Sociales",
            html: `<div class="max-w-2xl mx-auto p-6">
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    <div class="theme-transition-ready p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-blue-500"><i class="fab fa-facebook-f text-xl"></i></span>
                            <span class="text-green-500 text-sm">+12%</span>
                        </div>
                        <p class="text-2xl font-bold theme-transition-ready text-gray-800 dark:text-white">12,454</p>
                        <p class="text-sm theme-transition-ready text-gray-500 dark:text-gray-400">Abonnés</p>
                    </div>
                    <div class="theme-transition-ready p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-blue-400"><i class="fab fa-twitter text-xl"></i></span>
                            <span class="text-green-500 text-sm">+8%</span>
                        </div>
                        <p class="text-2xl font-bold theme-transition-ready text-gray-800 dark:text-white">8,765</p>
                        <p class="text-sm theme-transition-ready text-gray-500 dark:text-gray-400">Followers</p>
                    </div>
                    <div class="theme-transition-ready p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-pink-500"><i class="fab fa-instagram text-xl"></i></span>
                            <span class="text-green-500 text-sm">+15%</span>
                        </div>
                        <p class="text-2xl font-bold theme-transition-ready text-gray-800 dark:text-white">15,332</p>
                        <p class="text-sm theme-transition-ready text-gray-500 dark:text-gray-400">Abonnés</p>
                    </div>
                    <div class="theme-transition-ready p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-blue-700"><i class="fab fa-linkedin-in text-xl"></i></span>
                            <span class="text-green-500 text-sm">+6%</span>
                        </div>
                        <p class="text-2xl font-bold theme-transition-ready text-gray-800 dark:text-white">6,112</p>
                        <p class="text-sm theme-transition-ready text-gray-500 dark:text-gray-400">Connexions</p>
                    </div>
                </div>
            </div>`
        },
        shareWithCopy: {
            name: "Partage avec Copie",
            html: `<div class="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h3 class="text-lg font-semibold mb-4 theme-transition-ready text-gray-800 dark:text-white">Partager via</h3>
                <div class="grid grid-cols-4 gap-4 mb-6">
                    <button class="theme-transition-ready flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white">
                            <i class="fab fa-facebook-f"></i>
                        </span>
                        <span class="text-xs theme-transition-ready text-gray-600 dark:text-gray-400">Facebook</span>
                    </button>
                    <button class="theme-transition-ready flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 text-white">
                            <i class="fab fa-twitter"></i>
                        </span>
                        <span class="text-xs theme-transition-ready text-gray-600 dark:text-gray-400">Twitter</span>
                    </button>
                    <button class="theme-transition-ready flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span class="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white">
                            <i class="fab fa-whatsapp"></i>
                        </span>
                        <span class="text-xs theme-transition-ready text-gray-600 dark:text-gray-400">WhatsApp</span>
                    </button>
                </div>
                <div class="flex items-center gap-4">
                    <div class="flex-1">
                        <input type="text" value="https://example.com/share" class="w-full px-4 py-2 theme-transition-ready bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-800 dark:text-white text-sm" readonly>
                    </div>
                    <button class="theme-transition-ready px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg flex items-center gap-2">
                        <i class="fas fa-copy"></i>
                        <span>Copier</span>
                    </button>
                </div>
            </div>`
        }
    },

    // Pieds de page
    footers: {
        simple: {
            name: "Pied de Page Simple",
            html: `<footer class="theme-transition-ready bg-gray-100 dark:bg-gray-900 p-6 sm:p-8 w-full">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-center text-sm sm:text-base">&copy; 2025 Votre Entreprise. Tous droits réservés.</p>
                </div>
            </footer>`
        },
        withLinks: {
            name: "Pied de Page avec Liens",
            html: `<footer class="theme-transition-ready bg-gray-100 dark:bg-gray-800 p-6 sm:p-8 w-full">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
                        <div>
                            <h4 class="font-bold mb-4 theme-transition-ready text-gray-800 dark:text-white text-base sm:text-lg">À propos</h4>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-sm sm:text-base">Description courte de votre entreprise</p>
                        </div>
                        <div>
                            <h4 class="font-bold mb-4 theme-transition-ready text-gray-800 dark:text-white text-base sm:text-lg">Liens Rapides</h4>
                            <ul class="space-y-2">
                                <li><a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-sm sm:text-base">Accueil</a></li>
                                <li><a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-sm sm:text-base">Services</a></li>
                                <li><a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-sm sm:text-base">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold mb-4 theme-transition-ready text-gray-800 dark:text-white text-base sm:text-lg">Contact</h4>
                            <ul class="space-y-2">
                                <li class="theme-transition-ready text-gray-600 dark:text-gray-300 text-sm sm:text-base">contact@email.com</li>
                                <li class="theme-transition-ready text-gray-600 dark:text-gray-300 text-sm sm:text-base">+33 1 23 45 67 89</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold mb-4 theme-transition-ready text-gray-800 dark:text-white text-base sm:text-lg">Suivez-nous</h4>
                            <div class="flex justify-center sm:justify-start space-x-4">
                                <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-sm sm:text-base"><i class="fab fa-facebook"></i></a>
                                <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-sm sm:text-base"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-sm sm:text-base"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>`
        },
        withSocialLinks: {
            name: "Pied de Page avec Liens + Social",
            html: `<footer class="theme-transition-ready bg-gray-100 dark:bg-gray-800 p-6 sm:p-8 w-full">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
                        <div>
                            <h4 class="font-bold mb-4 theme-transition-ready text-gray-800 dark:text-white text-base sm:text-lg">À propos</h4>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-sm sm:text-base">Description courte de votre entreprise</p>
                        </div>
                        <div>
                            <h4 class="font-bold mb-4 theme-transition-ready text-gray-800 dark:text-white text-base sm:text-lg">Liens Rapides</h4>
                            <ul class="space-y-2">
                                <li><a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-sm sm:text-base flex items-center justify-center sm:justify-start">
                                    <i class="fas fa-home mr-2"></i>Accueil
                                </a></li>
                                <li><a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-sm sm:text-base flex items-center justify-center sm:justify-start">
                                    <i class="fas fa-cogs mr-2"></i>Services
                                </a></li>
                                <li><a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-sm sm:text-base flex items-center justify-center sm:justify-start">
                                    <i class="fas fa-envelope mr-2"></i>Contact
                                </a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold mb-4 theme-transition-ready text-gray-800 dark:text-white text-base sm:text-lg">Contact</h4>
                            <ul class="space-y-2">
                                <li class="theme-transition-ready text-gray-600 dark:text-gray-300 text-sm sm:text-base flex items-center justify-center sm:justify-start">
                                    <i class="far fa-envelope mr-2"></i>contact@email.com
                                </li>
                                <li class="theme-transition-ready text-gray-600 dark:text-gray-300 text-sm sm:text-base flex items-center justify-center sm:justify-start">
                                    <i class="fas fa-phone mr-2"></i>+33 1 23 45 67 89
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold mb-4 theme-transition-ready text-gray-800 dark:text-white text-base sm:text-lg">Suivez-nous</h4>
                            <div class="flex justify-center sm:justify-start space-x-4">
                                <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
                                    <i class="fab fa-facebook-f text-white"></i>
                                </a>
                                <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-sky-500 hover:bg-sky-600 transition-colors duration-300">
                                    <i class="fab fa-twitter text-white"></i>
                                </a>
                                <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-pink-600 hover:bg-pink-700 transition-colors duration-300">
                                    <i class="fab fa-instagram text-white"></i>
                                </a>
                                <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-800 hover:bg-blue-900 transition-colors duration-300">
                                    <i class="fab fa-linkedin-in text-white"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-center text-sm">&copy; 2025 Votre Entreprise. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>`
        },
    footerCreatif: {
        name: "Footer Créatif",
        html: `<footer class="theme-transition-ready bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 py-12 px-6">
            <div class="max-w-6xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12">
                    <div class="text-center md:text-left space-y-6">
                        <div class="flex justify-center md:justify-start">
                            <span class="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">LOGO</span>
                        </div>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                            Créons ensemble l'avenir numérique. Innovation, créativité et excellence au service de vos projets.
                        </p>
                    </div>
                    
                    <div class="text-center md:text-left">
                        <div class="flex flex-col items-center md:items-start">
                            <h4 class="font-bold mb-2 theme-transition-ready text-gray-800 dark:text-white text-lg">
                                Navigation
                            </h4>
                            <span class="block w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mb-6"></span>
                        </div>
                        <ul class="space-y-4">
                            <li>
                                <a href="#" class="group theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 flex items-center justify-center md:justify-start">
                                    <span class="w-2 h-2 rounded-full bg-purple-500 mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                    Découvrir
                                </a>
                            </li>
                            <li>
                                <a href="#" class="group theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 flex items-center justify-center md:justify-start">
                                    <span class="w-2 h-2 rounded-full bg-purple-500 mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                    Nos Services
                                </a>
                            </li>
                            <li>
                                <a href="#" class="group theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 flex items-center justify-center md:justify-start">
                                    <span class="w-2 h-2 rounded-full bg-purple-500 mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="text-center md:text-left">
                        <div class="flex flex-col items-center md:items-start">
                            <h4 class="font-bold mb-2 theme-transition-ready text-gray-800 dark:text-white text-lg">
                                Contact
                            </h4>
                            <span class="block w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mb-6"></span>
                        </div>
                        <div class="space-y-6">
                            <a href="mailto:contact@example.com" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 flex items-center justify-center md:justify-start">
                                <span class="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                                    <i class="far fa-envelope text-purple-500"></i>
                                </span>
                                contact@example.com
                            </a>
                            <a href="tel:+33123456789" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 flex items-center justify-center md:justify-start">
                                <span class="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                                    <i class="fas fa-phone text-purple-500"></i>
                                </span>
                                +33 1 23 45 67 89
                            </a>
                        </div>
                    </div>
                    
                    <div class="text-center md:text-left">
                        <div class="flex flex-col items-center md:items-start">
                            <h4 class="font-bold mb-2 theme-transition-ready text-gray-800 dark:text-white text-lg">
                                Newsletter
                            </h4>
                            <span class="block w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mb-6"></span>
                        </div>
                        <div class="relative max-w-xs mx-auto md:mx-0">
                            <input type="email" placeholder="Votre email" class="w-full px-4 py-3 rounded-lg theme-transition-ready bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <button class="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md hover:opacity-90 transition-opacity">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-sm order-2 md:order-1">
                            &copy; 2025 Votre Entreprise. Tous droits réservés.
                        </p>
                        <div class="flex space-x-6 order-1 md:order-2">
                            <a href="#" class="group">
                                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 p-0.5">
                                    <div class="w-full h-full theme-transition-ready bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-transparent transition-colors">
                                        <i class="fab fa-facebook-f text-purple-500 group-hover:text-white transition-colors"></i>
                                    </div>
                                </div>
                            </a>
                            <a href="#" class="group">
                                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 p-0.5">
                                    <div class="w-full h-full theme-transition-ready bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-transparent transition-colors">
                                        <i class="fab fa-twitter text-purple-500 group-hover:text-white transition-colors"></i>
                                    </div>
                                </div>
                            </a>
                            <a href="#" class="group">
                                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 p-0.5">
                                    <div class="w-full h-full theme-transition-ready bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-transparent transition-colors">
                                        <i class="fab fa-instagram text-purple-500 group-hover:text-white transition-colors"></i>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>`
    },
    gradientFooter: {
        name: "Pied de Page Gradient Bleu",
        html: `<footer class="theme-transition-ready bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 p-6 sm:p-8 w-full">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
                    <div>
                        <div class="flex flex-col items-center sm:items-start">
                            <h4 class="font-bold mb-2 theme-transition-ready text-blue-800 dark:text-blue-300 text-lg">
                                À propos
                            </h4>
                            <span class="block w-12 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mb-6"></span>
                        </div>
                        <p class="theme-transition-ready text-blue-700 dark:text-blue-200">Description courte de votre entreprise avec un style unique</p>
                    </div>
                    
                    <div>
                        <div class="flex flex-col items-center sm:items-start">
                            <h4 class="font-bold mb-2 theme-transition-ready text-blue-800 dark:text-blue-300 text-lg">
                                Navigation
                            </h4>
                            <span class="block w-12 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mb-6"></span>
                        </div>
                        <ul class="space-y-3">
                            <li><a href="#" class="theme-transition-ready text-blue-600 dark:text-blue-300 hover:text-indigo-500 dark:hover:text-indigo-400 flex items-center justify-center sm:justify-start group">
                                <span class="relative overflow-hidden">
                                    <span class="inline-block transform transition-transform duration-300 group-hover:-translate-y-full">Accueil</span>
                                    <span class="absolute top-0 left-0 transform translate-y-full transition-transform duration-300 group-hover:-translate-y-0 text-indigo-500">Accueil</span>
                                </span>
                            </a></li>
                            <li><a href="#" class="theme-transition-ready text-blue-600 dark:text-blue-300 hover:text-indigo-500 dark:hover:text-indigo-400 flex items-center justify-center sm:justify-start group">
                                <span class="relative overflow-hidden">
                                    <span class="inline-block transform transition-transform duration-300 group-hover:-translate-y-full">Services</span>
                                    <span class="absolute top-0 left-0 transform translate-y-full transition-transform duration-300 group-hover:-translate-y-0 text-indigo-500">Services</span>
                                </span>
                            </a></li>
                        </ul>
                    </div>

                    <div>
                        <div class="flex flex-col items-center sm:items-start">
                            <h4 class="font-bold mb-2 theme-transition-ready text-blue-800 dark:text-blue-300 text-lg">
                                Contact
                            </h4>
                            <span class="block w-12 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mb-6"></span>
                        </div>
                        <div class="space-y-3">
                            <a href="mailto:contact@email.com" class="theme-transition-ready text-blue-600 dark:text-blue-300 block hover:scale-105 transform transition-all duration-300">
                                <i class="far fa-envelope mr-2"></i>contact@email.com
                            </a>
                            <p class="theme-transition-ready text-blue-600 dark:text-blue-300 block hover:scale-105 transform transition-all duration-300">
                                <i class="fas fa-phone mr-2"></i>+33 1 23 45 67 89
                            </p>
                        </div>
                    </div>

                    <div>
                        <div class="flex flex-col items-center sm:items-start">
                            <h4 class="font-bold mb-2 theme-transition-ready text-blue-800 dark:text-blue-300 text-lg">
                                Newsletter
                            </h4>
                            <span class="block w-12 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mb-6"></span>
                        </div>
                        <div class="relative">
                            <input type="email" placeholder="Votre email" class="w-full px-4 py-3 rounded-lg theme-transition-ready bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-blue-200 dark:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-800 dark:text-blue-200 placeholder-blue-400 dark:placeholder-blue-300">
                            <button class="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 flex items-center justify-center group">
                                <i class="fas fa-paper-plane transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="mt-16 pt-8 border-t border-blue-200 dark:border-blue-800">
                    <div class="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
                        <p class="theme-transition-ready text-blue-600 dark:text-blue-300 text-sm order-2 md:order-1">
                            &copy; 2025 Votre Entreprise. Tous droits réservés.
                        </p>
                        <div class="flex space-x-6 order-1 md:order-2">
                            <a href="#" class="group relative">
                                <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg blur transition-all duration-300 group-hover:blur-xl"></div>
                                <div class="w-10 h-10 relative rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-0.5 transition-all duration-300 group-hover:from-blue-600 group-hover:to-indigo-700">
                                    <div class="w-full h-full bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                                        <i class="fab fa-facebook-f text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:text-white transition-colors duration-300"></i>
                                    </div>
                                </div>
                            </a>
                            <a href="#" class="group relative">
                                <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg blur transition-all duration-300 group-hover:blur-xl"></div>
                                <div class="w-10 h-10 relative rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-0.5 transition-all duration-300 group-hover:from-blue-600 group-hover:to-indigo-700">
                                    <div class="w-full h-full bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                                        <i class="fab fa-twitter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:text-white transition-colors duration-300"></i>
                                    </div>
                                </div>
                            </a>
                            <a href="#" class="group relative">
                                <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg blur transition-all duration-300 group-hover:blur-xl"></div>
                                <div class="w-10 h-10 relative rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-0.5 transition-all duration-300 group-hover:from-blue-600 group-hover:to-indigo-700">
                                    <div class="w-full h-full bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                                        <i class="fab fa-linkedin-in text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:text-white transition-colors duration-300"></i>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>`
    },
    retroGlow: {
        name: "Footer Rétro Lumineux",
        html: `<footer class="theme-transition-ready bg-gray-50 dark:bg-gray-900 p-8 w-full">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div class="text-center md:text-left">
                        <div class="inline-block">
                            <h4 class="font-mono text-xl mb-2 theme-transition-ready text-amber-700 dark:text-amber-300">
                                Retrowave
                            </h4>
                            <div class="w-12 h-1 bg-gradient-to-r from-amber-300 to-pink-400 mb-6"></div>
                        </div>
                        <p class="font-mono theme-transition-ready text-gray-600 dark:text-gray-400">
                            Une expérience unique inspirée des années 80
                        </p>
                    </div>

                    <div class="text-center md:text-left">
                        <div class="space-y-4">
                            <h4 class="font-mono text-lg theme-transition-ready text-amber-700 dark:text-amber-300">Navigation</h4>
                            <ul class="space-y-3">
                                <li><a href="#" class="font-mono theme-transition-ready text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-300">Accueil</a></li>
                                <li><a href="#" class="font-mono theme-transition-ready text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-300">À propos</a></li>
                                <li><a href="#" class="font-mono theme-transition-ready text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-300">Services</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="text-center md:text-left">
                        <div class="space-y-4">
                            <h4 class="font-mono text-lg theme-transition-ready text-amber-700 dark:text-amber-300">Newsletter</h4>
                            <div class="flex flex-col space-y-3">
                                <input type="email" placeholder="votre@email.com" class="font-mono px-4 py-2 rounded theme-transition-ready bg-gray-100 dark:bg-gray-800 border border-amber-200 dark:border-amber-800 focus:outline-none focus:border-amber-400 text-gray-700 dark:text-gray-300">
                                <button class="font-mono py-2 px-4 bg-gradient-to-r from-amber-400 to-pink-400 text-white rounded hover:from-amber-500 hover:to-pink-500 transition-all duration-300">
                                    S'abonner
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="text-center md:text-left">
                        <div class="space-y-4">
                            <h4 class="font-mono text-lg theme-transition-ready text-amber-700 dark:text-amber-300">Contact</h4>
                            <div class="space-y-3 font-mono theme-transition-ready text-gray-600 dark:text-gray-400">
                                <p>contact@retrowave.com</p>
                                <p>+33 1 23 45 67 89</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-12 pt-8 border-t border-amber-200 dark:border-amber-800">
                    <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                        <p class="font-mono theme-transition-ready text-gray-600 dark:text-gray-400 text-sm">
                            &copy; 2025 Retrowave. Tous droits réservés.
                        </p>
                        <div class="flex space-x-6">
                            <a href="#" class="w-10 h-10 flex items-center justify-center rounded-lg theme-transition-ready bg-gradient-to-r from-amber-400 to-pink-400 text-white hover:from-amber-500 hover:to-pink-500 transition-all duration-300">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="w-10 h-10 flex items-center justify-center rounded-lg theme-transition-ready bg-gradient-to-r from-amber-400 to-pink-400 text-white hover:from-amber-500 hover:to-pink-500 transition-all duration-300">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="w-10 h-10 flex items-center justify-center rounded-lg theme-transition-ready bg-gradient-to-r from-amber-400 to-pink-400 text-white hover:from-amber-500 hover:to-pink-500 transition-all duration-300">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>`
    }
    },    
    
    // composants de prix
    pricing: {
        simple: {
            name: "Prix Simple",
            html: `<div class="max-w-sm mx-auto theme-transition-ready bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 my-12 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div class="text-center">
                    <h3 class="text-xl font-bold mb-2 theme-transition-ready text-gray-800 dark:text-white">Offre Starter</h3>
                    <div class="flex items-center justify-center mb-4">
                        <span class="text-3xl font-extrabold theme-transition-ready text-gray-800 dark:text-white">19,99€</span>
                        <span class="text-sm ml-2 theme-transition-ready text-gray-500 dark:text-gray-400">/mois</span>
                    </div>
                </div>
                <div class="space-y-4 mb-6">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300">5 templates par mois</p>
                    </div>
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Support par email</p>
                    </div>
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Mises à jour basiques</p>
                    </div>
                </div>
                <button class="w-full theme-transition-ready px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors duration-200">
                    Commencer
                </button>
            </div>`
        },
        premium: {
            name: "Prix Premium",
            html: `<div class="max-w-sm mx-auto theme-transition-ready bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 sm:p-8 my-12 rounded-xl shadow-xl border border-blue-100 dark:border-blue-900 transform hover:scale-102 transition-all duration-300">
                <div class="relative text-center">
                    <span class="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">POPULAIRE</span>
                    <h3 class="text-xl font-bold mb-2 theme-transition-ready text-gray-800 dark:text-white">Pack Business</h3>
                    <div class="flex items-center justify-center mb-4">
                        <span class="text-3xl font-extrabold theme-transition-ready text-blue-600 dark:text-blue-400">39,99€</span>
                        <span class="text-sm ml-2 theme-transition-ready text-gray-500 dark:text-gray-400">/mois</span>
                    </div>
                </div>
                <div class="space-y-4 mb-6">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Accès illimité aux templates</p>
                    </div>
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Support prioritaire 24/7</p>
                    </div>
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Mises à jour premium</p>
                    </div>
                </div>
                <button class="w-full theme-transition-ready px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                    <span class="mr-2">Commencer Maintenant</span>
                    <svg class="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                </button>
                <p class="text-center text-sm theme-transition-ready text-gray-500 dark:text-gray-400 mt-4">
                    Annulation gratuite pendant 30 jours
                </p>
            </div>`
        },
    // Ajout des nouvelles variantes
        basic: {
            name: "Prix Basique",
            html: `<div class="max-w-sm mx-auto theme-transition-ready bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 my-12 p-6 rounded-lg shadow hover:shadow-md transition-all duration-300">
                <div class="text-center">
                    <h3 class="text-lg font-semibold mb-2 theme-transition-ready text-gray-700 dark:text-white">Offre Basique</h3>
                    <div class="flex items-center justify-center mb-4">
                        <span class="text-2xl font-bold theme-transition-ready text-gray-800 dark:text-white">9,99€</span>
                        <span class="text-xs ml-1 theme-transition-ready text-gray-500 dark:text-gray-400">/mois</span>
                    </div>
                </div>
                <div class="space-y-3 mb-5">
                    <div class="flex items-center">
                        <svg class="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <p class="text-sm theme-transition-ready text-gray-600 dark:text-gray-300">2 templates par mois</p>
                    </div>
                    <div class="flex items-center">
                        <svg class="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <p class="text-sm theme-transition-ready text-gray-600 dark:text-gray-300">Support email basique</p>
                    </div>
                </div>
                <button class="w-full theme-transition-ready px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm font-medium transition-colors duration-200">
                    Choisir
                </button>
            </div>`
        },
         enterprise: {
            name: "Prix Entreprise",
            html: `<div class="max-w-md mx-auto theme-transition-ready bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 text-white p-8 my-12 rounded-2xl shadow-2xl transform transition-all duration-300">
                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-3">Solution Entreprise</h3>
                    <div class="flex items-center justify-center mb-6">
                        <span class="text-4xl font-extrabold">Sur Mesure</span>
                    </div>
                    <p class="mb-6 text-purple-100 dark:text-purple-200">
                    Conçu pour les entreprises ayant besoin de solutions personnalisées et d'un support dédié.
                </p>
                </div>
                
                <div class="space-y-4 mb-8">
                    <div class="flex items-center">
                        <svg class="w-6 h-6 text-purple-200 dark:text-purple-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <p class="text-purple-100 dark:text-purple-200">Templates personnalisés illimités</p>
                    </div>
                    <div class="flex items-center">
                       <svg class="w-6 h-6 text-purple-200 dark:text-purple-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                        <p class="text-purple-100 dark:text-purple-200">Support technique dédié 24/7</p>
                    </div>
                     <div class="flex items-center">
                        <svg class="w-6 h-6 text-purple-200 dark:text-purple-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                        </svg>
                        <p class="text-purple-100 dark:text-purple-200">Intégrations personnalisées</p>
                    </div>
                </div>
                <button class="w-full theme-transition-ready px-8 py-4 bg-white text-purple-600 dark:text-purple-500 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-purple-100 dark:hover:bg-purple-200 transition-all duration-200">
                    Nous Contacter
                </button>
            </div>`
        },
        annual: {
            name: "Prix Annuel",
            html: `<div class="max-w-sm mx-auto theme-transition-ready bg-green-50 dark:bg-green-800 border border-green-200 dark:border-green-700 my-12 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="text-center">
                <h3 class="text-xl font-bold mb-2 theme-transition-ready text-green-800 dark:text-white">Offre Annuelle</h3>
                <div class="flex items-center justify-center mb-4">
                    <span class="text-3xl font-extrabold theme-transition-ready text-green-900 dark:text-green-400">299€</span>
                    <span class="text-sm ml-2 theme-transition-ready text-green-500 dark:text-green-300">/an</span>
                </div>
                <p class="text-sm theme-transition-ready text-green-600 dark:text-green-200 mb-4">Économisez 20% par rapport à l'abonnement mensuel!</p>
            </div>
            <div class="space-y-4 mb-6">
                <div class="flex items-center">
                    <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <p class="theme-transition-ready text-green-600 dark:text-green-300">Accès complet à toutes les fonctionnalités</p>
                </div>
                <div class="flex items-center">
                   <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <p class="theme-transition-ready text-green-600 dark:text-green-300">Support client premium</p>
                </div>
            </div>
            <button class="w-full theme-transition-ready px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors duration-200">
                S'abonner
            </button>
        </div>`
        },
        free: {
            name: "Prix Gratuit",
            html: `<div class="max-w-sm mx-auto theme-transition-ready bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 my-12 p-6 rounded-xl shadow hover:shadow-md transition-all duration-300">
                <div class="text-center">
                    <h3 class="text-lg font-semibold mb-2 theme-transition-ready text-gray-700 dark:text-gray-300">Offre Gratuite</h3>
                    <div class="flex items-center justify-center mb-4">
                        <span class="text-2xl font-bold theme-transition-ready text-gray-800 dark:text-gray-300">0€</span>
                        <span class="text-xs ml-1 theme-transition-ready text-gray-500 dark:text-gray-400">/toujours</span>
                    </div>
                </div>
                <div class="space-y-3 mb-5">
                    <div class="flex items-center">
                        <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <p class="text-sm theme-transition-ready text-gray-600 dark:text-gray-400">1 template par mois</p>
                    </div>
                    <div class="flex items-center">
                        <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <p class="text-sm theme-transition-ready text-gray-600 dark:text-gray-400">Fonctionnalités limitées</p>
                    </div>
                </div>
                <button class="w-full theme-transition-ready px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md text-sm font-medium transition-colors duration-200">
                    Essayer Gratuitement
                </button>
            </div>`
        },
        student: {
            name: "Prix Étudiant",
            html: `<div class="max-w-sm mx-auto theme-transition-ready bg-yellow-50 dark:bg-yellow-800 border border-yellow-200 dark:border-yellow-700 my-12 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div class="text-center">
                   <span class="relative -top-9  transform  bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-2">Réduction</span>
                    <h3 class="text-xl font-bold mb-2 theme-transition-ready text-yellow-800 dark:text-yellow-200">Offre Étudiant</h3>
                    <div class="flex items-center justify-center mb-4">
                        <span class="text-3xl font-extrabold theme-transition-ready text-yellow-900 dark:text-yellow-300">4,99€</span>
                        <span class="text-sm ml-2 theme-transition-ready text-yellow-500 dark:text-yellow-400">/mois</span>
                    </div>
                    <p class="text-sm theme-transition-ready text-yellow-600 dark:text-yellow-300 mb-4">Accès complet avec une réduction de 50% pour les étudiants!</p>
                </div>
                <div class="space-y-4 mb-6">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <p class="theme-transition-ready text-yellow-600 dark:text-yellow-300">Toutes les fonctionnalités Premium</p>
                    </div>
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>

                        <p class="theme-transition-ready text-yellow-600 dark:text-yellow-300">Support prioritaire</p>
                    </div>
                </div>
                <button class="w-full theme-transition-ready px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors duration-200">
                    Obtenir la Réduction
                </button>
            </div>`
        },
        team: {
            name: "Prix Équipe",
            html: `<div class="max-w-md mx-auto theme-transition-ready bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 my-12 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-3 theme-transition-ready text-gray-800 dark:text-white">Pack Équipe</h3>
                    <div class="flex items-center justify-center mb-6">
                        <span class="text-4xl font-extrabold theme-transition-ready text-blue-600 dark:text-blue-400">99,99€</span>
                        <span class="text-sm ml-2 theme-transition-ready text-gray-500 dark:text-gray-400">/mois</span>
                    </div>
                    <p class="mb-6 theme-transition-ready text-gray-600 dark:text-gray-300">
                        Pour les équipes jusqu'à 10 membres.  Collaboration simplifiée.
                    </p>
                </div>
                <div class="space-y-4 mb-8">
                    <div class="flex items-center">
                        <svg class="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                         <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Accès illimité pour 10 utilisateurs</p>
                    </div>
                    <div class="flex items-center">
                        <svg class="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Outils de collaboration en équipe</p>
                    </div>
                     <div class="flex items-center">
                        <svg class="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Support client dédié</p>
                    </div>
                </div>
                <button class="w-full theme-transition-ready px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                    Commencer
                </button>
            </div>`
        },
        pro: {
            name: "Prix Pro",
            html: `<div class="max-w-sm mx-auto theme-transition-ready bg-gradient-to-br from-pink-500 to-red-600 dark:from-pink-700 dark:to-red-800 text-white p-6 my-12 rounded-xl shadow-xl border border-pink-100 dark:border-pink-900 transform hover:scale-102 transition-all duration-300">
                <div class="text-center">
                  <span class="relative -top-9  transform  bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">AVANCÉ</span>
                    <h3 class="text-xl font-bold mb-2">Offre Pro</h3>
                    <div class="flex items-center justify-center mb-4">
                        <span class="text-3xl font-extrabold">59,99€</span>
                        <span class="text-sm ml-2">/mois</span>
                    </div>
                </div>
                <div class="space-y-4 mb-6">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-pink-200 dark:text-pink-300 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <p>Fonctionnalités illimitées</p>
                    </div>
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-pink-200 dark:text-pink-300 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <p>Support premium 24/7</p>
                    </div>
                     <div class="flex items-center">
                        <svg class="w-5 h-5 text-pink-200 dark:text-pink-300 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        <p>Accès anticipé aux nouvelles fonctionnalités</p>
                    </div>
                </div>
                <button class="w-full px-6 py-3 bg-white text-red-600 dark:text-red-600 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:bg-pink-100 dark:hover:bg-pink-200 transition-all duration-200">
                   <span class="mr-2">Passer Pro</span>
                    <svg class="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
            </div>`
        },
        
        // Exemple avec plusieurs cartes (3 cartes)
       triple: {
            name: "Prix Triple",
            html: `
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
    <!-- Carte 1: Standard -->
    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
        <div class="px-6 py-8 flex-grow">
            <div class="text-center">
                <h3 class="text-2xl font-bold mb-1 text-gray-800 dark:text-white">Standard</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Idéal pour commencer</p>
                <div class="flex items-baseline justify-center">
                    <span class="text-4xl font-extrabold text-gray-800 dark:text-white">29,99€</span>
                    <span class="text-lg ml-1 text-gray-500 dark:text-gray-400">/mois</span>
                </div>
            </div>

            <div class="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                <ul class="space-y-4">
                    <li class="flex items-center">
                        <svg class="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span class="text-base text-gray-700 dark:text-gray-300">10 templates par mois</span>
                    </li>
                    <li class="flex items-center">
                        <svg class="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span class="text-base text-gray-700 dark:text-gray-300">Accès à la bibliothèque de base</span>
                    </li>
                    <li class="flex items-center">
                       <svg class="w-6 h-6 text-red-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        <span class="text-base text-gray-700 dark:text-gray-300 line-through">Support prioritaire</span>
                    </li>
                </ul>
            </div>
        </div>
         <div class="px-6 py-4 bg-gray-100 dark:bg-gray-700">
            <button class="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-semibold text-lg transition-colors duration-200">Choisir le plan Standard</button>
        </div>
    </div>

    <!-- Carte 2: Plus (Meilleur Choix) -->
<div class="bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-700 dark:to-blue-900 rounded-3xl shadow-xl border border-blue-200 dark:border-blue-600 transition-all duration-300 overflow-hidden flex flex-col relative">
    <div class="px-6 py-8 flex-grow relative">
        <div class="text-center">
            <h3 class="text-2xl font-bold mb-1 text-blue-900 dark:text-white">Plus</h3>
            <p class="text-sm text-gray-700 dark:text-gray-200 mb-3">Le plus populaire</p>
            <div class="flex items-baseline justify-center">
                <span class="text-4xl font-extrabold text-blue-700 dark:text-blue-300">49,99€</span>
                <span class="text-lg ml-1 text-gray-600 dark:text-gray-400">/mois</span>
            </div>
        </div>

        <div class="mt-6 border-t border-blue-200 dark:border-blue-700 pt-4">
            <ul class="space-y-4">
                <li class="flex items-center">
                    <svg class="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-base text-blue-800 dark:text-gray-200">Templates illimités</span>
                </li>
                <li class="flex items-center">
                    <svg class="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-base text-blue-800 dark:text-gray-200">Accès à toutes les fonctionnalités</span>
                </li>
                 <li class="flex items-center">
                    <svg class="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-base text-blue-800 dark:text-gray-200">Nouvelles fonctionnalités en avant-première</span>
                </li>
            </ul>
        </div>
    </div>
    <div class="px-6 py-4 bg-blue-50 dark:bg-blue-800">
        <button class="w-full px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200">Choisir le plan Plus</button>
    </div>
</div>

    <!-- Carte 3: Expert -->
    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
        <div class="px-6 py-8 flex-grow">
            <div class="text-center">
                <h3 class="text-2xl font-bold mb-1 text-gray-800 dark:text-white">Expert</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Pour les professionnels exigeants</p>
                <div class="flex items-baseline justify-center">
                    <span class="text-4xl font-extrabold text-gray-800 dark:text-white">79,99€</span>
                    <span class="text-lg ml-1 text-gray-500 dark:text-gray-400">/mois</span>
                </div>
            </div>

            <div class="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                <ul class="space-y-4">
                    <li class="flex items-center">
                        <svg class="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span class="text-base text-gray-700 dark:text-gray-300">Support dédié 24/7</span>
                    </li>
                    <li class="flex items-center">
                        <svg class="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span class="text-base text-gray-700 dark:text-gray-300">Accès à des consultants experts</span>
                    </li>
                     <li class="flex items-center">
                        <svg class="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span class="text-base text-gray-700 dark:text-gray-300">Intégrations personnalisées</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="px-6 py-4 bg-gray-100 dark:bg-gray-700">
            <button class="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-semibold text-lg transition-colors duration-200">Choisir le plan Expert</button>
        </div>
    </div>
</div>
            `
        },
    //Une carte avec une periode d'essai
    trial: {
        name: "Prix Essai",
        html: `<div class="max-w-md mx-auto theme-transition-ready bg-gradient-to-r from-teal-400 to-cyan-500 dark:from-teal-600 dark:to-cyan-700 text-white p-8 my-12 rounded-2xl shadow-2xl relative transform hover:scale-103 transition-all duration-500">
                <div class="absolute top-0 right-0 p-2 bg-red-500 text-white text-xs font-bold rounded-bl-full">ESSAI GRATUIT</div>
                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-3">Essai Gratuit 14 Jours</h3>
                    <p class="mb-6 text-teal-100 dark:text-teal-200">
                        Découvrez toutes nos fonctionnalités premium pendant 14 jours, sans engagement.
                    </p>
                </div>
                <div class="space-y-4 mb-8">
                    <div class="flex items-center">
                       <svg class="w-6 h-6 text-teal-200 dark:text-teal-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                        <p class="text-teal-100 dark:text-teal-200">Accès complet à toutes les templates</p>
                    </div>
                     <div class="flex items-center">
                        <svg class="w-6 h-6 text-teal-200 dark:text-teal-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        <p class="text-teal-100 dark:text-teal-200">Support prioritaire</p>
                    </div>

                </div>
                <button class="w-full theme-transition-ready px-8 py-4 bg-white text-teal-500 dark:text-teal-700 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-teal-100 dark:hover:bg-teal-200 transition-all duration-200">
                    Commencer l'Essai
                </button>
             <p class="text-center text-sm theme-transition-ready text-teal-200 dark:text-teal-300 mt-3">Aucune carte de crédit requise</p>
            </div>`
    },

     // Version "Lite" de la carte "Premium"
    premiumLite: {
      name: "Prix Premium Lite",
      html: `<div class="max-w-sm mx-auto theme-transition-ready bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 sm:p-8 my-12 rounded-xl shadow-md border border-blue-50 dark:border-blue-800 transform hover:scale-102 transition-all duration-300">
                <div class="relative text-center">
                   <span class="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-400 text-white text-xs font-bold px-2 py-1 rounded-full">POPULAIRE</span>
                    <h3 class="text-xl font-semibold mb-2 theme-transition-ready text-gray-700 dark:text-gray-200">Pack Business Lite</h3>
                    <div class="flex items-center justify-center mb-4">
                        <span class="text-2xl font-bold theme-transition-ready text-blue-500 dark:text-blue-400">29,99€</span>
                        <span class="text-sm ml-2 theme-transition-ready text-gray-500 dark:text-gray-400">/mois</span>
                    </div>
                </div>
                <div class="space-y-3 mb-5">
                   <div class="flex items-center">
                      <svg class="w-4 h-4 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                      <p class="text-sm theme-transition-ready text-gray-600 dark:text-gray-300">Accès à 50 templates</p>
                    </div>

                    <div class="flex items-center">
                       <svg class="w-4 h-4 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                       <p class="text-sm theme-transition-ready text-gray-600 dark:text-gray-300">Support standard</p>
                   </div>
                </div>
                <button class="w-full theme-transition-ready px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200">
                    Commencer
                </button>
                <p class="text-center text-xs theme-transition-ready text-gray-500 dark:text-gray-400 mt-3">
                    Annulation gratuite pendant 7 jours
                </p>
            </div>`
    },

    // Carte double avec comparaison
    compare: {
      name: "Comparaison",
      html: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto my-12">

            <!-- Carte Gauche - Offre Standard -->
          <div class="theme-transition-ready bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div class="text-center">
                    <h3 class="text-xl font-bold mb-2 theme-transition-ready text-gray-800 dark:text-white">Offre Standard</h3>
                    <div class="flex items-center justify-center mb-4">
                        <span class="text-3xl font-extrabold theme-transition-ready text-gray-800 dark:text-white">19,99€</span>
                        <span class="text-sm ml-2 theme-transition-ready text-gray-500 dark:text-gray-400">/mois</span>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Pour démarrer simplement.</p>
                </div>

                <div class="space-y-3 mb-6">
                  <div class="flex items-center">
                    <svg class="w-7 h-7 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <p class="text-sm theme-transition-ready text-gray-600 dark:text-gray-300"><strong>10 Templates Premium</strong></p>
                  </div>

                  <div class="flex items-center">
                   <svg class="w-7 h-7 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <p class="text-sm theme-transition-ready text-gray-600 dark:text-gray-300"><strong>Support Email Standard</strong></p>
                   </div>
                   <div class="flex items-center">
                   <svg class="w-7 h-7 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <p class="text-sm theme-transition-ready text-gray-600 dark:text-gray-300">Fonctionnalités de base</p>
                   </div>
                   <div class="flex items-center">
                   <svg class="w-7 h-7 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <p class="text-sm theme-transition-ready text-gray-600 dark:text-gray-300">Watermark Standard</p>
                   </div>
                </div>
                <button class="w-full theme-transition-ready px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors duration-200">Choisir Standard</button>
            </div>

            <!-- Carte Droite - Offre Avancée -->
            <div class="theme-transition-ready bg-gradient-to-br from-purple-100 to-pink-200 dark:from-purple-800 dark:to-pink-900 p-6 rounded-xl shadow-xl border border-purple-200 dark:border-purple-700 transform transition-all duration-300">
               <div class="text-center relative">
                <span class="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">RECOMMANDÉ</span>
                    <h3 class="text-xl font-bold mb-2 theme-transition-ready text-gray-800 dark:text-white">Offre Avancée</h3>
                    <div class="flex items-center justify-center mb-4">
                        <span class="text-3xl font-extrabold theme-transition-ready text-pink-600 dark:text-pink-400">39,99€</span>
                        <span class="text-sm ml-2 theme-transition-ready text-gray-500 dark:text-gray-400">/mois</span>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Pour projets ambitieux.</p>
                </div>

               <div class="space-y-3 mb-6">
                  <div class="flex items-center">
                     <svg class="w-7 h-7 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                      <p class="text-sm theme-transition-ready text-gray-700 dark:text-gray-200"><strong>Templates Illimités</strong></p>
                  </div>

                 <div class="flex items-center">
                   <svg class="w-7 h-7 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  <p class="text-sm theme-transition-ready text-gray-700 dark:text-gray-200"><strong>Support Prioritaire</strong></p>
                 </div>
                 <div class="flex items-center">
                   <svg class="w-7 h-7 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  <p class="text-sm theme-transition-ready text-gray-700 dark:text-gray-200"><strong>Fonctionnalités Avancées</strong></p>
                 </div>
                 <div class="flex items-center">
                   <svg class="w-7 h-7 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  <p class="text-sm theme-transition-ready text-gray-700 dark:text-gray-200"><strong>Mises à jour régulières</strong></p>
                 </div>
               </div>
                <button class="w-full theme-transition-ready px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">Choisir Avancée</button>
            </div>
        </div>`
    }
},


    // composants ecommerce
        product: {
            productList: {
                name: "Liste de Produits (Grille Responsive)",
                html: `<section class="bg-gray-50 dark:bg-gray-900 py-12">
                    <div class="container mx-auto px-4">
                        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Nouveaux Produits</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <!-- Carte Produit 1 -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <a href="#">
                                    <img class="h-48 w-full object-cover" src="https://placehold.co/300x200" alt="Produit 1">
                                </a>
                                <div class="p-4">
                                    <a href="#">
                                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-500">Nom du Produit 1</h3>
                                    </a>
                                    <p class="text-gray-600 dark:text-gray-400 mt-2">Description courte du produit.</p>
                                    <div class="flex justify-between items-center mt-4">
                                        <span class="font-bold text-gray-900 dark:text-white">$49.99</span>
                                        <button class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm">Ajouter</button>
                                    </div>
                                </div>
                            </div>
                            <!-- Carte Produit 2 -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <a href="#">
                                    <img class="h-48 w-full object-cover" src="https://placehold.co/300x200" alt="Produit 2">
                                </a>
                                <div class="p-4">
                                    <a href="#">
                                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-500">Nom du Produit 2</h3>
                                    </a>
                                    <p class="text-gray-600 dark:text-gray-400 mt-2">Description courte du produit.</p>
                                    <div class="flex justify-between items-center mt-4">
                                        <span class="font-bold text-gray-900 dark:text-white">$59.99</span>
                                        <button class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm">Ajouter</button>
                                    </div>
                                </div>
                            </div>
                            <!-- Carte Produit 3 -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <a href="#">
                                    <img class="h-48 w-full object-cover" src="https://placehold.co/300x200" alt="Produit 3">
                                </a>
                                <div class="p-4">
                                    <a href="#">
                                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-500">Nom du Produit 3</h3>
                                    </a>
                                    <p class="text-gray-600 dark:text-gray-400 mt-2">Description courte du produit.</p>
                                    <div class="flex justify-between items-center mt-4">
                                        <span class="font-bold text-gray-900 dark:text-white">$69.99</span>
                                        <button class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm">Ajouter</button>
                                    </div>
                                </div>
                            </div>
                            <!-- Carte Produit 4 -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <a href="#">
                                    <img class="h-48 w-full object-cover" src="https://placehold.co/300x200" alt="Produit 4">
                                </a>
                                <div class="p-4">
                                    <a href="#">
                                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-500">Nom du Produit 4</h3>
                                    </a>
                                    <p class="text-gray-600 dark:text-gray-400 mt-2">Description courte du produit.</p>
                                    <div class="flex justify-between items-center mt-4">
                                        <span class="font-bold text-gray-900 dark:text-white">$79.99</span>
                                        <button class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm">Ajouter</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>`
            },
            productCardWithVariants: {
                name: "Carte Produit avec Variantes",
                html: `<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <a href="#">
                        <img class="h-64 w-full object-cover" src="https://placehold.co/300x200" alt="Produit avec Variantes">
                    </a>
                    <div class="p-4">
                        <a href="#">
                            <h3 class="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-500">Produit avec Variantes</h3>
                        </a>
                        <p class="text-gray-600 dark:text-gray-400 mt-2">Description avec options de taille et couleur.</p>
                        <div class="mt-3">
                            <label for="size" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Taille</label>
                            <select id="size" name="size" class="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800 dark:text-white">
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                                <option>XL</option>
                            </select>
                        </div>
                        <div class="mt-3">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Couleur</label>
                            <div class="flex items-center space-x-2 mt-1">
                                <button class="w-6 h-6 rounded-full bg-red-500 hover:ring-2 ring-red-500 focus:outline-none"></button>
                                <button class="w-6 h-6 rounded-full bg-blue-500 hover:ring-2 ring-blue-500 focus:outline-none"></button>
                                <button class="w-6 h-6 rounded-full bg-green-500 hover:ring-2 ring-green-500 focus:outline-none"></button>
                            </div>
                        </div>
                        <div class="flex justify-between items-center mt-4">
                            <span class="font-bold text-gray-900 dark:text-white">$79.99</span>
                            <button class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm">Ajouter au panier</button>
                        </div>
                    </div>
                </div>`
            },
            productCarousel: {
                name: "Carrousel de Produits (Responsive)",
                html: `<section class="bg-white dark:bg-gray-900 py-12">
                    <div class="container mx-auto px-4">
                        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Produits Populaires</h2>
                        <div class="overflow-x-auto whitespace-nowrap">
                            <!-- Carte Produit Carrousel 1 -->
                            <div class="inline-block w-64 sm:w-80 mx-2 rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800">
                                <a href="#">
                                    <img class="h-48 w-full object-cover" src="https://placehold.co/300x200" alt="Produit Carrousel 1">
                                </a>
                                <div class="p-4">
                                    <a href="#">
                                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-500">Produit Populaire 1</h3>
                                    </a>
                                    <p class="text-gray-600 dark:text-gray-400 mt-2">Description courte.</p>
                                    <div class="flex justify-between items-center mt-4">
                                        <span class="font-bold text-gray-900 dark:text-white">$39.99</span>
                                        <button class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm">Voir</button>
                                    </div>
                                </div>
                            </div>
                            <!-- Carte Produit Carrousel 2 -->
                            <div class="inline-block w-64 sm:w-80 mx-2 rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800">
                                <a href="#">
                                    <img class="h-48 w-full object-cover" src="https://placehold.co/300x200" alt="Produit Carrousel 2">
                                </a>
                                <div class="p-4">
                                    <a href="#">
                                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-500">Produit Populaire 2</h3>
                                    </a>
                                    <p class="text-gray-600 dark:text-gray-400 mt-2">Description courte.</p>
                                    <div class="flex justify-between items-center mt-4">
                                        <span class="font-bold text-gray-900 dark:text-white">$49.99</span>
                                        <button class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm">Voir</button>
                                    </div>
                                </div>
                            </div>
                            <!-- Carte Produit Carrousel 3 -->
                            <div class="inline-block w-64 sm:w-80 mx-2 rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800">
                                <a href="#">
                                    <img class="h-48 w-full object-cover" src="https://placehold.co/300x200" alt="Produit Carrousel 3">
                                </a>
                                <div class="p-4">
                                    <a href="#">
                                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-500">Produit Populaire 3</h3>
                                    </a>
                                    <p class="text-gray-600 dark:text-gray-400 mt-2">Description courte.</p>
                                    <div class="flex justify-between items-center mt-4">
                                        <span class="font-bold text-gray-900 dark:text-white">$59.99</span>
                                        <button class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm">Voir</button>
                                    </div>
                                </div>
                            </div>
                            <!-- Ajoutez d'autres cartes de produit ici -->
                        </div>
                    </div>
                </section>`
            },
            productDetails: {
                name: "Page Détails du Produit (Exemple structure)",
                html: `<section class="bg-white dark:bg-gray-900">
                    <div class="container mx-auto px-4 py-8">
                        <div class="lg:flex lg:space-x-8">
                            <!-- Galerie d'images -->
                            <div class="lg:w-1/2">
                                <img class="w-full rounded-lg mb-4" src="https://placehold.co/600x400" alt="Image principale du produit">
                                <div class="flex space-x-2 overflow-x-auto">
                                    <img class="w-20 h-20 rounded-md cursor-pointer border border-blue-500" src="https://placehold.co/100x100" alt="Miniature 1">
                                    <img class="w-20 h-20 rounded-md cursor-pointer hover:border-blue-500" src="https://placehold.co/100x100" alt="Miniature 2">
                                    <img class="w-20 h-20 rounded-md cursor-pointer hover:border-blue-500" src="https://placehold.co/100x100" alt="Miniature 3">
                                    <!-- Plus de miniatures -->
                                </div>
                            </div>
                            <!-- Détails du produit -->
                            <div class="lg:w-1/2 mt-4 lg:mt-0">
                                <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Nom du Produit Détaillé</h1>
                                <div class="flex items-center mb-4">
                                    <span class="text-yellow-500 mr-1"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i></span>
                                    <span class="text-gray-600 dark:text-gray-400">(4.5 Étoiles)</span>
                                </div>
                                <p class="text-gray-700 dark:text-gray-300 mb-6">Description détaillée et longue du produit pour donner toutes les informations nécessaires à l'acheteur potentiel. Peut inclure les matériaux, les dimensions, les instructions d'entretien, etc.</p>
                                <div class="mb-4">
                                    <span class="font-bold text-xl text-gray-900 dark:text-white">$99.99</span> <span class="text-gray-500 line-through">$129.99</span>
                                </div>
                                <div class="mb-4">
                                    <label for="size-detail" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Taille</label>
                                    <select id="size-detail" name="size-detail" class="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800 dark:text-white">
                                        <option>S</option>
                                        <option>M</option>
                                        <option>L</option>
                                        <option>XL</option>
                                    </select>
                                </div>
                                <div class="mb-6">
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Couleur</label>
                                    <div class="flex items-center space-x-2 mt-1">
                                        <button class="w-8 h-8 rounded-full bg-red-500 hover:ring-2 ring-red-500 focus:outline-none"></button>
                                        <button class="w-8 h-8 rounded-full bg-blue-500 hover:ring-2 ring-blue-500 focus:outline-none"></button>
                                        <button class="w-8 h-8 rounded-full bg-green-500 hover:ring-2 ring-green-500 focus:outline-none"></button>
                                    </div>
                                </div>
                                <button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold">Ajouter au panier</button>
                            </div>
                        </div>
                    </div>
                </section>`
            },
            productListFashion: {
                name: "Liste de Produits Mode (Grille Responsive)",
                html: `<section class="bg-white dark:bg-gray-900 py-12">
                    <div class="container mx-auto px-4">
                        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-8 tracking-tight">Nouvelle Collection</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            <!-- Carte Produit Mode 1 -->
                            <div class="group">
                                <div class="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    <img src="https://placehold.co/400x500" alt="Vêtement 1" class="object-cover group-hover:opacity-75 transition-opacity duration-300">
                                </div>
                                <div class="mt-4 flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                    <h3>
                                        <a href="#">
                                            <span aria-hidden="true" class="absolute inset-0"></span>
                                            Nom Vêtement 1
                                        </a>
                                    </h3>
                                    <p>$75</p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">Description courte, matières, etc.</p>
                            </div>
                            <!-- Carte Produit Mode 2 -->
                            <div class="group">
                                <div class="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    <img src="https://placehold.co/400x500" alt="Vêtement 2" class="object-cover group-hover:opacity-75 transition-opacity duration-300">
                                </div>
                                <div class="mt-4 flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                    <h3>
                                        <a href="#">
                                            <span aria-hidden="true" class="absolute inset-0"></span>
                                            Nom Vêtement 2
                                        </a>
                                    </h3>
                                    <p>$85</p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">Description courte, matières, etc.</p>
                            </div>
                            <!-- Carte Produit Mode 3 -->
                            <div class="group">
                                <div class="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    <img src="https://placehold.co/400x500" alt="Vêtement 3" class="object-cover group-hover:opacity-75 transition-opacity duration-300">
                                </div>
                                <div class="mt-4 flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                    <h3>
                                        <a href="#">
                                            <span aria-hidden="true" class="absolute inset-0"></span>
                                            Nom Vêtement 3
                                        </a>
                                    </h3>
                                    <p>$95</p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">Description courte, matières, etc.</p>
                            </div>
                            <!-- Carte Produit Mode 4 -->
                            <div class="group">
                                <div class="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    <img src="https://placehold.co/400x500" alt="Vêtement 4" class="object-cover group-hover:opacity-75 transition-opacity duration-300">
                                </div>
                                <div class="mt-4 flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                    <h3>
                                        <a href="#">
                                            <span aria-hidden="true" class="absolute inset-0"></span>
                                            Nom Vêtement 4
                                        </a>
                                    </h3>
                                    <p>$110</p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">Description courte, matières, etc.</p>
                            </div>
                        </div>
                    </div>
                </section>`
            },
            productCardTechWithVariants: {
                name: "Carte Produit Tech avec Variantes",
                html: `<div class="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
                    <a href="#" class="block">
                        <img class="h-56 w-full object-contain p-4" src="https://placehold.co/300x200" alt="Produit Tech avec Variantes">
                    </a>
                    <div class="p-4 flex-grow">
                        <a href="#">
                            <h3 class="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-500 text-center">Gadget Tech Nom</h3>
                        </a>
                        <p class="text-gray-600 dark:text-gray-400 mt-2 text-sm text-center">Dernière génération, performances améliorées.</p>
                    </div>
                    <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
                        <div class="mt-2">
                            <label for="storage" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Stockage</label>
                            <select id="storage" name="storage" class="mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800 dark:text-white">
                                <option>128GB</option>
                                <option>256GB</option>
                                <option>512GB</option>
                            </select>
                        </div>
                        <div class="flex justify-between items-center mt-4">
                            <span class="font-bold text-gray-900 dark:text-white">$249.99</span>
                            <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-semibold">Ajouter au panier</button>
                        </div>
                    </div>
                </div>`
            },
            productCarouselHomeGoods: {
                name: "Carrousel de Produits Maison (Responsive)",
                html: `<section class="bg-gray-50 dark:bg-gray-900 py-12">
                    <div class="container mx-auto px-4">
                        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Inspiration Déco</h2>
                        <div class="overflow-x-auto whitespace-nowrap pb-4">
                            <!-- Carte Produit Maison 1 -->
                            <div class="inline-block w-72 mx-3 rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800">
                                <a href="#">
                                    <img class="h-56 w-full object-cover" src="https://placehold.co/300x200" alt="Déco Maison 1">
                                </a>
                                <div class="p-4">
                                    <a href="#">
                                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-500">Objet Déco 1</h3>
                                    </a>
                                    <p class="text-gray-600 dark:text-gray-400 mt-2 text-sm">Ajoutez une touche chaleureuse à votre intérieur.</p>
                                    <div class="flex justify-between items-center mt-4">
                                        <span class="font-bold text-gray-900 dark:text-white">$29.99</span>
                                        <button class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm">Voir</button>
                                    </div>
                                </div>
                            </div>
                            <!-- Carte Produit Maison 2 -->
                            <div class="inline-block w-72 mx-3 rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800">
                                <a href="#">
                                    <img class="h-56 w-full object-cover" src="https://placehold.co/300x200" alt="Déco Maison 2">
                                </a>
                                <div class="p-4">
                                    <a href="#">
                                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-500">Objet Déco 2</h3>
                                    </a>
                                    <p class="text-gray-600 dark:text-gray-400 mt-2 text-sm">Créez une ambiance cosy et relaxante.</p>
                                    <div class="flex justify-between items-center mt-4">
                                        <span class="font-bold text-gray-900 dark:text-white">$39.99</span>
                                        <button class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm">Voir</button>
                                    </div>
                                </div>
                            </div>
                            <!-- Carte Produit Maison 3 -->
                            <div class="inline-block w-72 mx-3 rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800">
                                <a href="#">
                                    <img class="h-56 w-full object-cover" src="https://placehold.co/300x200" alt="Déco Maison 3">
                                </a>
                                <div class="p-4">
                                    <a href="#">
                                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-500">Objet Déco 3</h3>
                                    </a>
                                    <p class="text-gray-600 dark:text-gray-400 mt-2 text-sm">Parfait pour illuminer votre salon.</p>
                                    <div class="flex justify-between items-center mt-4">
                                        <span class="font-bold text-gray-900 dark:text-white">$49.99</span>
                                        <button class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm">Voir</button>
                                    </div>
                                </div>
                            </div>
                            <!-- Ajoutez d'autres cartes de produit ici -->
                        </div>
                    </div>
                </section>`
            },
            productDetailsFood: {
                name: "Page Détails Produit Alimentaire (Structure Appétissante)",
                html: `<section class="bg-white dark:bg-gray-900">
                    <div class="container mx-auto px-4 py-8">
                        <div class="lg:flex lg:space-x-8">
                            <!-- Galerie d'images Alimentaire -->
                            <div class="lg:w-1/2">
                                <img class="w-full rounded-xl mb-6 shadow-lg" src="https://placehold.co/800x600" alt="Image principale du produit alimentaire">
                                <div class="grid grid-cols-3 gap-2">
                                    <img class="w-full h-24 object-cover rounded-md cursor-pointer hover:ring-2 ring-blue-500" src="https://placehold.co/200x150" alt="Miniature 1">
                                    <img class="w-full h-24 object-cover rounded-md cursor-pointer hover:ring-2 ring-blue-500" src="https://placehold.co/200x150" alt="Miniature 2">
                                    <img class="w-full h-24 object-cover rounded-md cursor-pointer hover:ring-2 ring-blue-500" src="https://placehold.co/200x150" alt="Miniature 3">
                                </div>
                            </div>
                            <!-- Détails du produit Alimentaire -->
                            <div class="lg:w-1/2 mt-6 lg:mt-0">
                                <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Nom du Délice Gourmand</h1>
                                <div class="mb-6">
                                    <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                        Frais & Naturel
                                    </span>
                                </div>
                                <p class="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">Savourez un plaisir unique avec notre [Nom du Délice]. Préparé avec des ingrédients frais et sélectionnés, c'est l'idéal pour une pause gourmande ou un dessert raffiné. Découvrez nos différentes saveurs et laissez-vous tenter !</p>
                                <div class="flex items-center justify-between mb-6">
                                    <div>
                                        <span class="font-bold text-xl text-gray-900 dark:text-white">$12.99</span>
                                        <span class="text-gray-500 text-sm">/ portion</span>
                                    </div>
                                    <div class="flex items-center space-x-3">
                                        <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold">
                                            <i class="fas fa-shopping-cart mr-2"></i> Ajouter
                                        </button>
                                        <button class="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-md font-semibold">
                                            <i class="fas fa-heart mr-2"></i> Favoris
                                        </button>
                                    </div>
                                </div>
                                <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                                    <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">Ingrédients & Allergènes</h4>
                                    <ul class="list-disc list-inside text-gray-600 dark:text-gray-400">
                                        <li>Ingrédient 1</li>
                                        <li>Ingrédient 2</li>
                                        <li>Peut contenir des traces de : Allergène X, Allergène Y</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>`
            }
        },

        // Gallerie d'images
        gallery: {
            simple: {
                name: "Gallerie d'images simple",
                html: `<div class="container mx-auto px-4 py-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <img src="https://placehold.co/600x400" alt="Image 1" class="w-full h-64 object-cover transition-transform duration-500">
                        </div>
                        <div class="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <img src="https://placehold.co/600x400" alt="Image 2" class="w-full h-64 object-cover transition-transform duration-500">
                        </div>
                        <div class="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <img src="https://placehold.co/600x400" alt="Image 3" class="w-full h-64 object-cover transition-transform duration-500">
                        </div>
                    </div>
                </div>`
            },
            withThumbnails: {
                name: "Gallerie d'images avec miniatures",
                html: `<div class="container mx-auto px-4 py-8">
                    <div class="max-w-4xl mx-auto">
                        <div class="mb-6 rounded-xl overflow-hidden shadow-xl">
                            <img src="https://placehold.co/1200x800" alt="Image principale" class="w-full h-[500px] object-cover">
                        </div>
                        <div class="grid grid-cols-4 gap-4">
                            <div class="cursor-pointer rounded-lg overflow-hidden hover:ring-2 ring-blue-500 transition-all">
                                <img src="https://placehold.co/300x200" alt="Miniature 1" class="w-full h-24 object-cover hover:opacity-75 transition-opacity">
                            </div>
                            <div class="cursor-pointer rounded-lg overflow-hidden hover:ring-2 ring-blue-500 transition-all">
                                <img src="https://placehold.co/300x200" alt="Miniature 2" class="w-full h-24 object-cover hover:opacity-75 transition-opacity">
                            </div>
                            <div class="cursor-pointer rounded-lg overflow-hidden hover:ring-2 ring-blue-500 transition-all">
                                <img src="https://placehold.co/300x200" alt="Miniature 3" class="w-full h-24 object-cover hover:opacity-75 transition-opacity">
                            </div>
                            <div class="cursor-pointer rounded-lg overflow-hidden hover:ring-2 ring-blue-500 transition-all">
                                <img src="https://placehold.co/300x200" alt="Miniature 4" class="w-full h-24 object-cover hover:opacity-75 transition-opacity">
                            </div>
                        </div>
                    </div>
                </div>`
            },
            withZoom: {
                name: "Gallerie d'images style album",
                html: `<div class="container mx-auto px-4 py-12">
                    <div class="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
                        <div class="col-span-2 row-span-2">
                            <div class="group relative h-full overflow-hidden rounded-2xl shadow-xl">
                                <img src="https://placehold.co/800x800" alt="Image principale" class="w-full h-full object-cover transform transition-transform duration-700">
                            </div>
                        </div>
                        <div class="transform translate-y-8">
                            <div class="group relative overflow-hidden rounded-2xl shadow-xl">
                                <img src="https://placehold.co/400x500" alt="Image 2" class="w-full h-64 object-cover transform transition-transform duration-700">
                            </div>
                        </div>
                        <div class="transform -translate-y-8">
                            <div class="group relative overflow-hidden rounded-2xl shadow-xl">
                                <img src="https://placehold.co/400x500" alt="Image 3" class="w-full h-64 object-cover transform transition-transform duration-700">
                            </div>
                        </div>
                    </div>
                </div>`
            },
            withLightbox: {
                name: "Gallerie style mosaïque",
                html: `<div class="container mx-auto px-4 py-12">
                    <div class="columns-2 md:columns-3 lg:columns-4 gap-4 max-w-7xl mx-auto space-y-4">
                        <div class="break-inside-avoid">
                            <div class="group relative cursor-pointer rounded-xl overflow-hidden shadow-lg">
                                <img src="https://placehold.co/400x600" alt="Image 1" class="w-full object-cover transition-transform duration-500">
                            </div>
                        </div>
                        <div class="break-inside-avoid">
                            <div class="group relative cursor-pointer rounded-xl overflow-hidden shadow-lg">
                                <img src="https://placehold.co/400x400" alt="Image 2" class="w-full object-cover transition-transform duration-500">
                            </div>
                        </div>
                        <div class="break-inside-avoid">
                            <div class="group relative cursor-pointer rounded-xl overflow-hidden shadow-lg">
                                <img src="https://placehold.co/400x500" alt="Image 3" class="w-full object-cover transition-transform duration-500">
                            </div>
                        </div>
                        <div class="break-inside-avoid">
                            <div class="group relative cursor-pointer rounded-xl overflow-hidden shadow-lg">
                                <img src="https://placehold.co/400x600" alt="Image 3" class="w-full object-cover transition-transform duration-500">
                            </div>
                        </div>
                    </div>
                </div>`
            },
            videoSimple: {
                name: "Gallerie vidéo simple",
                html: `<div class="container mx-auto px-4 py-8">
                    <div class="max-w-4xl mx-auto">
                        <div class="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                            <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div class="mt-4">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Titre de la vidéo</h3>
                            <p class="mt-2 text-gray-600 dark:text-gray-400">Description détaillée de la vidéo avec des informations pertinentes.</p>
                        </div>
                    </div>
                </div>`
            },
            videoGrid: {
                name: "Grille de vidéos",
                html: `<div class="container mx-auto px-4 py-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="group">
                            <div class="aspect-video rounded-xl overflow-hidden shadow-lg">
                                <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <h4 class="mt-2 font-medium text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">Vidéo 1</h4>
                        </div>
                        <div class="group">
                            <div class="aspect-video rounded-xl overflow-hidden shadow-lg">
                                <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <h4 class="mt-2 font-medium text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">Vidéo 2</h4>
                        </div>
                        <div class="group">
                            <div class="aspect-video rounded-xl overflow-hidden shadow-lg">
                                <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <h4 class="mt-2 font-medium text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">Vidéo 3</h4>
                        </div>
                    </div>
                </div>`
            },
            videoPlaylist: {
                name: "Lecteur avec playlist",
                html: `<div class="container mx-auto px-4 py-8">
                    <div class="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
                        <div class="lg:w-2/3">
                            <div class="aspect-video rounded-xl overflow-hidden shadow-xl">
                                <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <div class="mt-4">
                                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Titre de la vidéo principale</h2>
                                <p class="mt-2 text-gray-600 dark:text-gray-400">Description détaillée de la vidéo principale avec des informations pertinentes.</p>
                            </div>
                        </div>
                        <div class="lg:w-1/3">
                            <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Playlist</h3>
                                <div class="space-y-4">
                                    <div class="group flex gap-4 cursor-pointer">
                                        <div class="w-32 aspect-video rounded-lg overflow-hidden">
                                            <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">Vidéo suivante 1</h4>
                                            <p class="text-sm text-gray-500 dark:text-gray-400">3:45</p>
                                        </div>
                                    </div>
                                    <div class="group flex gap-4 cursor-pointer">
                                        <div class="w-32 aspect-video rounded-lg overflow-hidden">
                                            <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">Vidéo suivante 2</h4>
                                            <p class="text-sm text-gray-500 dark:text-gray-400">4:20</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            },
            videoHero: {
                name: "Vidéo seule",
                html: `<div class="container mx-auto px-4 py-8">
                    <div class="max-w-4xl mx-auto">
                        <div class="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                            <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>`
            }
        },

        // CTA 
        cta: {
            simple: {
                name: "CTA Moderne",
                html: `<div class="container mx-auto px-4 py-16">
                    <div class="max-w-4xl mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-12 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
                        <div class="text-center">
                            <span class="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">🚀 Nouveau</span>
                            <h2 class="text-4xl font-bold text-white mb-4 leading-tight">Découvrez une nouvelle façon de créer</h2>
                            <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Rejoignez des milliers d'utilisateurs qui ont déjà transformé leur façon de travailler avec notre solution innovante.</p>
                            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button class="group px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
                                    Commencer maintenant
                                    <i class="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                                </button>
                                <button class="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
                                    En savoir plus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`
            },
            withImage: {
                name: "CTA Premium avec Image",
                html: `<div class="container mx-auto px-4 py-16">
                    <div class="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                        <div class="flex flex-col md:flex-row">
                            <div class="md:w-1/2 relative overflow-hidden">
                                <img src="https://placehold.co/800x600" alt="Image du CTA" class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700">
                                <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                            </div>
                            <div class="md:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
                                <span class="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6">✨ Premium</span>
                                <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">Élevez votre expérience au niveau supérieur</h2>
                                <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">Accédez à des fonctionnalités exclusives et débloquez tout le potentiel de notre plateforme avec notre offre premium.</p>
                                <div class="space-y-4">
                                    <button class="w-full group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                        Passer à Premium
                                        <i class="fas fa-crown transform group-hover:rotate-12 transition-transform"></i>
                                    </button>
                                    <button class="w-full px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                                        Voir les avantages
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            },
            gradientCards: {
                name: "CTA avec Cartes Gradient",
                html: `<div class="container mx-auto px-4 py-16">
                    <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div class="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
                            <div class="text-center text-white">
                                <i class="fas fa-rocket text-4xl mb-4"></i>
                                <h3 class="text-2xl font-bold mb-4">Démarrez</h3>
                                <p class="mb-6">Lancez votre projet dès aujourd'hui</p>
                                <button class="w-full py-3 bg-white text-rose-600 rounded-lg font-semibold hover:bg-rose-50 transition-colors">
                                    Commencer
                                </button>
                            </div>
                        </div>
                        <div class="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
                            <div class="text-center text-white">
                                <i class="fas fa-star text-4xl mb-4"></i>
                                <h3 class="text-2xl font-bold mb-4">Premium</h3>
                                <p class="mb-6">Accédez à toutes les fonctionnalités</p>
                                <button class="w-full py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                                    Upgrade
                                </button>
                            </div>
                        </div>
                        <div class="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
                            <div class="text-center text-white">
                                <i class="fas fa-gem text-4xl mb-4"></i>
                                <h3 class="text-2xl font-bold mb-4">Pro</h3>
                                <p class="mb-6">Solution entreprise sur mesure</p>
                                <button class="w-full py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                    Contact
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`
            },
            floatingBanner: {
                name: "Bannière Animée",
                html: `<div class="container mx-auto px-4 py-16">
                    <div class="max-w-4xl mx-auto relative">
                        <div class="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 blur-3xl transform -rotate-3"></div>
                        <div class="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 overflow-hidden">
                            <div class="absolute top-0 left-0 w-full h-full">
                                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                                <div class="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-2xl animate-float"></div>
                            </div>
                            <div class="relative z-10">
                                <div class="flex items-center justify-center mb-8">
                                    <span class="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-lg font-bold shadow-lg">
                                        <i class="fas fa-sparkles mr-2 animate-pulse"></i>
                                        Offre Exclusive
                                    </span>
                                </div>
                                <div class="text-center max-w-2xl mx-auto">
                                    <h3 class="font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 mb-6">
                                        Découvrez l'Excellence Premium
                                    </h3>
                                    <p class="text-white/90 text-xl mb-10 leading-relaxed">
                                        Libérez tout votre potentiel créatif avec nos outils premium et donnez vie à vos projets les plus ambitieux
                                    </p>
                                    <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                        <button class="group w-full sm:w-auto px-10 py-5 bg-white rounded-xl font-bold text-lg text-indigo-600 hover:text-purple-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105">
                                            <span class="flex items-center justify-center gap-3">
                                                <i class="fas fa-crown text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text"></i>
                                                Passer Premium
                                                <i class="fas fa-chevron-right transform group-hover:translate-x-2 transition-transform"></i>
                                            </span>
                                        </button>
                                        <button class="w-full sm:w-auto px-10 py-5 bg-white/20 hover:bg-white/30 text-white text-lg rounded-xl font-bold backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 border-2 border-white/30 hover:border-white/50">
                                            En savoir plus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            },
            animatedSpotlight: {
                name: "CTA avec Spotlight",
                html: `<div class="container mx-auto px-4 py-16">
                    <div class="relative max-w-4xl mx-auto overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 opacity-75"></div>
                        <div class="relative bg-black/5 backdrop-blur-sm rounded-2xl p-12">
                            <div class="text-center">
                                <span class="inline-block animate-bounce bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
                                    🔥 Offre Limitée
                                </span>
                                <h2 class="text-4xl font-bold text-white mb-6">Transformez vos idées en réalité</h2>
                                <p class="text-xl text-white/90 mb-8">Rejoignez notre communauté d'innovateurs et créez l'impossible</p>
                                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button class="px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                                        Démarrer Gratuitement
                                    </button>
                                    <button class="px-8 py-4 bg-black/20 text-white rounded-xl font-semibold hover:bg-black/30 transition-all duration-300">
                                        Voir la Démo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            }
        },

        
        
    // Composants de partage social
    social: {
        simpleIcons: {
            name: "Icônes Simples",
            html: `<div class="flex justify-center gap-4 p-4">
                <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-2xl">
                    <i class="fab fa-facebook"></i>
                </a>
                <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 text-2xl">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 text-2xl">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-600 text-2xl">
                    <i class="fab fa-linkedin"></i>
                </a>
            </div>`
        },
        roundedIcons: {
            name: "Icônes Arrondies",
            html: `<div class="flex justify-center gap-4 p-4">
                <a href="#" class="theme-transition-ready w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="theme-transition-ready w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-400">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="theme-transition-ready w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-pink-500 hover:text-white dark:hover:bg-pink-500">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="theme-transition-ready w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-700 hover:text-white dark:hover:bg-blue-700">
                    <i class="fab fa-linkedin-in"></i>
                </a>
            </div>`
        },
        coloredIcons: {
            name: "Icônes Colorées",
            html: `<div class="flex justify-center gap-4 p-4">
                <a href="#" class="theme-transition-ready w-12 h-12 flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <i class="fab fa-facebook-f text-xl"></i>
                </a>
                <a href="#" class="theme-transition-ready w-12 h-12 flex items-center justify-center rounded-lg bg-blue-400 hover:bg-blue-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <i class="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" class="theme-transition-ready w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <i class="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" class="theme-transition-ready w-12 h-12 flex items-center justify-center rounded-lg bg-blue-700 hover:bg-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <i class="fab fa-linkedin-in text-xl"></i>
                </a>
            </div>`
        },
        floatingBar: {
            name: "Barre Flottante",
            html: `<div class="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                <a href="#" class="theme-transition-ready w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-500 hover:text-white shadow-lg">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="theme-transition-ready w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-400 hover:text-white shadow-lg">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="theme-transition-ready w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-pink-500 hover:text-white shadow-lg">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="theme-transition-ready w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-700 hover:text-white shadow-lg">
                    <i class="fab fa-linkedin-in"></i>
                </a>
            </div>`
        },
        shareButtons: {
            name: "Boutons de Partage",
            html: `<div class="flex flex-wrap justify-center gap-4 p-4">
                <button class="theme-transition-ready flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                    <i class="fab fa-facebook-f"></i>
                    <span>Partager</span>
                </button>
                <button class="theme-transition-ready flex items-center gap-2 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg">
                    <i class="fab fa-twitter"></i>
                    <span>Tweet</span>
                </button>
                <button class="theme-transition-ready flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">
                    <i class="fab fa-whatsapp"></i>
                    <span>WhatsApp</span>
                </button>
                <button class="theme-transition-ready flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg">
                    <i class="fab fa-linkedin-in"></i>
                    <span>LinkedIn</span>
                </button>
            </div>`
        },
        minimalShare: {
            name: "Partage Minimal",
            html: `<div class="flex items-center justify-center gap-6 p-4">
                <button class="theme-transition-ready group flex flex-col items-center">
                    <span class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-500 group-hover:text-white">
                        <i class="fab fa-facebook-f text-xl"></i>
                    </span>
                    <span class="mt-2 text-sm text-gray-600 dark:text-gray-400">12k</span>
                </button>
                <button class="theme-transition-ready group flex flex-col items-center">
                    <span class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-400 group-hover:text-white">
                        <i class="fab fa-twitter text-xl"></i>
                    </span>
                    <span class="mt-2 text-sm text-gray-600 dark:text-gray-400">8.5k</span>
                </button>
                <button class="theme-transition-ready group flex flex-col items-center">
                    <span class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-pink-500 group-hover:text-white">
                        <i class="fab fa-instagram text-xl"></i>
                    </span>
                    <span class="mt-2 text-sm text-gray-600 dark:text-gray-400">15k</span>
                </button>
            </div>`
        },
        shareCard: {
            name: "Carte de Partage",
            html: `<div class="max-w-sm mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h3 class="text-lg font-semibold mb-4 theme-transition-ready text-gray-800 dark:text-white">Partagez cet article</h3>
                <div class="flex flex-wrap gap-3">
                    <button class="theme-transition-ready flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-blue-500 hover:text-white rounded-lg">
                        <i class="fab fa-facebook-f"></i>
                        <span>Facebook</span>
                    </button>
                    <button class="theme-transition-ready flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-blue-400 hover:text-white rounded-lg">
                        <i class="fab fa-twitter"></i>
                        <span>Twitter</span>
                    </button>
                    <button class="theme-transition-ready flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-pink-500 hover:text-white rounded-lg">
                        <i class="fab fa-instagram"></i>
                        <span>Instagram</span>
                    </button>
                </div>
            </div>`
        },
        socialStats: {
            name: "Statistiques Sociales",
            html: `<div class="max-w-2xl mx-auto p-6">
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    <div class="theme-transition-ready p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-blue-500"><i class="fab fa-facebook-f text-xl"></i></span>
                            <span class="text-green-500 text-sm">+12%</span>
                        </div>
                        <p class="text-2xl font-bold theme-transition-ready text-gray-800 dark:text-white">12,454</p>
                        <p class="text-sm theme-transition-ready text-gray-500 dark:text-gray-400">Abonnés</p>
                    </div>
                    <div class="theme-transition-ready p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-blue-400"><i class="fab fa-twitter text-xl"></i></span>
                            <span class="text-green-500 text-sm">+8%</span>
                        </div>
                        <p class="text-2xl font-bold theme-transition-ready text-gray-800 dark:text-white">8,765</p>
                        <p class="text-sm theme-transition-ready text-gray-500 dark:text-gray-400">Followers</p>
                    </div>
                    <div class="theme-transition-ready p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-pink-500"><i class="fab fa-instagram text-xl"></i></span>
                            <span class="text-green-500 text-sm">+15%</span>
                        </div>
                        <p class="text-2xl font-bold theme-transition-ready text-gray-800 dark:text-white">15,332</p>
                        <p class="text-sm theme-transition-ready text-gray-500 dark:text-gray-400">Abonnés</p>
                    </div>
                    <div class="theme-transition-ready p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-blue-700"><i class="fab fa-linkedin-in text-xl"></i></span>
                            <span class="text-green-500 text-sm">+6%</span>
                        </div>
                        <p class="text-2xl font-bold theme-transition-ready text-gray-800 dark:text-white">6,112</p>
                        <p class="text-sm theme-transition-ready text-gray-500 dark:text-gray-400">Connexions</p>
                    </div>
                </div>
            </div>`
        },
        shareWithCopy: {
            name: "Partage avec Copie",
            html: `<div class="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h3 class="text-lg font-semibold mb-4 theme-transition-ready text-gray-800 dark:text-white">Partager via</h3>
                <div class="grid grid-cols-4 gap-4 mb-6">
                    <button class="theme-transition-ready flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white">
                            <i class="fab fa-facebook-f"></i>
                        </span>
                        <span class="text-xs theme-transition-ready text-gray-600 dark:text-gray-400">Facebook</span>
                    </button>
                    <button class="theme-transition-ready flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 text-white">
                            <i class="fab fa-twitter"></i>
                        </span>
                        <span class="text-xs theme-transition-ready text-gray-600 dark:text-gray-400">Twitter</span>
                    </button>
                    <button class="theme-transition-ready flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span class="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white">
                            <i class="fab fa-whatsapp"></i>
                        </span>
                        <span class="text-xs theme-transition-ready text-gray-600 dark:text-gray-400">WhatsApp</span>
                    </button>
                </div>
                <div class="flex items-center gap-4">
                    <div class="flex-1">
                        <input type="text" value="https://example.com/share" class="w-full px-4 py-2 theme-transition-ready bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-800 dark:text-white text-sm" readonly>
                    </div>
                    <button class="theme-transition-ready px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg flex items-center gap-2">
                        <i class="fas fa-copy"></i>
                        <span>Copier</span>
                    </button>
                </div>
            </div>`
        }
    }
};

function copyComponentWithConfig(componentHtml) {
    const fullHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${themeConfig}
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="min-h-screen bg-white dark:bg-gray-900">
    <div id="preview-container">
        ${componentHtml}
    </div>
    
    <!-- Bouton de basculement du thème -->
    <button 
        onclick="toggleTheme()" 
        class="fixed bottom-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path class="dark:hidden" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            <path class="hidden dark:inline-flex" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
    </button>
</body>
</html>`;
    return fullHtml;
}

function getComponent(category, name) {
    const component = htmlAssets[category][name];
    if (!component) {
        throw new Error(`Composant non trouvé: ${category}.${name}`);
    }
    return copyComponentWithConfig(component.html);
}

function previewComponent(category, name) {
    const component = htmlAssets[category][name];
    if (!component) {
        throw new Error(`Composant non trouvé: ${category}.${name}`);
    }
    const script = document.createElement('script');
    script.textContent = `
        document.addEventListener('DOMContentLoaded', () => {
            insertComponent(\`${component.html}\`);
        });
    `;
    document.head.appendChild(script);
}

export default {
    assets: htmlAssets,
    getComponent,
    copyComponentWithConfig,
    previewComponent
}; 