// Fonctions d'édition des éléments
import { makeElementEditable, createElementContainer, attachElementEvents } from '../utils/dom.js';


/**
 * Affiche l'éditeur de lien pour un élément
 * @param {HTMLElement} element - L'élément pour lequel afficher l'éditeur
 */
export function showLinkEditor(element) {
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
        window.dispatchEvent(new CustomEvent('preview:update'));
        window.dispatchEvent(new CustomEvent('state:save'));
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

/**
 * Ajoute un élément à la prévisualisation
 * @param {Object} element - L'élément à ajouter
 */
export function addElementToPreview(element) {
    const previewContent = document.getElementById('previewContent');
    
    // Créer un conteneur temporaire pour parser le HTML
    const temp = document.createElement('div');
    temp.innerHTML = element.html;
    const content = temp.firstElementChild;
    
    // Créer le conteneur avec les contrôles
    const elementContainer = createElementContainer(content);
    
    // Rendre le texte éditable
    makeElementEditable(elementContainer);
    
    // Attacher les événements
    attachElementEvents(elementContainer);
    
    // Ajouter l'élément à la prévisualisation
    previewContent.appendChild(elementContainer);
    window.dispatchEvent(new CustomEvent('preview:update'));
    window.dispatchEvent(new CustomEvent('state:save'));
}

/**
 * Réinitialise l'éditeur
 */
export function resetEditor() {
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
            
            const handleCancel = () => {
                dialog.remove();
                resolve(false);
            };
            
            const handleConfirm = () => {
                dialog.remove();
                resolve(true);
            };
            
            dialog.querySelector('#cancelReset').addEventListener('click', handleCancel);
            dialog.querySelector('#confirmReset').addEventListener('click', handleConfirm);
            
            dialog.addEventListener('click', (e) => {
                if (e.target === dialog) {
                    handleCancel();
                }
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    handleCancel();
                }
            });
        });
    };

    confirmReset().then(confirmed => {
        if (confirmed) {
            try {
                localStorage.removeItem('webazonEditorState');
                const previewContent = document.getElementById('previewContent');
                if (previewContent) {
                    previewContent.innerHTML = '<!-- Le contenu HTML sera injecté ici -->';
                    window.dispatchEvent(new CustomEvent('preview:update'));
                }
            } catch (error) {
                console.error('Erreur lors de la réinitialisation:', error);
            }
        }
    });
}

// Écouter les événements personnalisés
window.addEventListener('editor:showLinkEditor', (e) => {
    showLinkEditor(e.detail.element);
}); 