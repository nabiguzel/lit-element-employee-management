import { LitElement, html, css } from 'lit';
import { localize } from '../utils/localize.js';

export class ConfirmModal extends LitElement {
    static properties = {
        show: { type: Boolean },
        message: { type: String },
        title: { type: String }
    };

    static styles = css`
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .modal-title {
            color: #FF6200;
            margin: 0 0 1.5rem 0;
            font-size: 1.5rem;
            font-weight: 600;
        }

        .modal-message {
            color: #333;
            margin-bottom: 2rem;
            line-height: 1.5;
        }

        .modal-actions {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .proceed-btn {
            padding: 0.75rem;
            border: none;
            border-radius: 4px;
            background: #FF6200;
            color: white;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .proceed-btn:hover {
            background: #e65800;
        }

        .cancel-btn {
            padding: 0.75rem;
            border: 2px solid #5C5B9F;
            border-radius: 4px;
            background: white;
            color: #5C5B9F;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }

        .cancel-btn:hover {
            background: #5C5B9F;
            color: white;
        }
    `;

    render() {
        if (!this.show) return null;

        return html`
            <div class="modal-backdrop">
                <div class="modal-content">
                    <h2 class="modal-title">${this.title || localize('are-you-sure')}</h2>
                    <div class="modal-message">${this.message}</div>
                    <div class="modal-actions">
                        <button class="proceed-btn" @click=${this._handleProceed}>
                            ${localize('proceed')}
                        </button>
                        <button class="cancel-btn" @click=${this._handleCancel}>
                            ${localize('cancel')}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    _handleProceed() {
        this.dispatchEvent(new CustomEvent('confirm'));
    }

    _handleCancel() {
        this.dispatchEvent(new CustomEvent('cancel'));
    }
}

customElements.define('confirm-modal', ConfirmModal); 