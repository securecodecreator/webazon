// Fonctions d'édition des éléments
import { makeElementEditable, createElementContainer, attachElementEvents } from '../utils/dom.js';

/**
 * Rend les éléments interactifs éditables (liens et images)
 * @param {HTMLElement} element - L'élément parent contenant les éléments à rendre éditables
 */
function makeElementsEditable(element) {
    const mainContent = element.querySelector(':scope > :not(.absolute)');
    if (!mainContent) return;

    // Gestion des liens et boutons
    const buttons = mainContent.querySelectorAll('button, a, .fa, .fas, .fab, .far');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.dispatchEvent(new CustomEvent('editor:showLinkEditor', { 
                detail: { element: button }
            }));
        });
        
        button.classList.add(
            'cursor-pointer', 
            'hover:ring-2', 
            'hover:ring-blue-500', 
            'hover:ring-opacity-50', 
            'rounded'
        );
    });

    // Gestion des images
    const images = mainContent.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.dispatchEvent(new CustomEvent('editor:showImageEditor', { 
                detail: { element: img }
            }));
        });
        
        img.classList.add(
            'cursor-pointer', 
            'hover:ring-2', 
            'hover:ring-blue-500', 
            'hover:ring-opacity-50', 
            'rounded'
        );
    });

    // Gestion des iframes
    const iframes = mainContent.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        if (!iframe.closest('.move-up, .move-down, .delete-element')) {
            // Nettoyer les wrappers existants
            const existingWrapper = iframe.closest('.iframe-wrapper');
            if (existingWrapper) {
                existingWrapper.replaceWith(iframe);
            }
            
            // Créer une surcouche pour rendre l'iframe cliquable
            const overlay = document.createElement('div');
            overlay.className = 'absolute inset-0 bg-transparent cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50 rounded z-10';
            
            // Wrapper pour positionner la surcouche
            const wrapper = document.createElement('div');
            wrapper.className = 'relative iframe-wrapper';
            wrapper.style.width = '100%';
            wrapper.style.height = '100%';
            
            // Placer l'iframe dans le wrapper
            iframe.parentNode.insertBefore(wrapper, iframe);
            wrapper.appendChild(iframe);
            
            // Ajouter l'overlay uniquement pendant l'édition
            const handleMouseEnter = () => {
                wrapper.appendChild(overlay);
            };
            
            const handleMouseLeave = () => {
                overlay.remove();
            };
            
            wrapper.addEventListener('mouseenter', handleMouseEnter);
            wrapper.addEventListener('mouseleave', handleMouseLeave);
            
            overlay.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.dispatchEvent(new CustomEvent('editor:showLinkEditor', { 
                    detail: { element: iframe }
                }));
            });
        }
    });
}

/**
 * Fonction utilitaire pour le défilement fluide
 * @param {string} targetId - L'ID de l'élément cible
 */
