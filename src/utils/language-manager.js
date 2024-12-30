export class LanguageManager {
    constructor() {
        this._listeners = [];
        this.currentLanguage = localStorage.getItem('preferredLanguage') || 
                              document.documentElement.lang || 
                              'tr';
                              
        document.documentElement.lang = this.currentLanguage;
    }

    subscribe(callback) {
        this._listeners.push(callback);
        return () => {
            const index = this._listeners.indexOf(callback);
            if (index > -1) this._listeners.splice(index, 1);
        };
    }

    setLanguage(lang) {
        if (this.currentLanguage !== lang) {
            this.currentLanguage = lang;
            document.documentElement.lang = lang;
            localStorage.setItem('preferredLanguage', lang);
            
            this._listeners.forEach(callback => callback(lang));
            window.dispatchEvent(new CustomEvent('language-changed', {
                detail: { language: lang },
                bubbles: true,
                composed: true
            }));
        }
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

export const languageManager = new LanguageManager(); 