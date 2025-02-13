import htmlAssets from '../assets.js';

export function initSelectiveCopy() {
    const selectiveModal = document.getElementById('selectiveModal');
    const previewModal = document.getElementById('previewModal');
    const copySelectiveBtn = document.getElementById('copySelectiveBtn');
    const closeSelectiveModal = document.getElementById('closeSelectiveModal');
    const closePreviewModal = document.getElementById('closePreviewModal');
    const backToSelectiveModal = document.getElementById('backToSelectiveModal');
    const elementsList = document.getElementById('elementsList');
    const previewModalContent = document.getElementById('previewModalContent');
    const copyPreviewElement = document.getElementById('copyPreviewElement');

    let currentElementPath = null;

    function toggleSelectiveModal() {
        selectiveModal.classList.toggle('hidden');
        if (!selectiveModal.classList.contains('hidden')) {
            updateElementsList();
        }
    }

    function togglePreviewModal() {
        previewModal.classList.toggle('hidden');
    }

    function switchToSelectiveModal() {
        togglePreviewModal();
        toggleSelectiveModal();
    }

    function updateElementsList() {
        elementsList.innerHTML = '';
        
        const previewElements = document.querySelectorAll('[data-element]');
        
        if (previewElements.length === 0) {
            elementsList.innerHTML = `
                <div class="p-4 rounded-lg theme-transition-ready bg-gray-100 dark:bg-gray-800">
                    <p class="text-gray-700 dark:text-gray-300">Aucun élément n'est présent dans l'éditeur.</p>
                </div>
            `;
            return;
        }

        previewElements.forEach(element => {
            const dataElement = element.getAttribute('data-element');
            const button = document.createElement('div');
            button.className = 'flex items-center justify-between w-full text-left px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 theme-transition-ready text-gray-700 dark:text-gray-300';
            button.innerHTML = `
                <span class="font-medium">${dataElement}</span>
                <div class="flex items-center gap-3">
                    <button class="preview-element hover:text-light-primary dark:hover:text-dark-primary" title="Prévisualiser">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="copy-element hover:text-light-primary dark:hover:text-dark-primary" title="Copier">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            `;
            
            const previewBtn = button.querySelector('.preview-element');
            const copyBtn = button.querySelector('.copy-element');
            
            previewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showPreview(dataElement);
            });
            
            copyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                copyOriginalElement(dataElement);
                toggleSelectiveModal();
            });
            
            elementsList.appendChild(button);
        });
    }

    function showPreview(elementPath) {
        currentElementPath = elementPath;
        const originalHtml = getElementByPath(elementPath);
        
        if (originalHtml) {
            previewModalContent.innerHTML = originalHtml;
            toggleSelectiveModal();
            togglePreviewModal();
        }
    }

    function getElementByPath(path) {
        const [category, name] = path.split('.');
        if (htmlAssets.assets[category] && htmlAssets.assets[category][name]) {
            return htmlAssets.assets[category][name].html;
        }
        return null;
    }

    function copyOriginalElement(elementPath) {
        const originalHtml = getElementByPath(elementPath);
        
        if (originalHtml) {
            navigator.clipboard.writeText(originalHtml)
                .then(() => {
                    const originalIcon = copySelectiveBtn.innerHTML;
                    copySelectiveBtn.innerHTML = '<i class="fas fa-check text-xl"></i>';
                    setTimeout(() => {
                        copySelectiveBtn.innerHTML = originalIcon;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Erreur lors de la copie :', err);
                    const originalIcon = copySelectiveBtn.innerHTML;
                    copySelectiveBtn.innerHTML = '<i class="fas fa-times text-xl"></i>';
                    setTimeout(() => {
                        copySelectiveBtn.innerHTML = originalIcon;
                    }, 2000);
                });
        }
    }

    copySelectiveBtn.addEventListener('click', toggleSelectiveModal);
    closeSelectiveModal.addEventListener('click', toggleSelectiveModal);
    
    closePreviewModal.addEventListener('click', togglePreviewModal);
    backToSelectiveModal.addEventListener('click', switchToSelectiveModal);
    copyPreviewElement.addEventListener('click', () => {
        if (currentElementPath) {
            copyOriginalElement(currentElementPath);
            togglePreviewModal();
        }
    });
    
    selectiveModal.addEventListener('click', (e) => {
        if (e.target === selectiveModal) {
            toggleSelectiveModal();
        }
    });
    
    previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) {
            togglePreviewModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!selectiveModal.classList.contains('hidden')) {
                toggleSelectiveModal();
            }
            if (!previewModal.classList.contains('hidden')) {
                togglePreviewModal();
            }
        }
    });
} 