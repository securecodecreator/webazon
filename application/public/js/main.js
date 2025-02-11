// Point d'entrée principal de l'application
import htmlAssets from './assets.js';
import { addElementToPreview, resetEditor } from './components/editor.js';
import { copyCompleteCode } from './components/preview.js';
import { restoreState } from './components/state.js';
import { initCustomizationAccordion } from './components/customization.js';

/**
 * Obtient un élément HTML à partir de son chemin dans l'objet htmlAssets
 * @param {string} path - Le chemin de l'élément dans l'objet htmlAssets
 * @returns {Object} L'élément HTML correspondant
 */
export function getElementByPath(path) {
    return path.split('.').reduce((obj, key) => obj[key], htmlAssets.assets);
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser l'accordéon de personnalisation
    initCustomizationAccordion();

    // Ajouter l'événement de copie du code
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