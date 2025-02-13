/**
 * @param {HTMLElement} element 
 * @param {HTMLElement} root 
 * @returns {string} 
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
 * @param {string} path 
 * @param {HTMLElement} root 
 * @returns {HTMLElement|null} 
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
 * @param {HTMLElement} element 
 * @returns {Object} 
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
 * @param {HTMLElement} element 
 * @param {Object} structure 
 */
export function validateAndFixStructure(element, structure) {
    if (element.tagName.toLowerCase() !== structure.tagName) {
        console.warn('Structure mismatch detected:', element.tagName, structure.tagName);
        return;
    }

    Object.entries(structure.attributes).forEach(([name, value]) => {
        if (element.getAttribute(name) !== value) {
            element.setAttribute(name, value);
        }
    });

    const elementChildren = Array.from(element.children);
    structure.children.forEach((childStructure, index) => {
        if (elementChildren[index]) {
            validateAndFixStructure(elementChildren[index], childStructure);
        }
    });
} 