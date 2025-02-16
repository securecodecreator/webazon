import { createElementContainer, makeElementEditable, attachElementEvents } from '../utils/dom.js';

// Configuration
const NOTIFICATION_DURATION = 2000;
let lastSaveTime = 0;

/**
 * Compresse une chaîne de caractères
 * @param {string} str - La chaîne à compresser
 * @returns {string} La chaîne compressée en base64
 */
function compressString(str) {
    try {
        const compressed = new TextEncoder().encode(str);
        return btoa(String.fromCharCode.apply(null, compressed));
    } catch (error) {
        console.error('Erreur lors de la compression:', error);
        return str;
    }
}

/**
 * Décompresse une chaîne de caractères
 * @param {string} compressed - La chaîne compressée en base64
 * @returns {string} La chaîne décompressée
 */
function decompressString(compressed) {
    try {
        const binary = atob(compressed);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return new TextDecoder().decode(bytes);
    } catch (error) {
        console.error('Erreur lors de la décompression:', error);
        return compressed;
    }
}

/**
 * Sauvegarde l'état actuel de l'éditeur
 */
export function saveCurrentState() {
    const now = Date.now();
    if (now - lastSaveTime < 300) return; // Anti-rebond minimal
    lastSaveTime = now;

    const previewContent = document.getElementById('previewContent');
    if (!previewContent) return;

    const elements = previewContent.querySelectorAll(':scope > div.relative');
    const savedState = {
        version: 1,
        timestamp: now,
        elementsOrder: Array.from(elements).map(element => {
            const mainContent = element.querySelector(':scope > :not(.absolute)');
            const elementId = element.dataset.elementId || Math.random().toString(36).substr(2, 9);
            element.dataset.elementId = elementId;
            return {
                id: elementId,
                html: mainContent ? mainContent.outerHTML : '',
                position: Array.from(elements).indexOf(element)
            };
        }).filter(el => el.html)
    };
    
    try {
        const compressedState = compressString(JSON.stringify(savedState));
        
        // Vérifier si l'état est différent de l'état précédent
        const previousState = localStorage.getItem('webazonEditorState');
        if (previousState === compressedState) {
            return; // Éviter les sauvegardes inutiles
        }
        
        // Sauvegarder l'état
        localStorage.setItem('webazonEditorState', compressedState);
        sessionStorage.setItem('webazonEditorStateBackup', compressedState);
        
        // Sauvegarder uniquement la dernière version
        const versions = [{
            timestamp: now,
            state: compressedState
        }];
        localStorage.setItem('webazonEditorVersions', JSON.stringify(versions));
        
        // Notification discrète
        showSaveNotification('success', 'Sauvegardé', true);
    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        showSaveNotification('error', 'Échec de la sauvegarde', true);
    }
}

/**
 * Affiche une notification de sauvegarde
 * @param {string} type - Le type de notification ('success' ou 'error')
 * @param {string} message - Le message à afficher
 * @param {boolean} [isQuiet=false] - Si true, la notification sera plus discrète
 */
function showSaveNotification(type, message, isQuiet = false) {
    const existingNotification = document.querySelector('.save-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `save-notification fixed bottom-4 right-4 py-1 px-3 text-xs rounded-lg z-[1000] transition-opacity duration-300 ${
        type === 'success' 
            ? 'bg-green-500/40 text-white' 
            : 'bg-red-500/40 text-white'
    }`;
    notification.textContent = message;
    notification.style.opacity = isQuiet ? '0.5' : '1';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, isQuiet ? 1000 : NOTIFICATION_DURATION);
}

/**
 * Restaure l'état précédemment sauvegardé
 * @param {number} [versionIndex=0] - L'index de la version à restaurer
 * @param {boolean} [isReset=false] - Indique si c'est une réinitialisation
 * @returns {Promise<void>}
 */
export function restoreState(versionIndex = 0, isReset = false) {
    return new Promise((resolve) => {
        if (isReset) {
            localStorage.removeItem('webazonEditorVersions');
            localStorage.removeItem('webazonEditorState');
            sessionStorage.removeItem('webazonEditorStateBackup');
            sessionStorage.removeItem('webazonEditorState');

            const previewContent = document.getElementById('previewContent');
            if (previewContent) {
                previewContent.innerHTML = '<!-- Le contenu HTML sera injecté ici -->';
                showSaveNotification('success', 'Éditeur réinitialisé');
            }
            resolve();
            return;
        }

        let savedState;
        try {
            const versions = JSON.parse(localStorage.getItem('webazonEditorVersions') || '[]');
            savedState = versions.length > versionIndex ? versions[versionIndex].state : 
                        localStorage.getItem('webazonEditorState') ||
                        sessionStorage.getItem('webazonEditorStateBackup') ||
                        sessionStorage.getItem('webazonEditorState');

            if (!savedState) {
                resolve();
                return;
            }

            const previewContent = document.getElementById('previewContent');
            if (!previewContent) {
                resolve();
                return;
            }

            const decompressed = decompressString(savedState);
            const state = JSON.parse(decompressed);
            
            if (state.elementsOrder && Array.isArray(state.elementsOrder)) {
                const currentElements = new Map();
                previewContent.querySelectorAll(':scope > div.relative').forEach(el => {
                    if (el.dataset.elementId) {
                        currentElements.set(el.dataset.elementId, el);
                    }
                });

                previewContent.innerHTML = '';
                const sortedElements = [...state.elementsOrder].sort((a, b) => a.position - b.position);
                
                sortedElements.forEach(elementData => {
                    if (!elementData.html) return;
                    
                    let elementContainer;
                    if (currentElements.has(elementData.id)) {
                        elementContainer = currentElements.get(elementData.id);
                    } else {
                        const tempContainer = document.createElement('div');
                        tempContainer.innerHTML = elementData.html;
                        const element = tempContainer.firstElementChild;
                        if (!element) return;
                        
                        elementContainer = createElementContainer(element);
                        elementContainer.dataset.elementId = elementData.id;
                        makeElementEditable(elementContainer);
                        attachElementEvents(elementContainer);
                    }
                    
                    previewContent.appendChild(elementContainer);
                });

                requestAnimationFrame(() => {
                    window.dispatchEvent(new CustomEvent('preview:update'));
                    showSaveNotification('success', 'État restauré avec succès');
                    // Attendre que tous les événements soient traités
                    setTimeout(resolve, 100);
                });
            } else {
                resolve();
            }
        } catch (error) {
            console.error('Erreur lors de la restauration:', error);
            showSaveNotification('error', 'Erreur lors de la restauration');
            resolve();
        }
    });
}

// Supprimer l'auto-save
export function initAutoSave() {
    // Sauvegarder uniquement avant de quitter la page
    window.addEventListener('beforeunload', saveCurrentState);
}

// Initialiser la sauvegarde automatique au chargement
document.addEventListener('DOMContentLoaded', initAutoSave);

// Écouter les événements de sauvegarde
window.addEventListener('state:save', saveCurrentState); 
