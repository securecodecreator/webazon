
/**
 * Sauvegarde l'état actuel de l'éditeur
 */
export function saveCurrentState() {
    const previewContent = document.getElementById('previewContent');
    if (!previewContent) return;

    // Sauvegarder l'état exact du contenu HTML
    const savedState = {
        content: previewContent.innerHTML
    };
    
    try {
        localStorage.setItem('webazonEditorState', JSON.stringify(savedState));
        // Sauvegarder une copie de backup
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

/**
 * Restaure l'état sauvegardé de l'éditeur
 */
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
            
            if (state.content) {
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

// Écouter les événements personnalisés
window.addEventListener('state:save', saveCurrentState); 