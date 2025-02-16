import htmlAssets from './assets.js';
import { addElementToPreview, addElementsToPreview, resetEditor } from './components/editor.js';
import { copyCompleteCode } from './components/preview.js';
import { restoreState } from './components/state.js';
import { initCustomizationAccordion } from './components/customization.js';
import { templateCategories } from './models.js';

/**
 * @param {string} path 
 * @returns {Object} 
 */
export function getElementByPath(path) {
    return path.split('.').reduce((obj, key) => obj[key], htmlAssets.assets);
}

/**
 * @param {string} templateId 
 * @returns {Promise<void>}
 */
async function loadTemplate(templateId) {
    // Vérifier si le template a déjà été chargé
    const loadedTemplate = sessionStorage.getItem('loadedTemplate');
    if (loadedTemplate === templateId) {
        return;
    }

    let template = null;
    for (const category of Object.values(templateCategories)) {
        const found = category.templates.find(t => t.id === templateId);
        if (found) {
            template = found;
            break;
        }
    }

    if (template) {
        // Attendre que le DOM soit complètement chargé
        const checkAndLoadContent = () => {
            return new Promise((resolve) => {
                const previewContent = document.getElementById('previewContent');
                if (!previewContent) {
                    setTimeout(() => resolve(checkAndLoadContent()), 100);
                    return;
                }

                // S'assurer que le contenu est stable
                setTimeout(() => {
                    const hasContent = previewContent && 
                        previewContent.children.length > 0 && 
                        previewContent.textContent.trim() !== '' &&
                        !previewContent.innerHTML.includes('<!-- Le contenu HTML sera injecté ici -->') &&
                        !previewContent.innerHTML.includes('Aucun élément ajouté') &&
                        previewContent.querySelector(':not(script):not(style)') !== null;

                    const loadTemplateContent = () => {
                        return new Promise(resolveLoad => {
                            if (previewContent) {
                                previewContent.innerHTML = '';
                            }

                            const elements = template.components
                                .map(componentPath => {
                                    const [category, name] = componentPath.split('.');
                                    if (htmlAssets.assets[category] && htmlAssets.assets[category][name]) {
                                        return htmlAssets.assets[category][name];
                                    }
                                    return null;
                                })
                                .filter(element => element !== null);

                            addElementsToPreview(elements);
                            // Sauvegarder l'ID du template chargé
                            sessionStorage.setItem('loadedTemplate', templateId);
                            setTimeout(resolveLoad, 100);
                        });
                    };

                    if (hasContent) {
                        const dialog = document.createElement('div');
                        dialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]';
                        dialog.innerHTML = `
                            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                                <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Charger le template</h3>
                                <p class="text-gray-600 dark:text-gray-300 mb-6">Voulez-vous charger ce template ? Cela écrasera le contenu actuel de l'éditeur.</p>
                                <div class="flex justify-end gap-4">
                                    <button id="cancelLoad" class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                        Annuler
                                    </button>
                                    <button id="confirmLoad" class="px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90">
                                        Charger
                                    </button>
                                </div>
                            </div>
                        `;
                        
                        document.body.appendChild(dialog);
                        
                        return new Promise(resolveDialog => {
                            const handleCancel = () => {
                                dialog.remove();
                                document.removeEventListener('keydown', handleKeyDown);
                                resolveDialog();
                            };
                            
                            const handleConfirm = async () => {
                                dialog.remove();
                                document.removeEventListener('keydown', handleKeyDown);
                                await loadTemplateContent();
                                resolveDialog();
                            };
                            
                            dialog.querySelector('#cancelLoad').addEventListener('click', handleCancel);
                            dialog.querySelector('#confirmLoad').addEventListener('click', handleConfirm);
                            
                            dialog.addEventListener('click', (e) => {
                                if (e.target === dialog) {
                                    handleCancel();
                                }
                            });
                            
                            const handleKeyDown = (e) => {
                                if (e.key === 'Escape' && document.body.contains(dialog)) {
                                    handleCancel();
                                }
                            };
                            
                            document.addEventListener('keydown', handleKeyDown);
                        });
                    } else {
                        return loadTemplateContent();
                    }
                }, 100);
            });
        };

        await checkAndLoadContent();
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('template');
    const isReset = sessionStorage.getItem('isReset') === 'true';

    // Nettoyer le flag de réinitialisation
    sessionStorage.removeItem('isReset');

    // Si on change de template, nettoyer le flag de template chargé
    const currentLoadedTemplate = sessionStorage.getItem('loadedTemplate');
    if (templateId && currentLoadedTemplate && templateId !== currentLoadedTemplate) {
        sessionStorage.removeItem('loadedTemplate');
    }

    // Attendre un court instant pour s'assurer que le DOM est stable
    await new Promise(resolve => setTimeout(resolve, 100));

    if (!isReset) {
        await restoreState();
    }

    if (templateId) {
        // Attendre un court instant après la restauration du state
        await new Promise(resolve => setTimeout(resolve, 100));
        loadTemplate(templateId);
    }

    initCustomizationAccordion();

    const copyBtn = document.getElementById('copyCodeBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyCompleteCode);
    }
    
    const resetBtn = document.getElementById('resetEditor');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetEditor);
    }

    const previewModal = document.getElementById('previewModal');
    const closePreviewModal = document.getElementById('closePreviewModal');
    const addToPreviewFromModal = document.getElementById('addToPreviewFromModal');
    const previewModalContent = document.getElementById('previewModalContent');

    if (previewModal && closePreviewModal) {
        closePreviewModal.addEventListener('click', () => {
            previewModal.classList.add('hidden');
        });

        previewModal.addEventListener('click', (e) => {
            if (e.target === previewModal) {
                previewModal.classList.add('hidden');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !previewModal.classList.contains('hidden')) {
                previewModal.classList.add('hidden');
            }
        });

        if (addToPreviewFromModal) {
            addToPreviewFromModal.addEventListener('click', () => {
                const html = previewModalContent.innerHTML;
                if (html) {
                    addElementToPreview({ html });
                    previewModal.classList.add('hidden');
                }
            });
        }
    }
}); 