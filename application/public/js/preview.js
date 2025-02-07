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

    // Ajouter la gestion des liens pour les boutons et icônes
    // On exclut les boutons de contrôle (déplacement et suppression)
    const mainContent = element.querySelector(':scope > :not(.absolute)');
    if (mainContent) {
        const buttons = mainContent.querySelectorAll('button, a, .fa, .fas, .fab, .far');
        buttons.forEach(button => {
            // Vérifier que le bouton n'est pas un bouton de contrôle
            if (!button.closest('.move-up, .move-down, .delete-element')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showLinkEditor(button);
                });
                
                // Ajouter un indicateur visuel pour montrer que l'élément est cliquable
                button.classList.add('cursor-pointer', 'hover:ring-2', 'hover:ring-blue-500', 'hover:ring-opacity-50', 'rounded');
            }
        });
    }
}

// Nouvelle fonction pour afficher l'éditeur de lien
function showLinkEditor(element) {
    // Supprimer tout menu flottant existant
    const existingMenu = document.querySelector('.floating-link-editor');
    if (existingMenu) existingMenu.remove();

    const menu = document.createElement('div');
    menu.className = 'floating-link-editor fixed bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-[1000] border dark:border-gray-700';
    
    // Récupérer le lien existant
    const parentLink = element.closest('a');
    const currentHref = parentLink ? parentLink.getAttribute('href') : '';
    const currentTarget = parentLink ? parentLink.getAttribute('target') : '_self';

    menu.innerHTML = `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL du lien</label>
                <input type="text" value="${currentHref || ''}" 
                    class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                    placeholder="https://..." 
                    id="linkUrl">
            </div>
            <div class="flex items-center gap-2">
                <input type="checkbox" id="newTab" ${currentTarget === '_blank' ? 'checked' : ''}>
                <label class="text-sm text-gray-700 dark:text-gray-300" for="newTab">
                    Ouvrir dans un nouvel onglet
                </label>
            </div>
            <div class="flex justify-end gap-2">
                <button class="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg" id="cancelLink">
                    Annuler
                </button>
                <button class="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg" id="applyLink">
                    Appliquer
                </button>
            </div>
        </div>
    `;

    // Positionner le menu près de l'élément
    const rect = element.getBoundingClientRect();
    menu.style.top = `${rect.bottom + window.scrollY + 10}px`;
    menu.style.left = `${rect.left + window.scrollX}px`;

    document.body.appendChild(menu);

    // Gestionnaires d'événements
    const handleApply = () => {
        const url = document.getElementById('linkUrl').value;
        const newTab = document.getElementById('newTab').checked;

        if (url) {
            let targetElement = element;
            if (!element.closest('a')) {
                // Créer un nouveau lien
                const link = document.createElement('a');
                element.parentNode.insertBefore(link, element);
                link.appendChild(element);
                targetElement = link;
            }

            const linkElement = element.closest('a');
            linkElement.href = url;
            linkElement.target = newTab ? '_blank' : '_self';
            if (newTab) {
                linkElement.rel = 'noopener noreferrer';
            } else {
                linkElement.removeAttribute('rel');
            }
        } else if (element.closest('a')) {
            // Supprimer le lien si l'URL est vide
            const link = element.closest('a');
            link.replaceWith(element);
        }

        menu.remove();
        updateCodePreview();
        saveCurrentState();
    };

    const handleCancel = () => {
        menu.remove();
    };

    document.getElementById('applyLink').addEventListener('click', handleApply);
    document.getElementById('cancelLink').addEventListener('click', handleCancel);

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !element.contains(e.target)) {
            menu.remove();
        }
    });
}

