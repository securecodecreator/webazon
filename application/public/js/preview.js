import htmlAssets from './assets.js';

// Fonction pour obtenir un élément HTML à partir de son chemin dans l'objet htmlAssets
function getElementByPath(path) {
    return path.split('.').reduce((obj, key) => obj[key], htmlAssets.assets);
}

// Fonction pour mettre à jour l'affichage du code
function updateCodePreview() {
    const previewContent = document.getElementById('previewContent');
    const codePreview = document.getElementById('codePreview');
    
    // Récupérer tous les éléments (en excluant les boutons de suppression)
    const elements = previewContent.querySelectorAll(':scope > div.relative');
    let cleanHtml = '';
    
    elements.forEach(element => {
        // Récupérer le contenu HTML en excluant le bouton de suppression
        const elementContent = element.querySelector(':scope > :not(.absolute)');
        if (elementContent) {
            cleanHtml += elementContent.outerHTML + '\n';
        }
    });
    
    // Si aucun élément n'est présent, afficher un commentaire
    if (!cleanHtml.trim()) {
        cleanHtml = '<!-- Le contenu HTML sera injecté ici -->';
    }
    
    // Formater le code pour une meilleure lisibilité
    const formattedHtml = formatHtml(cleanHtml);
    
    // Mettre à jour l'affichage du code avec coloration syntaxique
    codePreview.innerHTML = formattedHtml
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/(".*?")/g, '<span style="color: #a5d6ff;">$1</span>')
        .replace(/(&lt;\/?[a-z0-9]+)/gi, '<span style="color: #7ee787;">$1</span>')
        .replace(/(&lt;!--.*?--&gt;)/g, '<span style="color: #8b949e;">$1</span>')
        .replace(/class="([^"]*)"/, '<span style="color: #ffa657;">class</span>="<span style="color: #a5d6ff;">$1</span>"');
}

