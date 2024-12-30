import { html, css } from 'lit';
import { localize } from '../utils/localize.js';
import { svgEdit } from '../assets/svg/svg-edit.js';
import { svgDelete } from '../assets/svg/svg-delete.js';
import { formatDate } from '../utils/date-formatter.js';
import '../components/svg-icon.js';
import BaseComponent from './base-component.js';

export class TableView extends BaseComponent {
    static properties = {
        employees: { type: Array },
        onEdit: { type: Function },
        onDelete: { type: Function },
        language: { type: String },
        selectedIds: { type: Array }
    };

    constructor() {
        super();
        this.selectedIds = [];
    }

    static styles = css`
        :host {
            display: block;
        }

        .table-view {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        th, td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #eee;
        }

        .name-cell {
            font-weight: 600;
        }

        th {
            background: white;
            font-weight: 500;
            color: #FF6200;
            border-bottom: 2px solid #eee;
        }

        .actions {
            display: flex;
            gap: 0.5rem;
        }

        .edit-btn, .delete-btn {
            padding: 0.5rem;
            border: none;
            background: none;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .edit-btn:hover {
            background: rgba(0, 102, 255, 0.1);
        }

        .delete-btn:hover {
            background: rgba(220, 53, 69, 0.1);
        }

        .checkbox-cell {
            width: 40px;
            text-align: center;
        }

        .checkbox-cell input[type="checkbox"] {
            width: 18px;
            height: 18px;
            cursor: pointer;
            accent-color: #FF6200;
        }
    `;

    render() {
        return html`
            <table class="table-view">
                <thead>
                    <tr>
                        <th class="checkbox-cell">
                            <input type="checkbox" 
                                @change=${this._handleSelectAll}
                                .checked=${this.selectedIds.length === this.employees.length}
                            >
                        </th>
                        <th>${localize("first-name")}</th>
                        <th>${localize("last-name")}</th>
                        <th>${localize("date-of-employment")}</th>
                        <th>${localize("date-of-birth")}</th>
                        <th>${localize("phone-number")}</th>
                        <th>${localize("email")}</th>
                        <th>${localize("department")}</th>
                        <th>${localize("position")}</th>
                        <th>${localize("actions")}</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.employees?.map(employee => html`
                        <tr>
                            <td class="checkbox-cell">
                                <input type="checkbox" 
                                    .checked=${this.selectedIds.includes(employee.id)}
                                    @change=${(e) => this._handleCheckboxChange(e, employee.id)}
                                >
                            </td>
                            <td class="name-cell">${employee.firstName}</td>
                            <td class="name-cell">${employee.lastName}</td>
                            <td>${formatDate(employee.dateOfEmployment)}</td>
                            <td>${formatDate(employee.dateOfBirth)}</td>
                            <td>${employee.phoneNumber}</td>
                            <td>${employee.email}</td>
                            <td>${employee.department}</td>
                            <td>${employee.position}</td>
                            <td class="actions">
                                <button class="edit-btn" @click=${() => this.onEdit(employee.id)}>
                                    <svg-icon .icon=${svgEdit} color="#FF6200" size="20"></svg-icon>
                                </button>
                                <button class="delete-btn" @click=${() => this.onDelete(employee.id)}>
                                    <svg-icon .icon=${svgDelete} color="#FF6200" size="20"></svg-icon>
                                </button>
                            </td>
                        </tr>
                    `)}
                </tbody>
            </table>
        `;
    }

    _handleSelectAll(e) {
        this.dispatchEvent(new CustomEvent('select-all-change', {
            detail: { checked: e.target.checked },
            bubbles: true,
            composed: true
        }));
    }

    _handleCheckboxChange(e, id) {
        this.dispatchEvent(new CustomEvent('selection-change', {
            detail: { id, checked: e.target.checked },
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('table-view', TableView); 