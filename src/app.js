import { LitElement, html } from 'lit';
import { router } from './router.js';
import './components/nav-menu.js';
import './components/toast-notification.js';
import { toastService } from './services/toast-service.js';

export class App extends LitElement {
    static properties = {
        toastMessage: { type: String },
        toastType: { type: String },
        showToast: { type: Boolean }
    };

    constructor() {
        super();

        this.router = router;
        
        this.toastMessage = '';
        this.toastType = 'info';
        this.showToast = false;
        
        toastService.addListener(({ message, type }) => {
            this.toastMessage = message;
            this.toastType = type;
            this.showToast = true;
            
            setTimeout(() => {
                this.showToast = false;
            }, 3000);
        });
    }

    firstUpdated() {
        const outlet = this.shadowRoot.querySelector('#outlet');
        if (outlet) {
            this.router.setOutlet(outlet);
        }
    }

    render() {
        return html`
            <nav-menu></nav-menu>
            <main>
            <div id="outlet"></div>
            </main>
            <toast-notification
                .message=${this.toastMessage}
                .type=${this.toastType}
                ?show=${this.showToast}
            ></toast-notification>
        `;
    }
}

customElements.define('app-root', App); 