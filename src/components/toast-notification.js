import { LitElement, html, css } from 'lit';

export class ToastNotification extends LitElement {
    static properties = {
        message: { type: String },
        type: { type: String }, // success, error, info
        show: { type: Boolean }
    };

    static styles = css`
        :host {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }

        .toast {
            padding: 1rem 1.5rem;
            border-radius: 4px;
            background: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            min-width: 300px;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
            border-left: 4px solid;
        }

        .toast.success {
            border-left-color: #4CAF50;
        }

        .toast.error {
            border-left-color: #f44336;
        }

        .toast.info {
            border-left-color: #2196F3;
        }

        .message {
            color: #333;
            font-size: 0.95rem;
            margin: 0;
            flex-grow: 1;
        }

        .icon {
            font-size: 1.2rem;
        }

        .success .icon {
            color: #4CAF50;
        }

        .error .icon {
            color: #f44336;
        }

        .info .icon {
            color: #2196F3;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;

    constructor() {
        super();
        this.message = '';
        this.type = 'info';
        this.show = false;
    }

    render() {
        if (!this.show) return null;

        const icons = {
            success: '✓',
            error: '✕',
            info: 'ℹ'
        };

        return html`
            <div class="toast ${this.type}">
                <span class="icon">${icons[this.type]}</span>
                <p class="message">${this.message}</p>
            </div>
        `;
    }
}

customElements.define('toast-notification', ToastNotification); 