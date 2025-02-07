# 🎨 Webazon - Concepteur de Sites Web Frontend

[![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)](https://github.com/securecodecreator/webazon)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/securecodecreator/webazon/blob/main/LICENSE)

## 📋 Vue d'ensemble

Webazon est une application web moderne et intuitive conçue pour simplifier la création de maquettes de sites web. Elle combine la puissance de HTML5 avec l'élégance de Tailwind CSS pour offrir une expérience de conception visuelle exceptionnelle.

![Aperçu de Webazon](application/public/images/preview.png)

## ✨ Caractéristiques Principales

### 🎯 Interface Utilisateur
- **Design Moderne**: Interface épurée et intuitive
- **Responsive Design**: Adaptation parfaite à tous les écrans
- **Thèmes Personnalisables**: Modes clair et sombre intégrés
- **Prévisualisation en Direct**: Rendu en temps réel des modifications
- **Composants Drag & Drop**: Bibliothèque riche de composants réutilisables

### 🛠️ Fonctionnalités Techniques
- **Architecture Modulaire**: Structure de code organisée et maintenable
- **Performance Optimisée**: Chargement rapide et exécution fluide
- **Gestion d'État**: Système robuste de gestion des données
- **Exportation de Projets**: Sauvegarde et partage facilités
- **Validation HTML**: Vérification automatique du code généré

## 🗂️ Structure du Projet

```
Webazon/
├── LICENSE                                    # Licence MIT (1.0 KB, 23 lignes)
├── README.md                                  # Documentation principale (4.8 KB,122 lignes)
├── index.html                                 # Page d'accueil (26 KB, 365 lignes)
└── application/                               # Cœur de l'application
    ├── public/                               # Ressources publiques
    │   ├── app.html                          # Application principale (34 KB, 478 lignes)
    │   ├── css/
    │   │   └── style.css                     # Styles globaux (2.2 KB, 156 lignes)
    │   ├── images/                           # Ressources graphiques
    │   │   ├── clair.png                     # Aperçu thème clair (316 KB)
    │   │   ├── preview.png                   # Image de présentation (397 KB)
    │   │   ├── release.png                   # Image de version (287 KB)
    │   │   └── sombre.png                    # Aperçu thème sombre (317 KB)
    │   └── js/                               # Scripts JavaScript
    │       ├── components/                    # Composants de l'application
    │       │   ├── editor.js                 # Éditeur de code (7.8 KB, 245 lignes)
    │       │   ├── preview.js                # Prévisualisation (1.9 KB, 89 lignes)
    │       │   └── state.js                  # Gestion d'état (9.3 KB, 312 lignes)
    │       ├── utils/                        # Utilitaires
    │       │   ├── dom.js                    # Manipulation DOM (6.3 KB, 198 lignes)
    │       │   ├── html.js                   # Gestion HTML (4.9 KB, 167 lignes)
    │       │   └── path.js                   # Gestion chemins (3.1 KB, 112 lignes)
    │       ├── assets.js                     # Ressources JS (129 KB, 3456 lignes)
    │       ├── config.js                     # Configuration (735 B, 28 lignes)
    │       ├── main.js                       # Point d'entrée JS (1.5 KB, 67 lignes)
    │       └── theme.js                      # Gestion thèmes (4.1 KB, 145 lignes)
```

## 🚀 Installation

1. Clonez le repository :
```bash
git clone https://github.com/securecodecreator/webazon.git
```

2. Ouvrez le fichier `index.html` dans votre navigateur préféré
3. Commencez à créer !

## 💻 Technologies Utilisées

- **Frontend**:
  - HTML5
  - JavaScript ES6+
  - CSS3 / Tailwind CSS
  - Architecture MVC

## 🔧 Configuration

### Configuration Système
- Navigateur moderne (Chrome, Firefox, Safari, Edge)
- JavaScript activé
- Connexion Internet pour les CDN

### Personnalisation
Le fichier `config.js` permet de modifier :
```javascript
{
  theme: 'light' | 'dark',
  language: 'fr' | 'en',
  autosave: boolean,
  previewDelay: number
}
```

## 🎨 Thèmes et Styles

Webazon propose deux thèmes principaux :
- **Mode Clair**: Design épuré et professionnel
- **Mode Sombre**: Confort visuel optimal

## 🔍 Prévisualisation

Le système de prévisualisation offre :
- Rendu en temps réel
- Validation HTML5
- Responsive design testing
- Export de code propre

## 📱 Compatibilité

- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Android Chrome
- **Tablette**: iPad, Android

## 🌟 Remerciements

Un grand merci à tous les contributeurs qui ont participé à faire de Webazon un outil de conception web puissant et intuitif.

---

Fait avec ❤️ par l'équipe Webazon 