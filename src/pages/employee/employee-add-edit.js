import { html, css } from 'lit';
import BaseComponent from '../../components/base-component.js';
import { localize } from '../../utils/localize.js';
import '../../components/employee-form.js';

export class EmployeeAddEdit extends BaseComponent {
    static styles = css`
        :host {
            display: block;
            padding: 1rem;
        }

        .page-title {
            color: #FF6200;
            margin-bottom: 2rem;
            font-size: 1.5rem;
        }
    `;

    static properties = {
        employeeId: { type: String }
    };

    constructor() {
        super();
        
        const pathParts = window.location.pathname.split('/');
        this.employeeId = pathParts[pathParts.indexOf('edit') + 1];
    }

    render() {
        const isEdit = !!this.employeeId;
        const title = isEdit ? localize('edit-employee') : localize('add-employee');

        return html`
            <h2 class="page-title">${title}</h2>
            <employee-form .employeeId=${this.employeeId}></employee-form>
        `;
    }
}

customElements.define('employee-add-edit', EmployeeAddEdit); 