function smoothScrollToElement(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const offset = 60; // Offset pour éviter que l'élément soit trop en haut
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Affiche l'éditeur de lien pour un élément
 * @param {HTMLElement} element - L'élément pour lequel afficher l'éditeur
 */
export function showLinkEditor(element) {
    // Supprimer tout menu flottant existant
    const existingMenu = document.querySelector('.floating-link-editor');
    if (existingMenu) existingMenu.remove();

    // Récupérer uniquement le premier élément avec ID de chaque composant dans la prévisualisation
    const previewContent = document.getElementById('previewContent');
    const elementsWithIds = previewContent ? Array.from(previewContent.children).map(component => component.querySelector('[id]')).filter(Boolean) : [];
    
    const menu = document.createElement('div');
    menu.className = 'floating-link-editor fixed bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-[1000] border dark:border-gray-700';
    
    // Récupérer le lien existant
    const isIframe = element.tagName === 'IFRAME';
    const currentHref = isIframe ? element.getAttribute('src') : (element.closest('a')?.getAttribute('href') || '');
    const currentTarget = isIframe ? '_self' : (element.closest('a')?.getAttribute('target') || '_self');

    menu.innerHTML = `
        <div class="space-y-4">
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type de lien</label>
                <select id="linkType" class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option value="url">URL externe</option>
                    <option value="scroll">Défilement vers un élément</option>
                </select>
            </div>
            <div id="urlInput">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL ${isIframe ? 'de l\'iframe' : 'du lien'}</label>
                <input type="text" value="${currentHref || ''}" 
                    class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                    placeholder="https://..." 
                    id="linkUrl">
            </div>
            <div id="scrollInput" class="hidden">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Élément cible</label>
                <select id="targetElement" class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option value="">Sélectionnez un élément</option>
                    ${elementsWithIds.map(el => `<option value="${el.id}">${el.id}</option>`).join('')}
                </select>
            </div>
            ${!isIframe ? `
            <div class="flex items-center gap-2">
                <input type="checkbox" id="newTab" ${currentTarget === '_blank' ? 'checked' : ''}>
                <label class="text-sm text-gray-700 dark:text-gray-300" for="newTab">
                    Ouvrir dans un nouvel onglet
                </label>
            </div>
            ` : ''}
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

    // Gestionnaires d'événements pour le type de lien
    const linkType = menu.querySelector('#linkType');
    const urlInput = menu.querySelector('#urlInput');
    const scrollInput = menu.querySelector('#scrollInput');

    linkType.addEventListener('change', () => {
        if (linkType.value === 'url') {
            urlInput.classList.remove('hidden');
            scrollInput.classList.add('hidden');
        } else {
            urlInput.classList.add('hidden');
            scrollInput.classList.remove('hidden');
        }
    });

    // Gestionnaires d'événements
    const handleApply = () => {
        const isScrollLink = linkType.value === 'scroll';
        const url = isScrollLink 
            ? `#${document.getElementById('targetElement').value}`
            : document.getElementById('linkUrl').value;
        const newTab = !isIframe && document.getElementById('newTab')?.checked;

        if (url) {
            if (isIframe) {
                // Pour les iframes, modifier directement l'attribut src
                element.src = url;
            } else {
                // Pour les autres éléments, gérer comme un lien normal
                let targetElement = element;
                if (!element.closest('a')) {
                    const link = document.createElement('a');
                    element.parentNode.insertBefore(link, element);
                    link.appendChild(element);
                    targetElement = link;
                }

                const linkElement = targetElement.closest('a');
                linkElement.href = url;
                
                if (isScrollLink) {
                    // Ajouter le gestionnaire d'événements pour le défilement fluide
                    linkElement.removeAttribute('target');
                    linkElement.removeAttribute('rel');
                    // Ajouter une classe spéciale pour identifier les liens de défilement
                    linkElement.classList.add('smooth-scroll');
                    // Ajouter le script de défilement fluide directement dans le lien
                    linkElement.setAttribute('onclick', `
                        event.preventDefault();
                        const targetId = this.getAttribute('href').substring(1);
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            const offset = 60;
                            const elementPosition = targetElement.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - offset;
                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        }
                    `);
                } else {
                    linkElement.target = newTab ? '_blank' : '_self';
                    if (newTab) {
                        linkElement.rel = 'noopener noreferrer';
                    } else {
                        linkElement.removeAttribute('rel');
                    }
                }
            }
        } else if (!isIframe && element.closest('a')) {
            // Supprimer le lien si l'URL est vide (seulement pour les éléments non-iframe)
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
    if (!previewContent) return;

    // Si c'est le premier élément, nettoyer le contenu par défaut
    if (previewContent.innerHTML.includes('<!-- Le contenu HTML sera injecté ici -->')) {
        previewContent.innerHTML = '';
    }

    // Créer un conteneur temporaire pour parser le HTML
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = element.html;
    const newElement = tempContainer.firstElementChild;

    if (newElement) {
        // Ajouter un ID basé uniquement sur le nom de l'élément
        const elementName = element.name || 'element';
        newElement.id = elementName;

        // Créer le conteneur avec les contrôles
        const elementContainer = createElementContainer(newElement);
        
        // Rendre le texte éditable
        makeElementEditable(elementContainer);
        
        // Rendre les éléments interactifs éditables
        makeElementsEditable(elementContainer);
        
        // Attacher les événements
        attachElementEvents(elementContainer);
        
        // Ajouter l'élément à la prévisualisation
        previewContent.appendChild(elementContainer);
        
        // Déclencher l'événement de mise à jour
        window.dispatchEvent(new CustomEvent('preview:update'));
        window.dispatchEvent(new CustomEvent('state:save'));
    }
}

/**
 * Ajoute plusieurs éléments à la prévisualisation
 * @param {Array<Object>} elements - Les éléments à ajouter
 */
export function addElementsToPreview(elements) {
    const previewContent = document.getElementById('previewContent');
    if (!previewContent) return;

    // Nettoyer le contenu existant
    previewContent.innerHTML = '';

    // Ajouter chaque élément
    elements.forEach((element, index) => {
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = element.html;
        const newElement = tempContainer.firstElementChild;

        if (newElement) {
            // Ajouter un ID basé sur le nom de l'élément et l'index
            const elementName = element.name || 'element';
            newElement.id = `${elementName}-${index + 1}`;

            const elementContainer = createElementContainer(newElement);
            makeElementEditable(elementContainer);
            makeElementsEditable(elementContainer);
            attachElementEvents(elementContainer);
            previewContent.appendChild(elementContainer);
        }
    });

    // Déclencher les événements de mise à jour
    window.dispatchEvent(new CustomEvent('preview:update'));
    window.dispatchEvent(new CustomEvent('state:save'));
}

/**
 * Réinitialise l'éditeur
 */
export function resetEditor() {
    const confirmReset = () => {
        const dialog = document.createElement('div');
        dialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]';
        dialog.innerHTML = `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Confirmer la réinitialisation</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-6">Êtes-vous sûr de vouloir réinitialiser l'éditeur ? Cette action est irréversible.</p>
                <div class="flex justify-end gap-4">
                    <button id="cancelReset" class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        Annuler
                    </button>
                    <button id="confirmReset" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Réinitialiser
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        return new Promise((resolve) => {
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
                // Supprimer toutes les données de stockage
                localStorage.removeItem('webazonEditorState');
                sessionStorage.removeItem('webazonEditorState');
                sessionStorage.removeItem('webazonEditorStateBackup');
                
                const previewContent = document.getElementById('previewContent');
                const codePreview = document.getElementById('codePreview');
                
                if (previewContent) {
                    previewContent.innerHTML = '<!-- Le contenu HTML sera injecté ici -->';
                }
                
                if (codePreview) {
                    codePreview.innerHTML = '<!-- Le contenu HTML sera injecté ici -->';
                }
                
                window.dispatchEvent(new CustomEvent('preview:update'));
            } catch (error) {
                console.error('Erreur lors de la réinitialisation:', error);
            }
        }
    });
}

/**
 * Affiche l'éditeur d'image pour un élément
 * @param {HTMLElement} element - L'élément pour lequel afficher l'éditeur
 */
export function showImageEditor(element) {
    // Supprimer tout menu flottant existant
    const existingMenu = document.querySelector('.floating-image-editor');
    if (existingMenu) existingMenu.remove();

    const menu = document.createElement('div');
    menu.className = 'floating-image-editor fixed bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-[1000] border dark:border-gray-700';
    
    // Récupérer les attributs existants
    const currentSrc = element.getAttribute('src') || '';
    const currentAlt = element.getAttribute('alt') || '';

    menu.innerHTML = `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL de l'image</label>
                <input type="text" value="${currentSrc}" 
                    class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                    placeholder="https://..." 
                    id="imageSrc">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Texte alternatif</label>
                <input type="text" value="${currentAlt}" 
                    class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                    placeholder="Description de l'image..." 
                    id="imageAlt">
            </div>
            <div class="flex justify-end gap-2">
                <button class="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg" id="cancelImage">
                    Annuler
                </button>
                <button class="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg" id="applyImage">
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
        const src = document.getElementById('imageSrc').value;
        const alt = document.getElementById('imageAlt').value;

        if (src) {
            element.src = src;
            element.alt = alt;
        }

        menu.remove();
        window.dispatchEvent(new CustomEvent('preview:update'));
        window.dispatchEvent(new CustomEvent('state:save'));
    };

    const handleCancel = () => {
        menu.remove();
    };

    document.getElementById('applyImage').addEventListener('click', handleApply);
    document.getElementById('cancelImage').addEventListener('click', handleCancel);

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !element.contains(e.target)) {
            menu.remove();
        }
    });
}

// Écouter les événements personnalisés
window.addEventListener('editor:showLinkEditor', (e) => {
    showLinkEditor(e.detail.element);
});

window.addEventListener('editor:showImageEditor', (e) => {
    showImageEditor(e.detail.element);
}); 