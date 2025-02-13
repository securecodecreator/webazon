import { makeElementEditable, createElementContainer, attachElementEvents } from '../utils/dom.js';

/**
 * @param {HTMLElement} element
 */
function makeElementsEditable(element) {
    const mainContent = element.querySelector(':scope > :not(.absolute)');
    if (!mainContent) return;

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

    const iframes = mainContent.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        if (!iframe.closest('.move-up, .move-down, .delete-element')) {

            const existingWrapper = iframe.closest('.iframe-wrapper');
            if (existingWrapper) {
                existingWrapper.replaceWith(iframe);
            }
            
            const overlay = document.createElement('div');
            overlay.className = 'absolute inset-0 bg-transparent cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50 rounded z-10';
            
            const wrapper = document.createElement('div');
            wrapper.className = 'relative iframe-wrapper';
            wrapper.style.width = '100%';
            wrapper.style.height = '100%';
            
            iframe.parentNode.insertBefore(wrapper, iframe);
            wrapper.appendChild(iframe);
            
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
 * @param {string} targetId 
 */
function smoothScrollToElement(targetId) {
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
}

/**
 * @param {HTMLElement} element 
 */
export function showLinkEditor(element) {
    const existingMenu = document.querySelector('.floating-link-editor');
    if (existingMenu) existingMenu.remove();

    const previewContent = document.getElementById('previewContent');
    const elementsWithIds = previewContent ? Array.from(previewContent.children).map(component => component.querySelector('[id]')).filter(Boolean) : [];
    
    const menu = document.createElement('div');
    menu.className = 'floating-link-editor fixed bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-[1000] border dark:border-gray-700';
    
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

    const rect = element.getBoundingClientRect();
    menu.style.top = `${rect.bottom + window.scrollY + 10}px`;
    menu.style.left = `${rect.left + window.scrollX}px`;

    document.body.appendChild(menu);

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

    const handleApply = () => {
        const isScrollLink = linkType.value === 'scroll';
        const url = isScrollLink 
            ? `#${document.getElementById('targetElement').value}`
            : document.getElementById('linkUrl').value;
        const newTab = !isIframe && document.getElementById('newTab')?.checked;

        if (url) {
            if (isIframe) {
                element.src = url;
            } else {
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
                    linkElement.removeAttribute('target');
                    linkElement.removeAttribute('rel');
                    linkElement.classList.add('smooth-scroll');
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

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !element.contains(e.target)) {
            menu.remove();
        }
    });
}

/**
 * @param {Object} element 
 */
export function addElementToPreview(element) {
    const previewContent = document.getElementById('previewContent');
    if (!previewContent) return;

    if (previewContent.innerHTML.includes('<!-- Le contenu HTML sera injecté ici -->')) {
        previewContent.innerHTML = '';
    }

    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = element.html;
    const newElement = tempContainer.firstElementChild;

    if (newElement) {
        const elementName = element.name || 'element';
        newElement.id = elementName;

        const elementContainer = createElementContainer(newElement);
        
        makeElementEditable(elementContainer);
        
        makeElementsEditable(elementContainer);
        
        attachElementEvents(elementContainer);
        
        previewContent.appendChild(elementContainer);
        
        window.dispatchEvent(new CustomEvent('preview:update'));
        window.dispatchEvent(new CustomEvent('state:save'));
    }
}

/**
 * @param {Array<Object>} elements 
 */
export function addElementsToPreview(elements) {
    const previewContent = document.getElementById('previewContent');
    if (!previewContent) return;

    previewContent.innerHTML = '';

    elements.forEach((element, index) => {
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = element.html;
        const newElement = tempContainer.firstElementChild;

        if (newElement) {
            const elementName = element.name || 'element';
            newElement.id = `${elementName}-${index + 1}`;

            const elementContainer = createElementContainer(newElement);
            makeElementEditable(elementContainer);
            makeElementsEditable(elementContainer);
            attachElementEvents(elementContainer);
            previewContent.appendChild(elementContainer);
        }
    });

    window.dispatchEvent(new CustomEvent('preview:update'));
    window.dispatchEvent(new CustomEvent('state:save'));
}


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
 * @param {HTMLElement} element 
 */
export function showImageEditor(element) {

    const existingMenu = document.querySelector('.floating-image-editor');
    if (existingMenu) existingMenu.remove();

    const menu = document.createElement('div');
    menu.className = 'floating-image-editor fixed bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-[1000] border dark:border-gray-700';
    
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

    const rect = element.getBoundingClientRect();
    menu.style.top = `${rect.bottom + window.scrollY + 10}px`;
    menu.style.left = `${rect.left + window.scrollX}px`;

    document.body.appendChild(menu);

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

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !element.contains(e.target)) {
            menu.remove();
        }
    });
}

window.addEventListener('editor:showLinkEditor', (e) => {
    showLinkEditor(e.detail.element);
});

window.addEventListener('editor:showImageEditor', (e) => {
    showImageEditor(e.detail.element);
}); 