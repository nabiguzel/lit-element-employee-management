import { html, css } from 'lit';
import { employeeStore } from '../store/employee-store.js';
import { localize } from '../utils/localize.js';
import '../components/confirm-modal.js';
import BaseComponent from './base-component.js';
import { toastService } from '../services/toast-service.js';

export class EmployeeForm extends BaseComponent {
    static properties = {
        employee: { type: Object },
        isEdit: { type: Boolean },
        employeeId: { type: String },
        errors: { type: Object },
        showConfirmModal: { type: Boolean }
    };

    static styles = css`
        :host {
            display: block;
            max-width: 600px;
            margin: 0 auto;
            padding: 1rem;
        }

        form {
            background: white;
            padding: 2rem 3rem;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            max-width: 100%;
            box-sizing: border-box;
        }

        .form-group {
            margin-bottom: 1rem;
            width: 100%;
        }

        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #444;
            font-weight: 500;
        }

        input, select {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            transition: border-color 0.2s;
            box-sizing: border-box;
        }

        input:focus, select:focus {
            outline: none;
            border-color: #FF6200;
            box-shadow: 0 0 0 2px rgba(255, 98, 0, 0.1);
        }

        input:hover, select:hover {
            border-color: #FF6200;
        }

        .error {
            color: red;
            font-size: 0.8rem;
            margin-top: 0.25rem;
        }

        button[type="submit"] {
            width: 100%;
            padding: 0.75rem;
            border: none;
            border-radius: 4px;
            background: #FF6200;
            color: white;
            font-weight: 500;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.2s;
            margin-top: 1.5rem;
        }

        button[type="submit"]:hover {
            background: #e65800;
        }

        button[type="submit"]:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(255, 98, 0, 0.3);
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-bottom: 1rem;
            width: 100%;
            box-sizing: border-box;
        }

        @media (max-width: 600px) {
            form {
                padding: 1.5rem;
            }
            .form-row {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
        }
    `;

    constructor() {
        super();
        this.employee = {
            firstName: '',
            lastName: '',
            dateOfEmployment: '',
            dateOfBirth: '',
            phoneNumber: '',
            email: '',
            department: '',
            position: ''
        };
        this.isEdit = false;
        this.errors = {};
        this.showConfirmModal = false;
    }

    async firstUpdated() {
        if (this.employeeId) {
            this.isEdit = true;
            this.employee = await employeeStore.getEmployee(this.employeeId);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (this._validateForm()) {
            try {
                if (this.isEdit) {
                    this.showConfirmModal = true;
                    return;
                }
                await employeeStore.addEmployee(this.employee);
                toastService.show(localize('record-added'), 'success');
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
            } catch (error) {
                console.error('Form gönderimi sırasında hata:', error);
                toastService.show(error.message, 'error');
            }
        }
    }

    handleInput(e) {
        const { id, value } = e.target;
        this.employee = {
            ...this.employee,
            [id]: value
        };
        this._validateField(id, value);
    }

    _validateField(field, value) {
        this.errors = {
            ...this.errors,
            [field]: this._getValidationError(field, value)
        };
        this.requestUpdate();
    }

    _getValidationError(field, value) {
        switch (field) {
            case 'email':
                return !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) 
                    ? localize('invalid-email') 
                    : '';
            case 'phoneNumber':
                return !value.match(/^\+?[\d\s-]{10,}$/) 
                    ? localize('invalid-phone') 
                    : '';
            default:
                return '';
        }
    }

    _validateForm() {
        let isValid = true;
        Object.keys(this.employee).forEach(field => {
            const error = this._getValidationError(field, this.employee[field]);
            if (error) {
                this.errors[field] = error;
                isValid = false;
            }
        });
        this.requestUpdate();
        return isValid;
    }

    async _handleConfirm() {
        try {
            await employeeStore.updateEmployee(this.employee);
            toastService.show(localize('record-updated'), 'success');
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));
        } catch (error) {
            console.error('Form gönderimi sırasında hata:', error);
            toastService.show(error.message, 'error');
        } finally {
            this.showConfirmModal = false;
        }
    }

    _handleCancel() {
        this.showConfirmModal = false;
    }

    render() {
        return html`
            <form @submit=${this.handleSubmit}>
                <div class="form-row">
                    <div class="form-group">
                        <label for="firstName">${localize('first-name')}</label>
                        <input type="text" 
                               id="firstName" 
                               .value=${this.employee.firstName}
                               @input=${this.handleInput}
                               required>
                    </div>

                    <div class="form-group">
                        <label for="lastName">${localize('last-name')}</label>
                        <input type="text" 
                               id="lastName" 
                               .value=${this.employee.lastName}
                               @input=${this.handleInput}
                               required>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="dateOfEmployment">${localize('date-of-employment')}</label>
                        <input type="date" 
                               id="dateOfEmployment"
                               .value=${this.employee.dateOfEmployment}
                               @input=${this.handleInput}
                               required>
                    </div>

                    <div class="form-group">
                        <label for="dateOfBirth">${localize('date-of-birth')}</label>
                        <input type="date" 
                               id="dateOfBirth"
                               .value=${this.employee.dateOfBirth}
                               @input=${this.handleInput}
                               required>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="phoneNumber">${localize('phone-number')}</label>
                        <input type="tel" 
                               id="phoneNumber"
                               .value=${this.employee.phoneNumber}
                               @input=${this.handleInput}
                               required>
                        ${this.errors.phoneNumber ? html`
                            <div class="error">${this.errors.phoneNumber}</div>
                        ` : ''}
                    </div>

                    <div class="form-group">
                        <label for="email">${localize('email')}</label>
                        <input type="email" 
                               id="email" 
                               .value=${this.employee.email}
                               @input=${this.handleInput}
                               required>
                        ${this.errors.email ? html`
                            <div class="error">${this.errors.email}</div>
                        ` : ''}
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="department">${localize('department')}</label>
                        <select id="department"
                                .value=${this.employee.department}
                                @change=${this.handleInput}
                                required>
                            <option value="">${localize('select-department')}</option>
                            <option value="Analytics">Analytics</option>
                            <option value="Tech">Tech</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="position">${localize('position')}</label>
                        <select id="position"
                                .value=${this.employee.position}
                                @change=${this.handleInput}
                                required>
                            <option value="">${localize('select-position')}</option>
                            <option value="Junior">Junior</option>
                            <option value="Medior">Medior</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </div>
                </div>

                <button type="submit">
                    ${this.isEdit ? localize('update') : localize('create')}
                </button>
            </form>
            <confirm-modal
                ?show=${this.showConfirmModal}
                .message=${localize('confirm-update')}
                @confirm=${this._handleConfirm}
                @cancel=${this._handleCancel}
            ></confirm-modal>
        `;
    }
}

customElements.define('employee-form', EmployeeForm); 