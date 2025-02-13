import { formatHtml, applySyntaxHighlighting, generateCompleteHtml, cleanHtml } from '../utils/html.js';


export function updateCodePreview() {
    const previewContent = document.getElementById('previewContent');
    const codePreview = document.getElementById('codePreview');
    
    const elements = previewContent.querySelectorAll(':scope > div.relative');
    let cleanHtmlContent = '';
    
    elements.forEach(element => {
        cleanHtmlContent += cleanHtml(element) + '\n';
    });
    
    if (!cleanHtmlContent.trim()) {
        cleanHtmlContent = '<!-- Le contenu HTML sera injecté ici -->';
    }
    
    const formattedHtml = formatHtml(cleanHtmlContent);
    
    codePreview.innerHTML = applySyntaxHighlighting(formattedHtml);
}


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

window.addEventListener('preview:update', updateCodePreview); 