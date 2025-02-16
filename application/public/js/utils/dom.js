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
        {
            acceptNode: function(node) {
                // Ignorer les nœuds vides ou les nœuds déjà dans un span éditable
                if (node.parentElement.classList.contains('editable-text') ||
                    node.parentElement.tagName === 'SCRIPT' || 
                    node.parentElement.tagName === 'STYLE' ||
                    !node.textContent.trim()) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        },
        false
    );

    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }

    textNodes.forEach(textNode => {
        // Vérifier si le nœud n'est pas déjà dans un span éditable
        if (textNode.parentElement && !textNode.parentElement.classList.contains('editable-text')) {
            const span = document.createElement('span');
            span.contentEditable = true;
            span.textContent = textNode.textContent;
            span.className = 'editable-text focus:outline-none focus:caret-blue-500 caret-blue-500 px-1 rounded';
            
            // Utiliser un debounce pour les événements d'input
            let inputTimeout;
            span.addEventListener('input', () => {
                clearTimeout(inputTimeout);
                inputTimeout = setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('preview:update'));
                    window.dispatchEvent(new CustomEvent('state:save'));
                }, 300);
            });

            span.addEventListener('blur', () => {
                if (span.textContent.trim() === '') {
                    span.textContent = 'Texte';
                }
                window.dispatchEvent(new CustomEvent('preview:update'));
                window.dispatchEvent(new CustomEvent('state:save'));
            });

            // Empêcher la propagation des événements de souris pour éviter les conflits
            span.addEventListener('mousedown', (e) => e.stopPropagation());
            span.addEventListener('click', (e) => e.stopPropagation());
            
            textNode.parentNode.replaceChild(span, textNode);
        }
    });
}

/**
 * Crée un conteneur d'élément avec les contrôles
 * @param {HTMLElement} element - L'élément à conteneuriser
 * @returns {HTMLElement} Le conteneur avec l'élément et ses contrôles
 */
export function createElementContainer(element) {
    const container = document.createElement('div');
    container.className = 'relative group';
    
    // Boutons de déplacement
    const moveButtons = document.createElement('div');
    moveButtons.className = 'absolute left-1 top-1 opacity-0 md:opacity-0 group-hover:opacity-100 flex flex-col gap-0.5 z-[200]';
    moveButtons.innerHTML = `
        <button class="move-up bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white p-1.5 rounded-lg transition-colors w-7 h-7 md:w-5 md:h-5 flex items-center justify-center touch-manipulation">
            <i class="fas fa-chevron-up text-[10px] md:text-[8px]"></i>
        </button>
        <button class="move-down bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white p-1.5 rounded-lg transition-colors w-7 h-7 md:w-5 md:h-5 flex items-center justify-center touch-manipulation">
            <i class="fas fa-chevron-down text-[10px] md:text-[8px]"></i>
        </button>
    `;
    
    // Bouton de suppression
    const deleteButton = document.createElement('div');
    deleteButton.className = 'absolute right-1 top-1 opacity-100 md:opacity-0 group-hover:opacity-100 z-[100]';
    deleteButton.innerHTML = `
        <button class="delete-element bg-red-500 text-white p-1.5 rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors w-7 h-7 md:w-5 md:h-5 flex items-center justify-center touch-manipulation">
            <i class="fas fa-trash text-[10px] md:text-[8px]"></i>
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

        const moveElement = (direction) => (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const currentElement = elementContainer;
            
            // Trouver l'élément cible en fonction de la direction
            let targetElement = direction === 'up' 
                ? currentElement.previousElementSibling
                : currentElement.nextElementSibling;
            
            if (targetElement) {
                // Ajouter une animation de transition
                currentElement.style.transition = 'transform 0.2s ease-out';
                targetElement.style.transition = 'transform 0.2s ease-out';
                
                // Calculer la hauteur pour l'animation
                const currentHeight = currentElement.offsetHeight;
                const targetHeight = targetElement.offsetHeight;
                
                // Appliquer l'animation
                if (direction === 'up') {
                    currentElement.style.transform = `translateY(-${targetHeight}px)`;
                    targetElement.style.transform = `translateY(${currentHeight}px)`;
                } else {
                    currentElement.style.transform = `translateY(${targetHeight}px)`;
                    targetElement.style.transform = `translateY(-${currentHeight}px)`;
                }
                
                // Effectuer le déplacement réel après l'animation
                setTimeout(() => {
                    if (direction === 'up') {
                        previewContent.insertBefore(currentElement, targetElement);
                    } else {
                        previewContent.insertBefore(currentElement, targetElement.nextSibling);
                    }
                    
                    // Réinitialiser les styles
                    currentElement.style.transform = '';
                    targetElement.style.transform = '';
                    currentElement.style.transition = '';
                    targetElement.style.transition = '';
                    
                    // Mettre à jour l'état
                    window.dispatchEvent(new CustomEvent('preview:update'));
                    window.dispatchEvent(new CustomEvent('state:save'));
                }, 200);
            }
        };

        const moveUp = moveElement('up');
        const moveDown = moveElement('down');

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
            
            // Ajouter une animation de suppression
            elementContainer.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
            elementContainer.style.opacity = '0';
            elementContainer.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                elementContainer.remove();
                window.dispatchEvent(new CustomEvent('preview:update'));
                window.dispatchEvent(new CustomEvent('state:save'));
            }, 200);
        };
        
        deleteButton.addEventListener('click', handleDelete);
        deleteButton.addEventListener('touchstart', handleDelete, { passive: false });
    }
} 