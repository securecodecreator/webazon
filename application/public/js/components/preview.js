// Fonctions de prévisualisation
import { formatHtml, applySyntaxHighlighting, generateCompleteHtml, cleanHtml } from '../utils/html.js';

/**
 * Met à jour l'affichage du code
 */
export function updateCodePreview() {
    const previewContent = document.getElementById('previewContent');
    const codePreview = document.getElementById('codePreview');
    
    // Récupérer tous les éléments (en excluant les boutons de suppression)
    const elements = previewContent.querySelectorAll(':scope > div.relative');
    let cleanHtmlContent = '';
    
    elements.forEach(element => {
        cleanHtmlContent += cleanHtml(element) + '\n';
    });
    
    // Si aucun élément n'est présent, afficher un commentaire
    if (!cleanHtmlContent.trim()) {
        cleanHtmlContent = '<!-- Le contenu HTML sera injecté ici -->';
    }
    
    // Formater le code pour une meilleure lisibilité
    const formattedHtml = formatHtml(cleanHtmlContent);
    
    // Mettre à jour l'affichage du code avec coloration syntaxique
    codePreview.innerHTML = applySyntaxHighlighting(formattedHtml);
}

/**
 * Copie le code complet
 */
export function copyCompleteCode() {
    const previewContent = document.getElementById('previewContent');
    const elements = previewContent.querySelectorAll(':scope > div.relative');
    let contentHtml = '';
    
    elements.forEach(element => {
        contentHtml += cleanHtml(element) + '\n';
    });

    const completeHtml = generateCompleteHtml(contentHtml);

    navigator.clipboard.writeText(completeHtml).then(() => {
        const copyBtn = document.getElementById('copyCodeBtn');
        copyBtn.innerHTML = '<i class="fas fa-check text-green-500"></i>';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
    });
}

// Écouter les événements personnalisés
window.addEventListener('preview:update', updateCodePreview); 