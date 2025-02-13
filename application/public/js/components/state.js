import { createElementContainer, makeElementEditable, attachElementEvents } from '../utils/dom.js';


export function saveCurrentState() {
    const previewContent = document.getElementById('previewContent');
    if (!previewContent) return;

    const elements = previewContent.querySelectorAll(':scope > div.relative');
    const savedState = {
        content: previewContent.innerHTML,
        elementsOrder: Array.from(elements).map(element => {
            const mainContent = element.querySelector(':scope > :not(.absolute)');
            return {
                id: element.dataset.elementId || Math.random().toString(36).substr(2, 9),
                html: mainContent ? mainContent.outerHTML : ''
            };
        })
    };
    
    try {
        localStorage.setItem('webazonEditorState', JSON.stringify(savedState));
        sessionStorage.setItem('webazonEditorStateBackup', JSON.stringify(savedState));
    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        try {
            sessionStorage.setItem('webazonEditorState', JSON.stringify(savedState));
        } catch (e) {
            console.error('Erreur de sauvegarde complète:', e);
        }
    }
}


export function restoreState() {
    let savedState;
    
    try {
        savedState = localStorage.getItem('webazonEditorState');
        if (!savedState) {
            savedState = sessionStorage.getItem('webazonEditorStateBackup');
        }
        if (!savedState) {
            savedState = sessionStorage.getItem('webazonEditorState');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'état:', error);
        return;
    }

    if (savedState) {
        try {
            const previewContent = document.getElementById('previewContent');
            const codePreview = document.getElementById('codePreview');
            
            if (!previewContent || !codePreview) {
                console.error('Éléments nécessaires non trouvés');
                return;
            }

            const state = JSON.parse(savedState);
            
            if (state.elementsOrder && Array.isArray(state.elementsOrder)) {
                previewContent.innerHTML = '';
                state.elementsOrder.forEach(elementData => {
                    const tempContainer = document.createElement('div');
                    tempContainer.innerHTML = elementData.html;
                    const element = tempContainer.firstElementChild;
                    
                    if (element) {
                        const elementContainer = createElementContainer(element);
                        elementContainer.dataset.elementId = elementData.id;
                        
                        makeElementEditable(elementContainer);
                        
                        attachElementEvents(elementContainer);
                        
                        previewContent.appendChild(elementContainer);
                    }
                });
                
                window.dispatchEvent(new CustomEvent('preview:update'));
            } else if (state.content) {
                previewContent.innerHTML = state.content;
                window.dispatchEvent(new CustomEvent('preview:update'));
            } else {
                previewContent.innerHTML = '<!-- Le contenu HTML sera injecté ici -->';
                codePreview.innerHTML = '<!-- Le contenu HTML sera injecté ici -->';
            }
        } catch (error) {
            console.error('Erreur critique lors de la restauration:', error);
            document.getElementById('previewContent').innerHTML = '<!-- Le contenu HTML sera injecté ici -->';
            document.getElementById('codePreview').innerHTML = '<!-- Le contenu HTML sera injecté ici -->';
        }
    }
}

window.addEventListener('state:save', saveCurrentState); 