// Fonction pour sauvegarder l'état actuel
function saveCurrentState() {
    const previewContent = document.getElementById('previewContent');
    const elements = previewContent.querySelectorAll(':scope > div.relative');
    const savedState = [];
    
    elements.forEach(element => {
        const elementContent = element.querySelector(':scope > :not(.absolute)');
        if (elementContent) {
            // Sauvegarder tous les textes éditables avec leur position exacte
            const editableTexts = {};
            element.querySelectorAll('.editable-text').forEach((text, index) => {
                // Créer un chemin unique pour chaque texte éditable
                const path = generateElementPath(text, elementContent);
                editableTexts[path] = {
                    content: text.textContent,
                    index: index
                };
            });

            // Sauvegarder tous les liens avec leurs attributs
            const links = {};
            elementContent.querySelectorAll('a').forEach((link, index) => {
                const path = generateElementPath(link, elementContent);
                links[path] = {
                    href: link.getAttribute('href'),
                    target: link.getAttribute('target'),
                    rel: link.getAttribute('rel'),
                    index: index
                };
            });

            // Sauvegarder les classes personnalisées
            const customClasses = {};
            elementContent.querySelectorAll('[class]').forEach((el, index) => {
                const path = generateElementPath(el, elementContent);
                const classList = Array.from(el.classList)
                    .filter(cls => !['editable-text', 'focus:outline-none', 'focus:bg-gray-100', 'dark:focus:bg-gray-800', 'px-1', 'rounded'].includes(cls));
                if (classList.length > 0) {
                    customClasses[path] = {
                        classes: classList,
                        index: index
                    };
                }
            });

            savedState.push({
                html: elementContent.outerHTML,
                editableContent: editableTexts,
                links: links,
                customClasses: customClasses,
                originalStructure: serializeStructure(elementContent)
            });
        }
    });
    
    try {
        localStorage.setItem('webazonEditorState', JSON.stringify(savedState));
        // Sauvegarder une copie de backup
        sessionStorage.setItem('webazonEditorStateBackup', JSON.stringify(savedState));
    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        // En cas d'erreur avec localStorage, essayer sessionStorage
        try {
            sessionStorage.setItem('webazonEditorState', JSON.stringify(savedState));
        } catch (e) {
            console.error('Erreur de sauvegarde complète:', e);
        }
    }
}

// Fonction pour générer un chemin unique pour un élément
function generateElementPath(element, root) {
    const path = [];
    let current = element;
    
    while (current !== root && current.parentElement) {
        const parent = current.parentElement;
        const children = Array.from(parent.children);
        const index = children.indexOf(current);
        const tagName = current.tagName.toLowerCase();
        path.unshift(`${tagName}[${index}]`);
        current = parent;
    }
    
    return path.join(' > ');
}

// Fonction pour sérialiser la structure d'un élément
function serializeStructure(element) {
    return {
        tagName: element.tagName.toLowerCase(),
        children: Array.from(element.children).map(child => serializeStructure(child)),
        attributes: Array.from(element.attributes).reduce((acc, attr) => {
            if (!['contenteditable', 'class'].includes(attr.name)) {
                acc[attr.name] = attr.value;
            }
            return acc;
        }, {})
    };
}

// Fonction pour restaurer l'état sauvegardé
function restoreState() {
    let savedState;
    
    // Essayer de récupérer l'état depuis différentes sources
    try {
        savedState = localStorage.getItem('webazonEditorState');
        if (!savedState) {
            savedState = sessionStorage.getItem('webazonEditorStateBackup');
        }
        if (!savedState) {
            savedState = sessionStorage.getItem('webazonEditorState');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'état:', error);
        return;
    }

    if (savedState) {
        try {
            const previewContent = document.getElementById('previewContent');
            const codePreview = document.getElementById('codePreview');
            
            if (!previewContent || !codePreview) {
                console.error('Éléments nécessaires non trouvés');
                return;
            }
            
            previewContent.innerHTML = ''; // Nettoyer le contenu actuel
            
            const state = JSON.parse(savedState);
            if (!Array.isArray(state)) {
                console.error('État invalide:', state);
                return;
            }

            let hasRestoredContent = false;
            
            state.forEach(item => {
                if (!item || !item.html) {
                    console.warn('Élément d\'état invalide:', item);
                    return;
                }

                try {
                    const elementContainer = document.createElement('div');
                    elementContainer.className = 'relative group mb-4';
                    
                    // Recréer les boutons de contrôle
                    const moveButtons = document.createElement('div');
                    moveButtons.className = 'absolute left-1 top-1 opacity-0 group-hover:opacity-100 flex flex-col gap-0.5 z-[200]';
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
                    deleteButton.className = 'absolute right-1 top-1 opacity-0 group-hover:opacity-100 z-[200]';
                    deleteButton.innerHTML = `
                        <button class="delete-element bg-red-500 text-white p-1 rounded-lg hover:bg-red-600 transition-colors">
                            <i class="fas fa-trash text-xs"></i>
                        </button>
                    `;
                    
                    // Créer un conteneur temporaire pour parser le HTML
                    const tempContainer = document.createElement('div');
                    tempContainer.innerHTML = item.html;
                    const mainElement = tempContainer.firstElementChild;
                    
                    if (!mainElement) {
                        console.warn('Élément principal non trouvé dans:', item.html);
                        return;
                    }

                    // Restaurer les textes éditables
                    if (item.editableContent) {
                        Object.entries(item.editableContent).forEach(([path, data]) => {
                            try {
                                const element = findElementByPath(path, mainElement);
                                if (element && data.content !== undefined) {
                                    element.textContent = data.content;
                                }
                            } catch (e) {
                                console.warn('Erreur lors de la restauration du texte:', e);
                            }
                        });
                    }
                    
                    // Restaurer les liens
                    if (item.links) {
                        Object.entries(item.links).forEach(([path, data]) => {
                            try {
                                const element = findElementByPath(path, mainElement);
                                if (element) {
                                    if (data.href) element.href = data.href;
                                    if (data.target) element.target = data.target;
                                    if (data.rel) element.rel = data.rel;
                                }
                            } catch (e) {
                                console.warn('Erreur lors de la restauration du lien:', e);
                            }
                        });
                    }
                    
                    // Restaurer les classes personnalisées
                    if (item.customClasses) {
                        Object.entries(item.customClasses).forEach(([path, data]) => {
                            try {
                                const element = findElementByPath(path, mainElement);
                                if (element && Array.isArray(data.classes)) {
                                    data.classes.forEach(cls => element.classList.add(cls));
                                }
                            } catch (e) {
                                console.warn('Erreur lors de la restauration des classes:', e);
                            }
                        });
                    }
                    
                    // Vérifier la structure
                    if (item.originalStructure) {
                        try {
                            validateAndFixStructure(mainElement, item.originalStructure);
                        } catch (e) {
                            console.warn('Erreur lors de la validation de la structure:', e);
                        }
                    }
                    
                    elementContainer.appendChild(moveButtons);
                    elementContainer.appendChild(deleteButton);
                    elementContainer.appendChild(mainElement);
                    
                    // Rendre le texte éditable
                    makeElementEditable(elementContainer);
                    
                    // Attacher les événements
                    attachElementEvents(elementContainer);
                    
                    previewContent.appendChild(elementContainer);
                    hasRestoredContent = true;
                } catch (e) {
                    console.error('Erreur lors de la restauration d\'un élément:', e);
                }
            });

            if (hasRestoredContent) {
                updateCodePreview();
            } else {
                // Si aucun contenu n'a été restauré, afficher un message par défaut
                previewContent.innerHTML = '<!-- Le contenu HTML sera injecté ici -->';
                codePreview.innerHTML = '<!-- Le contenu HTML sera injecté ici -->';
            }
        } catch (error) {
            console.error('Erreur critique lors de la restauration:', error);
            // Réinitialiser en cas d'erreur critique
            document.getElementById('previewContent').innerHTML = '<!-- Le contenu HTML sera injecté ici -->';
            document.getElementById('codePreview').innerHTML = '<!-- Le contenu HTML sera injecté ici -->';
        }
    }
}

