import htmlAssets from '../assets.js';

export function initSelectiveCopy() {
    const selectiveModal = document.getElementById('selectiveModal');
    const copySelectiveBtn = document.getElementById('copySelectiveBtn');
    const closeSelectiveModal = document.getElementById('closeSelectiveModal');
    const elementsList = document.getElementById('elementsList');

    function toggleModal() {
        selectiveModal.classList.toggle('hidden');
        if (!selectiveModal.classList.contains('hidden')) {
            updateElementsList();
        }
    }

    function updateElementsList() {
        // Vider la liste existante
        elementsList.innerHTML = '';
        
        // Récupérer tous les éléments éditables de la prévisualisation
        const previewElements = document.querySelectorAll('[data-element]');
        
        if (previewElements.length === 0) {
            elementsList.innerHTML = `
                <div class="p-4 rounded-lg theme-transition-ready bg-gray-100 dark:bg-gray-800">
                    <p class="text-gray-700 dark:text-gray-300">Aucun élément n'est présent dans l'éditeur.</p>
                </div>
            `;
            return;
        }

        // Créer un bouton pour chaque élément
        previewElements.forEach(element => {
            const dataElement = element.getAttribute('data-element');
            const button = document.createElement('button');
            button.className = 'w-full text-left px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 theme-transition-ready text-gray-700 dark:text-gray-300';
            button.innerHTML = `<span class="font-medium">${dataElement}</span>`;
            
            button.addEventListener('click', () => {
                copyOriginalElement(dataElement);
                toggleModal();
            });
            
            elementsList.appendChild(button);
        });
    }

    function getElementByPath(path) {
        const [category, name] = path.split('.');
        if (htmlAssets.assets[category] && htmlAssets.assets[category][name]) {
            return htmlAssets.assets[category][name].html;
        }
        return null;
    }

    function copyOriginalElement(elementPath) {
        // Récupérer l'élément original des assets
        const originalHtml = getElementByPath(elementPath);
        
        if (originalHtml) {
            // Copier le HTML original dans le presse-papier
            navigator.clipboard.writeText(originalHtml)
                .then(() => {
                    // Feedback visuel
                    const originalIcon = copySelectiveBtn.innerHTML;
                    copySelectiveBtn.innerHTML = '<i class="fas fa-check text-xl"></i>';
                    setTimeout(() => {
                        copySelectiveBtn.innerHTML = originalIcon;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Erreur lors de la copie :', err);
                    // Feedback d'erreur
                    const originalIcon = copySelectiveBtn.innerHTML;
                    copySelectiveBtn.innerHTML = '<i class="fas fa-times text-xl"></i>';
                    setTimeout(() => {
                        copySelectiveBtn.innerHTML = originalIcon;
                    }, 2000);
                });
        }
    }

    // Event listeners
    copySelectiveBtn.addEventListener('click', toggleModal);
    closeSelectiveModal.addEventListener('click', toggleModal);
    
    // Fermer la modale en cliquant en dehors
    selectiveModal.addEventListener('click', (e) => {
        if (e.target === selectiveModal) {
            toggleModal();
        }
    });

    // Fermer la modale avec la touche Echap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !selectiveModal.classList.contains('hidden')) {
            toggleModal();
        }
    });
} 