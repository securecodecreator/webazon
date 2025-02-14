import { createElementContainer, makeElementEditable, attachElementEvents } from '../utils/dom.js';

// Configuration
const AUTO_SAVE_INTERVAL = 30000; // 30 secondes
const MAX_VERSIONS = 5;
const NOTIFICATION_DURATION = 2000;
let lastSaveTime = 0;
let autoSaveInterval = null;

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
 * Affiche une notification de sauvegarde
 * @param {string} type - Le type de notification ('success' ou 'error')
 * @param {string} message - Le message à afficher
 */
function showSaveNotification(type, message) {
    const existingNotification = document.querySelector('.save-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `save-notification fixed top-0 left-1/2 transform -translate-x-1/2 py-1 px-3 text-xs rounded-b-lg z-[1000] ${
        type === 'success' 
            ? 'bg-green-500/80 text-white' 
            : 'bg-red-500/80 text-white'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animation d'entrée
    notification.style.transform = 'translate(-50%, -100%)';
    setTimeout(() => {
        notification.style.transform = 'translate(-50%, 0)';
    }, 10);

    // Animation de sortie
    setTimeout(() => {
        notification.style.transform = 'translate(-50%, -100%)';
        setTimeout(() => notification.remove(), 300);
    }, NOTIFICATION_DURATION);
}

/**
 * Sauvegarde l'état actuel de l'éditeur
 */
export function saveCurrentState() {
    const now = Date.now();
    if (now - lastSaveTime < 1000) return; // Éviter les sauvegardes trop fréquentes
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
        const versions = JSON.parse(localStorage.getItem('webazonEditorVersions') || '[]');
        versions.unshift({
            timestamp: now,
            state: compressedState
        });
        
        while (versions.length > MAX_VERSIONS) {
            versions.pop();
        }
        
        localStorage.setItem('webazonEditorVersions', JSON.stringify(versions));
        localStorage.setItem('webazonEditorState', compressedState);
        sessionStorage.setItem('webazonEditorStateBackup', compressedState);
        
        showSaveNotification('success', 'Modifications sauvegardées');
    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        showSaveNotification('error', 'Échec de la sauvegarde');
    }
}

/**
 * Restaure l'état précédemment sauvegardé
 * @param {number} [versionIndex=0] - L'index de la version à restaurer
 * @param {boolean} [isReset=false] - Indique si c'est une réinitialisation
 */
export function restoreState(versionIndex = 0, isReset = false) {
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
        return;
    }

    let savedState;
    try {
        const versions = JSON.parse(localStorage.getItem('webazonEditorVersions') || '[]');
        savedState = versions.length > versionIndex ? versions[versionIndex].state : 
                    localStorage.getItem('webazonEditorState') ||
                    sessionStorage.getItem('webazonEditorStateBackup') ||
                    sessionStorage.getItem('webazonEditorState');

        if (!savedState) return;

        const previewContent = document.getElementById('previewContent');
        if (!previewContent) return;

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
            });
        }
    } catch (error) {
        console.error('Erreur lors de la restauration:', error);
        showSaveNotification('error', 'Erreur lors de la restauration');
    }
}

/**
 * Initialise la sauvegarde automatique
 */
export function initAutoSave() {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
    }
    
    autoSaveInterval = setInterval(() => {
        saveCurrentState();
    }, AUTO_SAVE_INTERVAL);
    
    // Sauvegarder avant de quitter la page
    window.addEventListener('beforeunload', saveCurrentState);
}

// Initialiser la sauvegarde automatique au chargement
document.addEventListener('DOMContentLoaded', initAutoSave);

// Écouter les événements de sauvegarde
window.addEventListener('state:save', saveCurrentState); 