// Fonction pour trouver un élément par son chemin
function findElementByPath(path, root) {
    const parts = path.split(' > ');
    let current = root;
    
    for (const part of parts) {
        const [tagName, indexStr] = part.match(/([a-z]+)\[(\d+)\]/).slice(1);
        const index = parseInt(indexStr);
        const children = Array.from(current.children).filter(child => 
            child.tagName.toLowerCase() === tagName
        );
        
        if (children[index]) {
            current = children[index];
        } else {
            return null;
        }
    }
    
    return current;
}

// Fonction pour valider et corriger la structure
function validateAndFixStructure(element, structure) {
    if (element.tagName.toLowerCase() !== structure.tagName) {
        console.warn('Structure mismatch detected:', element.tagName, structure.tagName);
        return;
    }

    // Restaurer les attributs manquants
    Object.entries(structure.attributes).forEach(([name, value]) => {
        if (element.getAttribute(name) !== value) {
            element.setAttribute(name, value);
        }
    });

    // Vérifier récursivement les enfants
    const elementChildren = Array.from(element.children);
    structure.children.forEach((childStructure, index) => {
        if (elementChildren[index]) {
            validateAndFixStructure(elementChildren[index], childStructure);
        }
    });
}

// Fonction pour attacher les événements aux éléments
function attachElementEvents(elementContainer) {
    const moveButtons = elementContainer.querySelector('.absolute');
    const deleteButton = elementContainer.querySelector('.delete-element');
    const previewContent = document.getElementById('previewContent');
    
    // Améliorer la structure des boutons de contrôle
    moveButtons.style.pointerEvents = 'none'; // Désactiver les événements sur le conteneur
    
    const moveUpBtn = moveButtons.querySelector('.move-up');
    const moveDownBtn = moveButtons.querySelector('.move-down');
    
    // Réactiver les événements uniquement sur les boutons
    moveUpBtn.style.pointerEvents = 'auto';
    moveDownBtn.style.pointerEvents = 'auto';
    
    // Ajuster le z-index des boutons de contrôle
    moveButtons.classList.add('z-[200]');
    elementContainer.querySelector('.delete-element').parentElement.classList.add('z-[200]');

    // Fonction pour gérer le déplacement vers le haut
    const moveUp = (e) => {
        e.preventDefault(); // Empêcher le scroll sur mobile
        const previousSibling = elementContainer.previousElementSibling;
        if (previousSibling) {
            previewContent.insertBefore(elementContainer, previousSibling);
            updateCodePreview();
            saveCurrentState();
        }
    };

    // Fonction pour gérer le déplacement vers le bas
    const moveDown = (e) => {
        e.preventDefault(); // Empêcher le scroll sur mobile
        const nextSibling = elementContainer.nextElementSibling;
        if (nextSibling) {
            previewContent.insertBefore(elementContainer, nextSibling.nextElementSibling);
            updateCodePreview();
            saveCurrentState();
        }
    };

    // Ajout des événements tactiles et clic
    moveUpBtn.addEventListener('click', moveUp);
    moveUpBtn.addEventListener('touchstart', moveUp, { passive: false });
    
    moveDownBtn.addEventListener('click', moveDown);
    moveDownBtn.addEventListener('touchstart', moveDown, { passive: false });
    
    // Simplification de la gestion de la suppression
    const handleDelete = (e) => {
        e.preventDefault();
        elementContainer.remove();
        updateCodePreview();
        saveCurrentState();
    };
    
    deleteButton.addEventListener('click', handleDelete);
    deleteButton.addEventListener('touchstart', handleDelete, { passive: false });
}

