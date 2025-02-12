// Point d'entrée principal de l'application
import htmlAssets from './assets.js';
import { addElementToPreview, addElementsToPreview, resetEditor } from './components/editor.js';
import { copyCompleteCode } from './components/preview.js';
import { restoreState } from './components/state.js';
import { initCustomizationAccordion } from './components/customization.js';
import { templateCategories } from './models.js';

/**
 * Obtient un élément HTML à partir de son chemin dans l'objet htmlAssets
 * @param {string} path - Le chemin de l'élément dans l'objet htmlAssets
 * @returns {Object} L'élément HTML correspondant
 */
export function getElementByPath(path) {
    return path.split('.').reduce((obj, key) => obj[key], htmlAssets.assets);
}

/**
 * Charge un template dans l'éditeur
 * @param {string} templateId - L'ID du template à charger
 */
function loadTemplate(templateId) {
    // Trouver le template dans les catégories
    let template = null;
    for (const category of Object.values(templateCategories)) {
        const found = category.templates.find(t => t.id === templateId);
        if (found) {
            template = found;
            break;
        }
    }

    if (template) {
        const previewContent = document.getElementById('previewContent');
        const hasContent = previewContent && 
            previewContent.children.length > 0 &&
            !previewContent.innerHTML.includes('<!-- Le contenu HTML sera injecté ici -->');

        const loadTemplateContent = () => {
            // Nettoyer le contenu existant
            if (previewContent) {
                previewContent.innerHTML = '';
            }

            // Préparer les éléments à ajouter
            const elements = template.components
                .map(componentPath => {
                    const [category, name] = componentPath.split('.');
                    if (htmlAssets.assets[category] && htmlAssets.assets[category][name]) {
                        return htmlAssets.assets[category][name];
                    }
                    return null;
                })
                .filter(element => element !== null);

            // Ajouter tous les éléments d'un coup
            addElementsToPreview(elements);
        };

        if (hasContent) {
            // Demander confirmation avant d'écraser le contenu existant
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
            
            const handleCancel = () => {
                dialog.remove();
            };
            
            const handleConfirm = () => {
                dialog.remove();
                loadTemplateContent();
            };
            
            dialog.querySelector('#cancelLoad').addEventListener('click', handleCancel);
            dialog.querySelector('#confirmLoad').addEventListener('click', handleConfirm);
            
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
        } else {
            // Charger directement si l'éditeur est vide
            loadTemplateContent();
        }
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si un template est spécifié dans l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('template');

    if (templateId) {
        loadTemplate(templateId);
    } else {
        // Restaurer l'état sauvegardé si aucun template n'est spécifié
        restoreState();
    }

    // Initialiser l'accordéon de personnalisation
    initCustomizationAccordion();

    // Ajouter l'événement de copie du code
    const copyBtn = document.getElementById('copyCodeBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyCompleteCode);
    }
    
    // Ajouter l'événement de réinitialisation
    const resetBtn = document.getElementById('resetEditor');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetEditor);
    }

    // Gestionnaires d'événements pour la modale de prévisualisation
    const previewModal = document.getElementById('previewModal');
    const closePreviewModal = document.getElementById('closePreviewModal');
    const addToPreviewFromModal = document.getElementById('addToPreviewFromModal');
    const previewModalContent = document.getElementById('previewModalContent');

    if (previewModal && closePreviewModal) {
        // Fermer la modale au clic sur le bouton de fermeture
        closePreviewModal.addEventListener('click', () => {
            previewModal.classList.add('hidden');
        });

        // Fermer la modale au clic en dehors
        previewModal.addEventListener('click', (e) => {
            if (e.target === previewModal) {
                previewModal.classList.add('hidden');
            }
        });

        // Fermer la modale avec la touche Echap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !previewModal.classList.contains('hidden')) {
                previewModal.classList.add('hidden');
            }
        });

        // Ajouter l'élément prévisualisé à l'éditeur
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