import htmlAssets from './assets.js';

const templateCategories = {
    landingPages: {
        name: 'Landing Pages',
        templates: [
            {
                id: 'startup',
                name: 'Startup Modern',
                description: 'Template moderne pour startup avec sections hero, features et pricing',
                components: ['headers.gradient', 'about.withImage', 'about.team', 'sections.heroWithImage', 'sections.features', 'pricing.premium', 'faq.modern', 'social.coloredIcons', 'footers.withLinks'],
                thumbnail: 'https://placehold.co/600x400/2563eb/ffffff?text=Startup+Modern'
            },
            {
                id: 'product',
                name: 'Product Launch',
                description: 'Page de lancement de produit avec focus sur la conversion',
                components: ['headers.centered', 'sections.heroWithImage', 'sections.featuresGrid', 'about.testimonials', 'about.cta', 'form.contact', 'pricing.premiumLite', 'forms.newsletter', 'footers.simple'],
                thumbnail: 'https://placehold.co/600x400/10b981/ffffff?text=Product+Launch'
            }
        ]
    },
    portfolio: {
        name: 'Portfolios',
        templates: [
            {
                id: 'creative',
                name: 'Creative Portfolio',
                description: 'Portfolio créatif avec galerie et sections projets',
                components: ['headers.minuit', 'about.withImage', 'sections.heroWithImage', 'forms.searchAdvanced', 'about.mission', 'pricing.compare', 'social.socialStats', 'footers.withLinks'],
                thumbnail: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Creative+Portfolio'
            }
        ]
    },
    ecommerce: {
        name: 'E-commerce',
        templates: [
            {
                id: 'shop',
                name: 'Boutique Simple',
                description: 'Template e-commerce avec catalogue et panier',
                components: ['headers.ecommerce', 'product.productList', 'product.productCardWithVariants', 'product.productCarouselHomeGoods', 'forms.newsletter', 'faq.gradient', 'social.roundedIcons', 'footers.withLinks'],
                thumbnail: 'https://placehold.co/600x400/ec4899/ffffff?text=Boutique+Simple'
            }
        ]
    }
};

let currentFilter = 'all';
let currentTemplate = null;

document.addEventListener('DOMContentLoaded', () => {
    initializeTemplates();
    initializeFilters();
    initializeModals();
});

function initializeTemplates() {
    const templatesGrid = document.getElementById('templatesGrid');
    templatesGrid.innerHTML = '';

    Object.values(templateCategories).forEach(category => {
        if (currentFilter === 'all' || currentFilter === category.name.toLowerCase()) {
            category.templates.forEach(template => {
                templatesGrid.appendChild(createTemplateCard(template));
            });
        }
    });
}

function createTemplateCard(template) {
    const card = document.createElement('div');
    card.className = 'theme-transition-ready bg-light-nav dark:bg-dark-nav rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300';
    
    card.innerHTML = `
        <div class="aspect-video w-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
            <img src="${template.thumbnail}" alt="${template.name}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                <button class="preview-btn px-6 py-3 bg-white/90 hover:bg-white text-gray-900 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                    <i class="fas fa-eye mr-2"></i>
                    Prévisualiser
                </button>
            </div>
        </div>
        <div class="p-6">
            <h3 class="text-xl font-semibold mb-2 theme-transition-ready text-gray-800 dark:text-gray-200">${template.name}</h3>
            <p class="theme-transition-ready text-gray-600 dark:text-gray-400 mb-4">${template.description}</p>
            <div class="flex justify-between items-center">
                <button class="edit-btn theme-transition-ready text-light-primary dark:text-dark-primary hover:underline">
                    <i class="fas fa-edit mr-1"></i>
                    Éditer
                </button>
                <button class="download-btn theme-transition-ready text-gray-600 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary">
                    <i class="fas fa-download"></i>
                </button>
            </div>
        </div>
    `;

    card.querySelector('.preview-btn').addEventListener('click', () => previewTemplate(template));
    card.querySelector('.edit-btn').addEventListener('click', () => editTemplate(template));
    card.querySelector('.download-btn').addEventListener('click', () => downloadTemplate(template));

    return card;
}

function initializeFilters() {
    const filterButtons = document.querySelectorAll('.mb-8 button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-light-primary', 'dark:bg-dark-primary', 'text-white');
                btn.classList.add('bg-light-nav', 'dark:bg-dark-nav', 'text-gray-700', 'dark:text-gray-300');
            });

            button.classList.remove('bg-light-nav', 'dark:bg-dark-nav', 'text-gray-700', 'dark:text-gray-300');
            button.classList.add('bg-light-primary', 'dark:bg-dark-primary', 'text-white');

            const filterText = button.textContent.trim().toLowerCase();
            currentFilter = filterText === 'tous' ? 'all' : filterText;
            
            initializeTemplates();
        });
    });
}