// Fonction pour formater le HTML
function formatHtml(html) {
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

// Fonction pour rendre un élément éditable
function makeElementEditable(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    while (node = walker.nextNode()) {
        if (node.parentElement.tagName !== 'SCRIPT' && 
            node.parentElement.tagName !== 'STYLE' && 
            node.textContent.trim() !== '') {
            textNodes.push(node);
        }
    }

    textNodes.forEach(textNode => {
        const span = document.createElement('span');
        span.contentEditable = true;
        span.textContent = textNode.textContent;
        span.className = 'editable-text focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 px-1 rounded';
        span.addEventListener('input', () => {
            updateCodePreview();
        });
        span.addEventListener('blur', () => {
            if (span.textContent.trim() === '') {
                span.textContent = 'Texte';
            }
        });
        textNode.parentNode.replaceChild(span, textNode);
    });
}

// Fonction pour sauvegarder l'état actuel
function saveCurrentState() {
    const previewContent = document.getElementById('previewContent');
    const elements = previewContent.querySelectorAll(':scope > div.relative');
    const savedState = [];
    
    elements.forEach(element => {
        const elementContent = element.querySelector(':scope > :not(.absolute)');
        const editableTexts = element.querySelectorAll('.editable-text');
        const textContent = {};
        
        editableTexts.forEach((text, index) => {
            textContent[index] = text.textContent;
        });
        
        if (elementContent) {
            savedState.push({
                html: elementContent.outerHTML,
                editableContent: textContent
            });
        }
    });
    
    localStorage.setItem('webazonEditorState', JSON.stringify(savedState));
}

// Fonction pour restaurer l'état sauvegardé
function restoreState() {
    const savedState = localStorage.getItem('webazonEditorState');
    if (savedState) {
        const previewContent = document.getElementById('previewContent');
        previewContent.innerHTML = ''; // Nettoyer le contenu actuel
        
        const state = JSON.parse(savedState);
        state.forEach(item => {
            const elementContainer = document.createElement('div');
            elementContainer.className = 'relative group mb-4';
            
            // Recréer les boutons de déplacement
            const moveButtons = document.createElement('div');
            moveButtons.className = 'absolute left-1 top-1 opacity-0 group-hover:opacity-100 flex flex-col gap-0.5 z-[100]';
            moveButtons.innerHTML = `
                <button class="move-up bg-gray-500 hover:bg-gray-600 text-white p-1 rounded-lg transition-colors w-6 h-6 flex items-center justify-center">
                    <i class="fas fa-chevron-up text-[10px]"></i>
                </button>
                <button class="move-down bg-gray-500 hover:bg-gray-600 text-white p-1 rounded-lg transition-colors w-6 h-6 flex items-center justify-center">
                    <i class="fas fa-chevron-down text-[10px]"></i>
                </button>
            `;
            
            // Recréer le bouton de suppression
            const deleteButton = document.createElement('div');
            deleteButton.className = 'absolute right-1 top-1 opacity-0 group-hover:opacity-100 z-[100]';
            deleteButton.innerHTML = `
                <button class="delete-element bg-red-500 text-white p-1 rounded-lg hover:bg-red-600 transition-colors">
                    <i class="fas fa-trash text-xs"></i>
                </button>
            `;
            
            // Ajouter le contenu
            const content = document.createElement('div');
            content.innerHTML = item.html;
            content.firstElementChild.classList.add('pl-8');
            
            elementContainer.appendChild(moveButtons);
            elementContainer.appendChild(deleteButton);
            elementContainer.appendChild(content.firstElementChild);
            
            // Rendre le texte éditable et restaurer le contenu
            makeElementEditable(elementContainer);
            const editableTexts = elementContainer.querySelectorAll('.editable-text');
            Object.entries(item.editableContent).forEach(([index, text]) => {
                if (editableTexts[index]) {
                    editableTexts[index].textContent = text;
                }
            });
            
            // Réattacher les événements
            attachElementEvents(elementContainer);
            
            previewContent.appendChild(elementContainer);
        });
        
        updateCodePreview();
    }
}

// Fonction pour attacher les événements aux éléments
function attachElementEvents(elementContainer) {
    const moveButtons = elementContainer.querySelector('.absolute');
    const deleteButton = elementContainer.querySelector('.delete-element');
    const previewContent = document.getElementById('previewContent');
    
    moveButtons.querySelector('.move-up').addEventListener('click', () => {
        const previousSibling = elementContainer.previousElementSibling;
        if (previousSibling) {
            previewContent.insertBefore(elementContainer, previousSibling);
            updateCodePreview();
            saveCurrentState();
        }
    });
    
    moveButtons.querySelector('.move-down').addEventListener('click', () => {
        const nextSibling = elementContainer.nextElementSibling;
        if (nextSibling) {
            previewContent.insertBefore(elementContainer, nextSibling.nextElementSibling);
            updateCodePreview();
            saveCurrentState();
        }
    });
    
    deleteButton.addEventListener('click', () => {
        elementContainer.remove();
        updateCodePreview();
        saveCurrentState();
    });
}

// Fonction pour ajouter un élément à la prévisualisation
function addElementToPreview(element) {
    const previewContent = document.getElementById('previewContent');
    
    // Créer un conteneur pour l'élément
    const elementContainer = document.createElement('div');
    elementContainer.className = 'relative group mb-4';
    
    // Créer le conteneur pour les boutons de déplacement
    const moveButtons = document.createElement('div');
    moveButtons.className = 'absolute left-1 top-1 opacity-0 group-hover:opacity-100 flex flex-col gap-0.5 z-[100]';
    moveButtons.innerHTML = `
        <button class="move-up bg-gray-500 hover:bg-gray-600 text-white p-1 rounded-lg transition-colors w-6 h-6 flex items-center justify-center">
            <i class="fas fa-chevron-up text-[10px]"></i>
        </button>
        <button class="move-down bg-gray-500 hover:bg-gray-600 text-white p-1 rounded-lg transition-colors w-6 h-6 flex items-center justify-center">
            <i class="fas fa-chevron-down text-[10px]"></i>
        </button>
    `;
    
    // Ajouter le bouton de suppression
    const deleteButton = document.createElement('div');
    deleteButton.className = 'absolute right-1 top-1 opacity-0 group-hover:opacity-100 z-[100]';
    deleteButton.innerHTML = `
        <button class="delete-element bg-red-500 text-white p-1 rounded-lg hover:bg-red-600 transition-colors">
            <i class="fas fa-trash text-xs"></i>
        </button>
    `;
    
    // Ajouter le contenu de l'élément avec un padding à gauche plus petit
    const content = document.createElement('div');
    content.innerHTML = element.html;
    content.firstElementChild.classList.add('pl-8');
    
    // Assembler le conteneur
    elementContainer.appendChild(moveButtons);
    elementContainer.appendChild(deleteButton);
    elementContainer.appendChild(content.firstElementChild);
    
    // Rendre le texte éditable
    makeElementEditable(elementContainer);
    
    // Attacher les événements
    attachElementEvents(elementContainer);
    
    // Ajouter l'élément à la prévisualisation
    previewContent.appendChild(elementContainer);
    updateCodePreview();
    saveCurrentState();
}

// Fonction pour copier le code complet
function copyCompleteCode() {
    const previewContent = document.getElementById('previewContent');
    const elements = previewContent.querySelectorAll(':scope > div.relative');
    let contentHtml = '';
    
    elements.forEach(element => {
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
        
        // Récupérer le contenu HTML nettoyé
        const cleanElement = elementCopy.querySelector(':scope > :not(.absolute)');
        if (cleanElement) {
            contentHtml += cleanElement.outerHTML + '\n';
        }
    });

    const completeHtml = `<!DOCTYPE html>
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

    navigator.clipboard.writeText(completeHtml).then(() => {
        const copyBtn = document.getElementById('copyCodeBtn');
        copyBtn.innerHTML = '<i class="fas fa-check text-green-500"></i>';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
    });
}

// Fonction pour réinitialiser l'éditeur
function resetEditor() {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser l'éditeur ? Tout le contenu non sauvegardé sera perdu.")) {
        localStorage.removeItem('webazonEditorState');
        const previewContent = document.getElementById('previewContent');
        previewContent.innerHTML = '<!-- Le contenu HTML sera injecté ici -->';
        updateCodePreview();
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter les événements aux boutons de composants
    const buttons = document.querySelectorAll('[data-element]');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const elementPath = button.getAttribute('data-element');
            const element = getElementByPath(elementPath);
            if (element) {
                addElementToPreview(element);
            }
        });
    });

    const copyBtn = document.getElementById('copyCodeBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyCompleteCode);
    }
    
    // Restaurer l'état sauvegardé
    restoreState();
    
    // Ajouter l'événement de réinitialisation
    const resetBtn = document.getElementById('resetEditor');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetEditor);
    }
    
    // Ajouter la sauvegarde lors de l'édition du texte
    document.addEventListener('input', (e) => {
        if (e.target.classList.contains('editable-text')) {
            saveCurrentState();
        }
    });
    
    updateCodePreview();
}); 