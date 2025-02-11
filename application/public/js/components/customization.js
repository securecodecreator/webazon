import htmlAssets from '../assets.js';
import { addElementToPreview } from './editor.js';
import { getElementByPath } from '../main.js';

// Structure des catégories avec leurs icônes
const categories = {
    headers: {
        name: 'En-têtes',
        icon: 'fa-heading'
    },
    about: {
        name: 'À propos',
        icon: 'fa-info-circle'
    },
    sections: {
        name: 'Sections',
        icon: 'fa-layer-group'
    },
    forms: {
        name: 'Formulaires',
        icon: 'fa-wpforms'
    },
    faq: {
        name: 'FAQ',
        icon: 'fa-question-circle'
    },
    social: {
        name: 'Composants Sociaux',
        icon: 'fa-share-alt'
    },
    footers: {
        name: 'Pieds de page',
        icon: 'fa-shoe-prints'
    }
};

/**
 * Crée un élément d'accordéon pour une catégorie
 * @param {string} categoryKey - Clé de la catégorie
 * @param {Object} categoryInfo - Informations sur la catégorie
 * @returns {HTMLElement} L'élément d'accordéon
 */
function createAccordionItem(categoryKey, categoryInfo) {
    const accordionItem = document.createElement('div');
    accordionItem.className = 'theme-transition-ready bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden';
    
    // En-tête de l'accordéon
    const header = document.createElement('button');
    header.className = 'w-full flex items-center justify-between p-4 cursor-pointer theme-transition-ready text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700';
    header.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas ${categoryInfo.icon} text-light-primary dark:text-dark-primary"></i>
            <span class="font-semibold">${categoryInfo.name}</span>
        </div>
        <i class="fas fa-chevron-down transform transition-transform duration-300"></i>
    `;
    
    // Contenu de l'accordéon
    const content = document.createElement('div');
    content.className = 'hidden p-4 space-y-2';
    
    // Ajouter les boutons pour chaque élément de la catégorie
    const categoryAssets = htmlAssets.assets[categoryKey];
    for (const [key, asset] of Object.entries(categoryAssets)) {
        const button = document.createElement('button');
        const elementPath = `${categoryKey}.${key}`;
        button.setAttribute('data-element', elementPath);
        button.className = 'w-full text-left px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 theme-transition-ready text-gray-700 dark:text-gray-300';
        button.textContent = asset.name;
        
        button.addEventListener('click', () => {
            const element = getElementByPath(elementPath);
            if (element) {
                addElementToPreview(element);
            }
        });
        
        content.appendChild(button);
    }
    
    // Gestion du clic sur l'en-tête
    header.addEventListener('click', () => {
        const arrow = header.querySelector('.fa-chevron-down');
        const isOpen = content.classList.contains('!block');
        
        // Fermer tous les autres panneaux
        const allContents = document.querySelectorAll('#customizationAccordion .hidden');
        const allArrows = document.querySelectorAll('#customizationAccordion .fa-chevron-down');
        
        allContents.forEach(c => c.classList.remove('!block'));
        allArrows.forEach(a => a.classList.remove('rotate-180'));
        
        // Basculer le panneau actuel
        if (!isOpen) {
            content.classList.add('!block');
            arrow.classList.add('rotate-180');
        }
    });
    
    accordionItem.appendChild(header);
    accordionItem.appendChild(content);
    
    return accordionItem;
}

/**
 * Initialise l'accordéon de personnalisation
 */
export function initCustomizationAccordion() {
    const container = document.getElementById('customizationAccordion');
    if (!container) return;
    
    // Vider le conteneur
    container.innerHTML = '';
    
    // Créer et ajouter chaque élément d'accordéon
    for (const [key, info] of Object.entries(categories)) {
        const accordionItem = createAccordionItem(key, info);
        container.appendChild(accordionItem);
    }
} 