// Fonction pour ajouter un élément à la prévisualisation
function addElementToPreview(element) {
    const previewContent = document.getElementById('previewContent');
    
    const elementContainer = document.createElement('div');
    elementContainer.className = 'relative group mb-4';
    
    // Améliorer la structure des boutons de contrôle
    const moveButtons = document.createElement('div');
    moveButtons.className = 'absolute left-1 top-1 opacity-0 md:opacity-0 group-hover:opacity-100 flex flex-col gap-0.5 z-[200] pointer-events-none';
    moveButtons.innerHTML = `
        <button class="move-up bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white p-2 rounded-lg transition-colors w-8 h-8 md:w-6 md:h-6 flex items-center justify-center touch-manipulation pointer-events-auto">
            <i class="fas fa-chevron-up text-xs md:text-[10px]"></i>
        </button>
        <button class="move-down bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white p-2 rounded-lg transition-colors w-8 h-8 md:w-6 md:h-6 flex items-center justify-center touch-manipulation pointer-events-auto">
            <i class="fas fa-chevron-down text-xs md:text-[10px]"></i>
        </button>
    `;
    
    // Amélioration du bouton de suppression pour mobile
    const deleteButton = document.createElement('div');
    deleteButton.className = 'absolute right-1 top-1 opacity-100 md:opacity-0 group-hover:opacity-100 z-[100]';
    deleteButton.innerHTML = `
        <button class="delete-element bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors w-8 h-8 md:w-6 md:h-6 flex items-center justify-center touch-manipulation">
            <i class="fas fa-trash text-sm md:text-xs"></i>
        </button>
    `;
    
    // Ajouter le contenu de l'élément avec un padding à gauche plus petit
    const content = document.createElement('div');
    content.innerHTML = element.html;
    
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
    const confirmReset = () => {
        return new Promise((resolve) => {
            const dialog = document.createElement('div');
            dialog.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4';
            dialog.innerHTML = `
                <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Réinitialiser l'éditeur ?
                    </h3>
                    <p class="text-gray-700 dark:text-gray-300 mb-6">
                        Tout le contenu non sauvegardé sera perdu.
                    </p>
                    <div class="flex justify-end gap-4">
                        <button id="cancelReset" class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            Annuler
                        </button>
                        <button id="confirmReset" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                            Réinitialiser
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(dialog);
            
            // Ajouter les gestionnaires d'événements avec removeEventListener
            const handleCancel = () => {
                dialog.remove();
                resolve(false);
            };
            
            const handleConfirm = () => {
                dialog.remove();
                resolve(true);
            };
            
            // Gestionnaire pour le clic en dehors
            const handleOutsideClick = (e) => {
                if (e.target === dialog) {
                    handleCancel();
                }
            };
            
            // Gestionnaire pour la touche Echap
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    handleCancel();
                }
            };
            
            // Ajouter les écouteurs d'événements
            dialog.querySelector('#cancelReset').addEventListener('click', handleCancel);
            dialog.querySelector('#confirmReset').addEventListener('click', handleConfirm);
            dialog.addEventListener('click', handleOutsideClick);
            document.addEventListener('keydown', handleEscape);
        });
    };

    confirmReset().then(confirmed => {
        if (confirmed) {
            try {
                localStorage.removeItem('webazonEditorState');
                const previewContent = document.getElementById('previewContent');
                if (previewContent) {
                    previewContent.innerHTML = '<!-- Le contenu HTML sera injecté ici -->';
                    updateCodePreview();
                }
            } catch (error) {
                console.error('Erreur lors de la réinitialisation:', error);
            }
        }
    }).catch(error => {
        console.error('Erreur lors de la confirmation:', error);
    });
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