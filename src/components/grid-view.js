import { html, css } from 'lit';
import BaseComponent from './base-component.js';
import { localize } from '../utils/localize.js';
import { formatDate } from '../utils/date-formatter.js';
import { svgEdit } from '../assets/svg/svg-edit.js';
import { svgDelete } from '../assets/svg/svg-delete.js';
import '../components/svg-icon.js';

export class GridView extends BaseComponent {
    static properties = {
        employees: { type: Array },
        onEdit: { type: Function },
        onDelete: { type: Function },
        selectedIds: { type: Array }
    };

    static styles = css`
        :host {
            display: block;
        }

        .grid-view {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1rem;
        }

        .employee-card {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            position: relative;
            transition: all 0.2s ease;
        }

        .card-checkbox {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 20px;
            height: 20px;
            cursor: pointer;
            accent-color: #FF6200;
        }

        h3 {
            margin: 0 0 1rem;
            color: #333;
            padding-right: 3rem;
        }

        p {
            margin: 0.5rem 0;
            color: #666;
        }

        .field-label {
            color: #444;
            font-weight: 500;
        }

        .actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #eee;
        }

        .edit-btn, .delete-btn {
            flex: 1;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .edit-btn {
            background: #e3f2fd;
            color: #1976d2;
        }

        .delete-btn {
            background: #ffebee;
            color: #d32f2f;
        }

        .edit-btn:hover {
            background: #bbdefb;
        }

        .delete-btn:hover {
            background: #ffcdd2;
        }

        .employee-card.selected {
            box-shadow: 0 0 0 2px #FF6200, 0 1px 3px rgba(0, 0, 0, 0.1);
        }
    `;

    constructor() {
        super();
        this.selectedIds = [];
    }

    _handleCheckboxChange(e, id) {
        this.dispatchEvent(new CustomEvent('selection-change', {
            detail: { id, checked: e.target.checked },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="grid-view">
                ${this.employees?.map(employee => html`
                    <div class="employee-card ${this.selectedIds?.includes(employee.id) ? 'selected' : ''}">
                        <input 
                            type="checkbox" 
                            class="card-checkbox"
                            .checked=${this.selectedIds?.includes(employee.id)}
                            @change=${(e) => this._handleCheckboxChange(e, employee.id)}
                        >
                        <h3>${employee.firstName} ${employee.lastName}</h3>
                        <p><span class="field-label">${localize("department")}:</span> ${employee.department}</p>
                        <p><span class="field-label">${localize("position")}:</span> ${employee.position}</p>
                        <p><span class="field-label">${localize("date-of-employment")}:</span> ${formatDate(employee.dateOfEmployment)}</p>
                        <p><span class="field-label">${localize("date-of-birth")}:</span> ${formatDate(employee.dateOfBirth)}</p>
                        <p><span class="field-label">${localize("email")}:</span> ${employee.email}</p>
                        <p><span class="field-label">${localize("phone-number")}:</span> ${employee.phoneNumber}</p>
                        <div class="actions">
                            <button class="edit-btn" @click=${() => this.onEdit(employee.id)}>
                                <svg-icon .icon=${svgEdit} size="14"></svg-icon> ${localize("edit")}
                            </button>
                            <button class="delete-btn" @click=${() => this.onDelete(employee.id)}>
                                <svg-icon .icon=${svgDelete} size="14"></svg-icon> ${localize("delete")}
                            </button>
                        </div>
                    </div>
                `)}
            </div>
        `;
    }
}

customElements.define('grid-view', GridView); 