function initializeModals() {
    const previewModal = document.getElementById('previewModal');
    const closePreviewModal = document.getElementById('closePreviewModal');
    const editInBuilder = document.getElementById('editInBuilder');
    const downloadBtn = document.getElementById('downloadTemplate');
    const modalContent = previewModal.querySelector('.absolute');

    function updateModalPosition() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const modalHeight = modalContent.offsetHeight;
        
        const topPosition = Math.max(
            viewportHeight * 0.1,
            Math.min(
                scrollY + (viewportHeight - modalHeight) / 2,
                document.documentElement.scrollHeight - modalHeight - viewportHeight * 0.1
            )
        );
        
        modalContent.style.top = `${topPosition}px`;
    }

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!previewModal.classList.contains('hidden')) {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(updateModalPosition, 10);
        }
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (!previewModal.classList.contains('hidden')) {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(updateModalPosition, 10);
        }
    });

    closePreviewModal.addEventListener('click', () => {
        previewModal.classList.add('hidden');
    });

    editInBuilder.addEventListener('click', () => {
        if (currentTemplate) {
            window.location.href = `app.html?template=${currentTemplate.id}`;
        }
    });

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if (currentTemplate) {
                const previewContent = document.getElementById('previewModalContent');
                const html = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${currentTemplate.name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {}
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            font-family: 'Poppins', sans-serif;
        }

        .theme-transition-ready {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }

        @media (prefers-color-scheme: dark) {
            :root {
                color-scheme: dark;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            * {
                transition: none !important;
            }
        }
    </style>
    <script>
        // Fonction pour gérer le thème
        function initTheme() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');

            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!localStorage.getItem('theme')) {
                    document.documentElement.classList.toggle('dark', e.matches);
                }
            });
        }

        function toggleTheme() {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }

        document.addEventListener('DOMContentLoaded', initTheme);
    </script>
</head>
<body class="min-h-screen bg-white dark:bg-gray-900">
    ${previewContent.innerHTML}
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
                
                const blob = new Blob([html], { type: 'text/html' });
                const url = window.URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = `template-${currentTemplate.id}.html`;
                document.body.appendChild(a);
                a.click();
                
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        });
    }

    window.updateModalPosition = updateModalPosition;
}

function previewTemplate(template) {
    currentTemplate = template;
    const previewModal = document.getElementById('previewModal');
    const previewContent = document.getElementById('previewModalContent');
    
    let templateContent = '';
    template.components.forEach(componentPath => {
        const [category, name] = componentPath.split('.');
        if (htmlAssets.assets[category] && htmlAssets.assets[category][name]) {
            templateContent += htmlAssets.assets[category][name].html;
        }
    });

    previewContent.innerHTML = templateContent;
    previewModal.classList.remove('hidden');
    
    setTimeout(() => {
        if (window.updateModalPosition) {
            window.updateModalPosition();
        }
    }, 0);
}

function editTemplate(template) {
    window.location.href = `app.html?template=${template.id}`;
}

function downloadTemplate(template) {
    const templateContent = template.components
        .map(componentPath => {
            const [category, name] = componentPath.split('.');
            if (htmlAssets.assets[category] && htmlAssets.assets[category][name]) {
                return htmlAssets.assets[category][name].html;
            }
            return '';
        })
        .join('\n\n');

    const html = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            font-family: 'Poppins', sans-serif;
        }

        .theme-transition-ready {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }

        @media (prefers-color-scheme: dark) {
            :root {
                color-scheme: dark;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            * {
                transition: none !important;
            }
        }
    </style>
</head>
<body class="min-h-screen bg-white dark:bg-gray-900">
    ${templateContent}
    <!-- Bouton de basculement du thème -->
    <button 
        onclick="toggleTheme()" 
        class="fixed bottom-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path class="dark:hidden" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            <path class="hidden dark:inline-flex" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
    </button>
    <script>
    tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {}
        }
    }
        // Fonction pour gérer le thème
        function initTheme() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');

            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!localStorage.getItem('theme')) {
                    document.documentElement.classList.toggle('dark', e.matches);
                }
            });
        }

        function toggleTheme() {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }

        document.addEventListener('DOMContentLoaded', initTheme);
    </script>
</body>
</html>`;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `template-${template.id}.html`;
    document.body.appendChild(a);
    a.click();
    
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

export {
    templateCategories,
    previewTemplate,
    editTemplate,
    downloadTemplate
}; 