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
            span.className = 'editable-text focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 px-1 rounded';
            
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
        <button class="move-up bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white p-2 rounded-lg transition-colors w-8 h-8 md:w-6 md:h-6 flex items-center justify-center touch-manipulation">
            <i class="fas fa-chevron-up text-xs md:text-[10px]"></i>
        </button>
        <button class="move-down bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white p-2 rounded-lg transition-colors w-8 h-8 md:w-6 md:h-6 flex items-center justify-center touch-manipulation">
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
    
    // Ajouter une marge au contenu principal pour éviter le chevauchement avec les boutons
    element.style.marginTop = '2.5rem';
    
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
            
            const sibling = direction === 'up' 
                ? elementContainer.previousElementSibling 
                : elementContainer.nextElementSibling;
                
            if (sibling) {
                // Sauvegarder les positions initiales
                const elementRect = elementContainer.getBoundingClientRect();
                const siblingRect = sibling.getBoundingClientRect();
                
                // Créer une animation de transition
                elementContainer.style.transition = 'transform 0.2s ease-in-out';
                sibling.style.transition = 'transform 0.2s ease-in-out';
                
                // Calculer le déplacement
                const distance = direction === 'up' 
                    ? -(elementRect.height + 8) // 8px pour la marge
                    : (siblingRect.height + 8);
                
                // Appliquer l'animation
                elementContainer.style.transform = `translateY(${distance}px)`;
                sibling.style.transform = `translateY(${-distance}px)`;
                
                // Attendre la fin de l'animation avant de modifier le DOM
                setTimeout(() => {
                    // Réinitialiser les styles de transition
                    elementContainer.style.transition = '';
                    sibling.style.transition = '';
                    elementContainer.style.transform = '';
                    sibling.style.transform = '';
                    
                    // Échanger les éléments dans le DOM
                    const parent = elementContainer.parentNode;
                    const placeholder = document.createElement('div');
                    
                    parent.insertBefore(placeholder, elementContainer);
                    parent.insertBefore(elementContainer, sibling);
                    parent.insertBefore(sibling, placeholder);
                    placeholder.remove();
                    
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