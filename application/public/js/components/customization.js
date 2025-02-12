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
    pricing: {
        name: 'Prix',
        icon: 'fa-money-bill'
    },
    product: {
        name: 'Produits',
        icon: 'fa-shopping-cart'
    },
    gallery: {
        name: 'Galleries',
        icon: 'fa-images'
    },
    cta: {
        name: 'CTA',
        icon: 'fa-bullhorn'
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
    const item = document.createElement('div');
    item.className = 'theme-transition-ready bg-white dark:bg-gray-900 rounded-lg overflow-hidden';
    
    // En-tête de l'accordéon
    const header = document.createElement('button');
    header.className = 'w-full flex items-center justify-between p-4 text-left theme-transition-ready text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800';
    header.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas ${categoryInfo.icon} text-xl"></i>
            <span class="font-medium">${categoryInfo.name}</span>
        </div>
        <i class="fas fa-chevron-down transform transition-transform duration-200"></i>
    `;
    
    item.appendChild(header);
    
    // Contenu de l'accordéon
    const content = document.createElement('div');
    content.className = 'hidden p-4 space-y-2';
    
    // Ajouter les boutons pour chaque élément de la catégorie
    const categoryAssets = htmlAssets.assets[categoryKey];
    for (const [key, asset] of Object.entries(categoryAssets)) {
        const elementContainer = document.createElement('div');
        elementContainer.className = 'flex items-center justify-between w-full text-left px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 theme-transition-ready text-gray-700 dark:text-gray-300';
        
        const elementPath = `${categoryKey}.${key}`;
        elementContainer.setAttribute('data-element', elementPath);
        
        // Texte de l'élément
        const textSpan = document.createElement('span');
        textSpan.className = 'font-medium';
        textSpan.textContent = asset.name;
        elementContainer.appendChild(textSpan);
        
        // Conteneur des boutons
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'flex items-center gap-3';
        
        // Bouton de prévisualisation
        const previewBtn = document.createElement('button');
        previewBtn.className = 'preview-element hover:text-light-primary dark:hover:text-dark-primary';
        previewBtn.title = 'Prévisualiser cet élément';
        previewBtn.innerHTML = '<i class="fas fa-eye"></i>';
        previewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const element = getElementByPath(elementPath);
            if (element) {
                const previewModal = document.getElementById('previewModal');
                const previewModalContent = document.getElementById('previewModalContent');
                previewModalContent.innerHTML = element.html;
                previewModal.classList.remove('hidden');
            }
        });
        
        // Bouton de copie
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-element hover:text-light-primary dark:hover:text-dark-primary';
        copyBtn.title = 'Copier cet élément';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const element = getElementByPath(elementPath);
            if (element) {
                navigator.clipboard.writeText(element.html).then(() => {
                    const originalIcon = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyBtn.innerHTML = originalIcon;
                    }, 2000);
                });
            }
        });
        
        // Bouton d'ajout à l'éditeur
        const addBtn = document.createElement('button');
        addBtn.className = 'add-element hover:text-light-primary dark:hover:text-dark-primary';
        addBtn.title = 'Ajouter cet élément à l\'éditeur';
        addBtn.innerHTML = '<i class="fas fa-plus"></i>';
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const element = getElementByPath(elementPath);
            if (element) {
                addElementToPreview(element);
            }
        });
        
        buttonsContainer.appendChild(previewBtn);
        buttonsContainer.appendChild(copyBtn);
        buttonsContainer.appendChild(addBtn);
        elementContainer.appendChild(buttonsContainer);
        content.appendChild(elementContainer);
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
    
    item.appendChild(content);
    return item;
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