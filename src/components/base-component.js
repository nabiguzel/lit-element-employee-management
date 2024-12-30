import { LitElement } from 'lit';
import { languageManager } from '../utils/language-manager.js';

export default class BaseComponent extends LitElement {
    constructor() {
        super();
        this._unsubscribe = languageManager.subscribe(() => {
            this.requestUpdate();
        });
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('language')) {
            this.requestUpdate();
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._unsubscribe) {
            this._unsubscribe();
        }
    }
} 