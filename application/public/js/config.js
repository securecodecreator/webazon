const tailwindConfig = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                light: {
                    primary: '#1a56db',    
                    secondary: '#6d28d9',  
                    bg: '#ffffff',        
                    nav: '#f1f5f9'         
                },
                dark: {
                    primary: '#60a5fa',    
                    secondary: '#a78bfa',  
                    bg: '#0f172a',         
                    nav: '#1e293b'         
                }
            }
        }
    }
};

const APP_VERSION = 'V1.0.7';

if (typeof module !== 'undefined' && module.exports) {
    module.exports = tailwindConfig;
} 