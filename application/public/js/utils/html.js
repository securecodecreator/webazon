// Fonctions de formatage et manipulation HTML

/**
 * Formate le code HTML pour une meilleure lisibilité
 * @param {string} html - Le code HTML à formater
 * @returns {string} Le code HTML formaté
 */
export function formatHtml(html) {
    let formatted = '';
    let indent = 0;
    const lines = html.split(/(?=<)/).filter(line => line.trim());
    
    lines.forEach(line => {
        if (line.match(/<\/[^>]+>/)) {
            indent = Math.max(0, indent - 2);
        }
        formatted += ' '.repeat(indent) + line.trim() + '\n';
        if (line.match(/<[^/][^>]*>/) && !line.match(/<.*\/>/)) {
            indent += 2;
        }
    });
    
    return formatted.trim();
}

/**
 * Applique la coloration syntaxique au code HTML
 * @param {string} html - Le code HTML à colorer
 * @returns {string} Le code HTML avec coloration syntaxique
 */
export function applySyntaxHighlighting(html) {
    return html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/(".*?")/g, '<span style="color: #a5d6ff;">$1</span>')
        .replace(/(&lt;\/?[a-z0-9]+)/gi, '<span style="color: #7ee787;">$1</span>')
        .replace(/(&lt;!--.*?--&gt;)/g, '<span style="color: #8b949e;">$1</span>')
        .replace(/class="([^"]*)"/, '<span style="color: #ffa657;">class</span>="<span style="color: #a5d6ff;">$1</span>"');
}

/**
 * Génère le code HTML complet pour l'exportation
 * @param {string} contentHtml - Le contenu HTML à inclure
 * @returns {string} Le code HTML complet
 */
export function generateCompleteHtml(contentHtml) {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
    tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {}
        }
    }
    </script>
    <style>
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
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
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
    ${contentHtml}
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
}

/**
 * Nettoie le HTML des éléments de contrôle
 * @param {HTMLElement} element - L'élément à nettoyer
 * @returns {string} Le HTML nettoyé
 */
export function cleanHtml(element) {
    // Créer une copie profonde de l'élément
    const elementCopy = element.cloneNode(true);
    
    // Supprimer les boutons de suppression
    const deleteButton = elementCopy.querySelector(':scope > .absolute');
    if (deleteButton) {
        deleteButton.remove();
    }
    
    // Convertir les spans éditables en texte normal
    const editableSpans = elementCopy.querySelectorAll('.editable-text');
    editableSpans.forEach(span => {
        const textNode = document.createTextNode(span.textContent);
        span.parentNode.replaceChild(textNode, span);
    });
    
    // Supprimer les classes hover-ring de tous les éléments
    const elementsWithHoverRing = elementCopy.querySelectorAll('[class*="hover:ring"]');
    elementsWithHoverRing.forEach(el => {
        el.classList.remove(...Array.from(el.classList).filter(className => className.includes('hover:ring')));
    });
    
    // Récupérer le contenu HTML nettoyé
    const cleanElement = elementCopy.querySelector(':scope > :not(.absolute)');
    return cleanElement ? cleanElement.outerHTML : '';
} 