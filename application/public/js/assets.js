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

// Collection d'éléments HTML réutilisables
const htmlAssets = {
    // En-têtes
    headers: {
        simple: {
            name: "En-tête Simple",
            html: `<header class="theme-transition-ready bg-white dark:bg-gray-900 p-2 w-full">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold theme-transition-ready text-gray-800 dark:text-white text-center">Votre Titre</h1>
                </div>
            </header>`
        },
        withNav: {
            name: "En-tête avec Navigation",
            html: `<header class="theme-transition-ready bg-white dark:bg-gray-800 py-4 px-3 w-full">
                <div class="max-w-7xl mx-auto">
                    <nav class="relative z-[100] flex justify-between items-center">
                        <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold theme-transition-ready text-gray-800 dark:text-white">Nom du site</h1>
                        <button id="mobile-menu-button" class="sm:hidden theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path class="menu-open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                <path class="menu-close hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <ul id="mobile-menu" class="hidden sm:flex flex-col sm:flex-row absolute sm:relative w-full sm:w-auto left-0 top-full sm:top-auto bg-white dark:bg-gray-900 sm:bg-transparent sm:dark:bg-transparent py-4 sm:py-0 mt-2 sm:mt-0 shadow-lg sm:shadow-none sm:space-x-6 z-[100]">
                            <li class="text-center sm:text-left mb-4 sm:mb-0"><a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-base sm:text-lg block sm:inline-block px-4 sm:px-0">Accueil</a></li>
                            <li class="text-center sm:text-left mb-4 sm:mb-0"><a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-base sm:text-lg block sm:inline-block px-4 sm:px-0">Services</a></li>
                            <li class="text-center sm:text-left"><a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-base sm:text-lg block sm:inline-block px-4 sm:px-0">Contact</a></li>
                        </ul>
                    </nav>
                </div>
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        const mobileMenuButton = document.getElementById('mobile-menu-button');
                        const mobileMenu = document.getElementById('mobile-menu');
                        const menuOpen = mobileMenuButton.querySelector('.menu-open');
                        const menuClose = mobileMenuButton.querySelector('.menu-close');

                        mobileMenuButton.addEventListener('click', function() {
                            mobileMenu.classList.toggle('hidden');
                            menuOpen.classList.toggle('hidden');
                            menuClose.classList.toggle('hidden');
                        });

                        document.addEventListener('click', function(event) {
                            if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target) && !mobileMenu.classList.contains('hidden')) {
                                mobileMenu.classList.add('hidden');
                                menuOpen.classList.remove('hidden');
                                menuClose.classList.add('hidden');
                            }
                        });
                    });
                </script>
            </header>`
        },
        modern: {
            name: "En-tête Moderne",
            html: `<header class="theme-transition-ready bg-white dark:bg-gray-900 shadow-lg">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
                            <button class="theme-transition-ready px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">Connexion</button>
                            <button class="theme-transition-ready px-4 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800">Inscription</button>
                        </div>
                    </div>
                </div>
            </header>`
        },
        minimal: {
            name: "En-tête Minimaliste",
            html: `<header class="theme-transition-ready bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div class="container mx-auto px-4 py-3">
                    <div class="flex justify-between items-center">
                        <h1 class="text-xl font-medium theme-transition-ready text-gray-800 dark:text-white">MinimalBrand</h1>
                        <nav class="flex items-center space-x-4">
                            <a href="#" class="theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Menu</a>
                            <div class="h-4 border-l border-gray-300 dark:border-gray-700"></div>
                            <button class="theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                <i class="fas fa-search"></i>
                            </button>
                        </nav>
                    </div>
                </div>
            </header>`
        },
        gradient: {
            name: "En-tête Gradient",
            html: `<header class="theme-transition-ready bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div class="flex justify-between items-center">
                        <h1 class="text-2xl font-bold text-white">GradientBrand</h1>
                        <nav class="hidden md:flex items-center space-x-6">
                            <a href="#" class="text-white/90 hover:text-white dark:text-white/80 dark:hover:text-white transition-colors">Accueil</a>
                            <a href="#" class="text-white/90 hover:text-white dark:text-white/80 dark:hover:text-white transition-colors">À propos</a>
                            <a href="#" class="text-white/90 hover:text-white dark:text-white/80 dark:hover:text-white transition-colors">Services</a>
                            <a href="#" class="text-white/90 hover:text-white dark:text-white/80 dark:hover:text-white transition-colors">Contact</a>
                            <button class="px-4 py-2 bg-white text-blue-500 dark:bg-gray-800 dark:text-white rounded-lg hover:bg-opacity-90 dark:hover:bg-gray-700 transition-colors">
                                Commencer
                            </button>
                        </nav>
                    </div>
                </div>
            </header>`
        },
        centered: {
            name: "En-tête Centré",
            html: `<header class="theme-transition-ready bg-white dark:bg-gray-900 shadow-md">
                <div class="container mx-auto px-4 py-6 text-center">
                    <h1 class="text-3xl font-bold mb-4 theme-transition-ready text-gray-900 dark:text-white">CenteredBrand</h1>
                    <nav class="flex justify-center space-x-8">
                        <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Accueil</a>
                        <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Collection</a>
                        <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Lookbook</a>
                        <a href="#" class="theme-transition-ready text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Contact</a>
                    </nav>
                </div>
            </header>`
        },
        transparent: {
            name: "En-tête Transparent",
            html: `<header class="absolute top-0 left-0 right-0 z-50 bg-transparent">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div class="flex justify-between items-center">
                        <h1 class="text-2xl font-bold text-white dark:text-white">TransBrand</h1>
                        <nav class="hidden md:flex items-center space-x-8">
                            <a href="#" class="text-white/90 hover:text-white dark:text-white/80 dark:hover:text-white transition-colors">Accueil</a>
                            <a href="#" class="text-white/90 hover:text-white dark:text-white/80 dark:hover:text-white transition-colors">Services</a>
                            <a href="#" class="text-white/90 hover:text-white dark:text-white/80 dark:hover:text-white transition-colors">Portfolio</a>
                            <a href="#" class="text-white/90 hover:text-white dark:text-white/80 dark:hover:text-white transition-colors">Contact</a>
                            <button class="px-6 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white dark:hover:border-gray-700 transition-colors">
                                Contact
                            </button>
                        </nav>
                    </div>
                </div>
            </header>`
        },
        compact: {
            name: "En-tête Compact",
            html: `<header class="theme-transition-ready bg-white dark:bg-gray-900">
                <div class="container mx-auto px-4">
                    <div class="h-14 flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <span class="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full"></span>
                            <span class="font-medium theme-transition-ready text-gray-900 dark:text-white">CompactBrand</span>
                        </div>
                        <nav class="flex items-center space-x-6">
                            <a href="#" class="theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">Accueil</a>
                            <a href="#" class="theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">Produits</a>
                            <a href="#" class="theme-transition-ready text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">Support</a>
                            <button class="theme-transition-ready text-sm px-3 py-1 bg-blue-500 dark:bg-blue-600 text-white rounded-full hover:bg-blue-600 dark:hover:bg-blue-700">Login</button>
                        </nav>
                    </div>
                </div>
            </header>`
        },
        creative: {
            name: "En-tête Créatif",
            html: `<header class="theme-transition-ready bg-white dark:bg-gray-900 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5"></div>
                <div class="container mx-auto px-4 py-6 relative">
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
                            <button class="theme-transition-ready px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white rounded-full hover:opacity-90 dark:hover:opacity-100 dark:hover:from-blue-500 dark:hover:to-purple-500">
                                Contact
                            </button>
                        </nav>
                    </div>
                </div>
            </header>`
        },
        ecommerce: {
            name: "En-tête E-commerce",
            html: `<header class="theme-transition-ready bg-white dark:bg-gray-900">
                <div class="container mx-auto">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>`
        }
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
            html: `<section class="theme-transition-ready bg-white dark:bg-gray-900 py-16">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div class="text-center">
                            <h3 class="text-4xl font-bold theme-transition-ready text-gray-800 dark:text-white mb-2">2K+</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Clients</p>
                        </div>
                        <div class="text-center">
                            <h3 class="text-4xl font-bold theme-transition-ready text-gray-800 dark:text-white mb-2">500+</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Projets</p>
                        </div>
                        <div class="text-center">
                            <h3 class="text-4xl font-bold theme-transition-ready text-gray-800 dark:text-white mb-2">50+</h3>
                            <p class="theme-transition-ready text-gray-600 dark:text-gray-300">Employés</p>
                        </div>
                        <div class="text-center">
                            <h3 class="text-4xl font-bold theme-transition-ready text-gray-800 dark:text-white mb-2">15+</h3>
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
            html: `<section class="theme-transition-ready bg-gray-100 dark:bg-gray-900 py-12 sm:py-16 lg:py-20 px-4 w-full">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div class="text-center">
                        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold theme-transition-ready text-gray-800 dark:text-white mb-4">Titre Principal</h2>
                        <p class="text-lg sm:text-xl theme-transition-ready text-gray-600 dark:text-gray-300 mb-8">Votre texte descriptif ici</p>
                        <button class="theme-transition-ready bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base">Action</button>
                    </div>
                </div>
            </section>`
        },
        heroWithImage: {
            name: "Section Héro avec Image",
            html: `<section class="theme-transition-ready bg-gray-100 dark:bg-gray-900 py-12 sm:py-16 lg:py-20 px-4 w-full">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                        <div class="w-full lg:w-1/2 text-center lg:text-left">
                            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold theme-transition-ready text-gray-800 dark:text-white mb-4">Titre avec Image</h2>
                            <p class="text-lg sm:text-xl theme-transition-ready text-gray-600 dark:text-gray-300 mb-8">Une description plus détaillée de votre produit ou service qui capture l'attention de vos visiteurs.</p>
                            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button class="theme-transition-ready bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm sm:text-base">Commencer</button>
                                <button class="theme-transition-ready border border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 px-6 py-3 rounded-lg text-sm sm:text-base text-gray-700 dark:text-gray-300">En savoir plus</button>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2">
                            <div class="aspect-video rounded-xl overflow-hidden shadow-xl">
                                <img src="https://placehold.co/800x450" alt="Hero Image" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
            </section>`
        },
        heroGradient: {
            name: "Section Héro avec Gradient",
            html: `<section class="relative overflow-hidden theme-transition-ready bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 py-16 sm:py-24 lg:py-32 px-4 w-full">
                <div class="absolute inset-0 bg-grid-white/[0.05] dark:bg-grid-white/[0.02]"></div>
                <div class="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div class="text-center">
                        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Titre Accrocheur</h2>
                        <p class="text-xl sm:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">Une description captivante qui met en valeur votre proposition unique de valeur.</p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <button class="theme-transition-ready bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">Démarrer</button>
                            <button class="theme-transition-ready bg-transparent border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors">Voir la démo</button>
                        </div>
                    </div>
                </div>
            </section>`
        },
        features: {
            name: "Section Fonctionnalités",
            html: `<section class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    <div class="theme-transition-ready bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h3 class="text-lg sm:text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-4 text-center">Fonctionnalité 1</h3>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-center">Description de la fonctionnalité</p>
                    </div>
                    <div class="theme-transition-ready bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h3 class="text-lg sm:text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-4 text-center">Fonctionnalité 2</h3>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-center">Description de la fonctionnalité</p>
                    </div>
                    <div class="theme-transition-ready bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h3 class="text-lg sm:text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-4 text-center">Fonctionnalité 3</h3>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-center">Description de la fonctionnalité</p>
                    </div>
                </div>
            </section>`
        },
        featuresWithIcons: {
            name: "Section Fonctionnalités avec Icônes",
            html: `<section class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <div class="text-center mb-12">
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold theme-transition-ready text-gray-800 dark:text-white mb-4">Nos Fonctionnalités</h2>
                    <p class="text-lg theme-transition-ready text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Découvrez tout ce que nous pouvons faire pour vous</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="theme-transition-ready bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6 mx-auto md:mx-0">
                            <i class="fas fa-rocket text-blue-500 dark:text-blue-400 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-4 text-center md:text-left">Performance</h3>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-center md:text-left">Des performances optimales pour une expérience utilisateur exceptionnelle.</p>
                    </div>
                    <div class="theme-transition-ready bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-6 mx-auto md:mx-0">
                            <i class="fas fa-shield-alt text-green-500 dark:text-green-400 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-4 text-center md:text-left">Sécurité</h3>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-center md:text-left">Protection maximale de vos données et de votre vie privée.</p>
                    </div>
                    <div class="theme-transition-ready bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-6 mx-auto md:mx-0">
                            <i class="fas fa-magic text-purple-500 dark:text-purple-400 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold theme-transition-ready text-gray-800 dark:text-white mb-4 text-center md:text-left">Innovation</h3>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-center md:text-left">Des solutions innovantes pour répondre à vos besoins.</p>
                    </div>
                </div>
            </section>`
        },
        featuresGrid: {
            name: "Section Fonctionnalités en Grille",
            html: `<section class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <div class="text-center mb-12">
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold theme-transition-ready text-gray-800 dark:text-white mb-4">Fonctionnalités Complètes</h2>
                    <p class="text-lg theme-transition-ready text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Une suite complète d'outils pour votre réussite</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="theme-transition-ready bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div class="text-blue-500 dark:text-blue-400 mb-4">
                            <i class="fas fa-chart-line text-3xl"></i>
                        </div>
                        <h3 class="text-lg font-semibold theme-transition-ready text-gray-800 dark:text-white mb-2">Analytique</h3>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-sm">Suivez vos performances en temps réel</p>
                    </div>
                    <div class="theme-transition-ready bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div class="text-green-500 dark:text-green-400 mb-4">
                            <i class="fas fa-users text-3xl"></i>
                        </div>
                        <h3 class="text-lg font-semibold theme-transition-ready text-gray-800 dark:text-white mb-2">Collaboration</h3>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-sm">Travaillez en équipe efficacement</p>
                    </div>
                    <div class="theme-transition-ready bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div class="text-purple-500 dark:text-purple-400 mb-4">
                            <i class="fas fa-cloud text-3xl"></i>
                        </div>
                        <h3 class="text-lg font-semibold theme-transition-ready text-gray-800 dark:text-white mb-2">Cloud</h3>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-sm">Accédez à vos données partout</p>
                    </div>
                    <div class="theme-transition-ready bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div class="text-red-500 dark:text-red-400 mb-4">
                            <i class="fas fa-lock text-3xl"></i>
                        </div>
                        <h3 class="text-lg font-semibold theme-transition-ready text-gray-800 dark:text-white mb-2">Sécurité</h3>
                        <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-sm">Protection de vos données</p>
                    </div>
                </div>
            </section>`
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
                    <p class="theme-transition-ready text-gray-600 dark:text-gray-300 text-center text-sm sm:text-base">&copy; 2024 Votre Entreprise. Tous droits réservés.</p>
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

// Fonction utilitaire pour copier un composant avec sa configuration
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

// Fonction pour obtenir un composant prêt à l'emploi
function getComponent(category, name) {
    const component = htmlAssets[category][name];
    if (!component) {
        throw new Error(`Composant non trouvé: ${category}.${name}`);
    }
    return copyComponentWithConfig(component.html);
}

// Fonction pour insérer directement un composant dans la prévisualisation
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

// Exporter les assets et les fonctions utilitaires
export default {
    assets: htmlAssets,
    getComponent,
    copyComponentWithConfig,
    previewComponent
}; 