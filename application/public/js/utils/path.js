// Fonctions de gestion des chemins d'éléments

/**
 * Génère un chemin unique pour un élément
 * @param {HTMLElement} element - L'élément pour lequel générer le chemin
 * @param {HTMLElement} root - L'élément racine à partir duquel générer le chemin
 * @returns {string} Le chemin unique de l'élément
 */
export function generateElementPath(element, root) {
    const path = [];
    let current = element;
    
    while (current !== root && current.parentElement) {
        const parent = current.parentElement;
        const children = Array.from(parent.children);
        const index = children.indexOf(current);
        const tagName = current.tagName.toLowerCase();
        path.unshift(`${tagName}[${index}]`);
        current = parent;
    }
    
    return path.join(' > ');
}

/**
 * Trouve un élément par son chemin
 * @param {string} path - Le chemin de l'élément à trouver
 * @param {HTMLElement} root - L'élément racine à partir duquel chercher
 * @returns {HTMLElement|null} L'élément trouvé ou null
 */
export function findElementByPath(path, root) {
    const parts = path.split(' > ');
    let current = root;
    
    for (const part of parts) {
        const [tagName, indexStr] = part.match(/([a-z]+)\[(\d+)\]/).slice(1);
        const index = parseInt(indexStr);
        const children = Array.from(current.children).filter(child => 
            child.tagName.toLowerCase() === tagName
        );
        
        if (children[index]) {
            current = children[index];
        } else {
            return null;
        }
    }
    
    return current;
}

/**
 * Sérialise la structure d'un élément
 * @param {HTMLElement} element - L'élément à sérialiser
 * @returns {Object} La structure sérialisée de l'élément
 */
export function serializeStructure(element) {
    return {
        tagName: element.tagName.toLowerCase(),
        children: Array.from(element.children).map(child => serializeStructure(child)),
        attributes: Array.from(element.attributes).reduce((acc, attr) => {
            if (!['contenteditable', 'class'].includes(attr.name)) {
                acc[attr.name] = attr.value;
            }
            return acc;
        }, {})
    };
}

/**
 * Valide et corrige la structure d'un élément
 * @param {HTMLElement} element - L'élément à valider
 * @param {Object} structure - La structure attendue
 */
export function validateAndFixStructure(element, structure) {
    if (element.tagName.toLowerCase() !== structure.tagName) {
        console.warn('Structure mismatch detected:', element.tagName, structure.tagName);
        return;
    }

    // Restaurer les attributs manquants
    Object.entries(structure.attributes).forEach(([name, value]) => {
        if (element.getAttribute(name) !== value) {
            element.setAttribute(name, value);
        }
    });

    // Vérifier récursivement les enfants
    const elementChildren = Array.from(element.children);
    structure.children.forEach((childStructure, index) => {
        if (elementChildren[index]) {
            validateAndFixStructure(elementChildren[index], childStructure);
        }
    });
} 