// Fonctions utilitaires pour la manipulation du DOM

/**
 * Rend un élément éditable en ajoutant des spans éditables pour le texte
 * @param {HTMLElement} element - L'élément à rendre éditable
 */
export function makeElementEditable(element) {
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
            window.dispatchEvent(new CustomEvent('preview:update'));
        });
        span.addEventListener('blur', () => {
            if (span.textContent.trim() === '') {
                span.textContent = 'Texte';
            }
        });
        textNode.parentNode.replaceChild(span, textNode);
    });
}

/**
 * Crée un conteneur d'élément avec les contrôles
 * @param {HTMLElement} element - L'élément à conteneuriser
 * @returns {HTMLElement} Le conteneur avec l'élément et ses contrôles
 */
export function createElementContainer(element) {
    const container = document.createElement('div');
    container.className = 'relative group mb-4';
    
    // Boutons de déplacement
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
    
    // Bouton de suppression
    const deleteButton = document.createElement('div');
    deleteButton.className = 'absolute right-1 top-1 opacity-100 md:opacity-0 group-hover:opacity-100 z-[100]';
    deleteButton.innerHTML = `
        <button class="delete-element bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors w-8 h-8 md:w-6 md:h-6 flex items-center justify-center touch-manipulation">
            <i class="fas fa-trash text-sm md:text-xs"></i>
        </button>
    `;
    
    container.appendChild(moveButtons);
    container.appendChild(deleteButton);
    container.appendChild(element);
    
    return container;
}

/**
 * @param {HTMLElement} elementContainer 
 */
export function attachElementEvents(elementContainer) {
    const moveButtons = elementContainer.querySelector('.absolute');
    const deleteButton = elementContainer.querySelector('.delete-element');
    const previewContent = document.getElementById('previewContent');
    
    if (!moveButtons || !deleteButton || !previewContent) {
        console.error('Éléments de contrôle manquants');
        return;
    }

    const moveUpBtn = moveButtons.querySelector('.move-up');
    const moveDownBtn = moveButtons.querySelector('.move-down');
    
    if (moveUpBtn && moveDownBtn) {
        moveButtons.style.pointerEvents = 'none';
        moveUpBtn.style.pointerEvents = 'auto';
        moveDownBtn.style.pointerEvents = 'auto';
        
        moveButtons.classList.add('z-[200]');

        const moveUp = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const previousSibling = elementContainer.previousElementSibling;
            if (previousSibling) {
                previewContent.insertBefore(elementContainer, previousSibling);
                window.dispatchEvent(new CustomEvent('preview:update'));
                window.dispatchEvent(new CustomEvent('state:save'));
            }
        };

        const moveDown = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const nextSibling = elementContainer.nextElementSibling;
            if (nextSibling) {
                previewContent.insertBefore(elementContainer, nextSibling.nextElementSibling);
                window.dispatchEvent(new CustomEvent('preview:update'));
                window.dispatchEvent(new CustomEvent('state:save'));
            }
        };

        moveUpBtn.addEventListener('click', moveUp);
        moveUpBtn.addEventListener('touchstart', moveUp, { passive: false });
        
        moveDownBtn.addEventListener('click', moveDown);
        moveDownBtn.addEventListener('touchstart', moveDown, { passive: false });
    }

    if (deleteButton) {
        deleteButton.parentElement.classList.add('z-[200]');
        
        const handleDelete = (e) => {
            e.preventDefault();
            e.stopPropagation();
            elementContainer.remove();
            window.dispatchEvent(new CustomEvent('preview:update'));
            window.dispatchEvent(new CustomEvent('state:save'));
        };
        
        deleteButton.addEventListener('click', handleDelete);
        deleteButton.addEventListener('touchstart', handleDelete, { passive: false });
    }
} 