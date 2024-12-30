import { html, css } from 'lit';
import { employeeStore } from '../../store/employee-store.js';
import { localize } from '../../utils/localize.js';
import '../../components/pagination-controls.js';
import '../../components/table-view.js';
import '../../components/grid-view.js';
import '../../components/confirm-modal.js';
import BaseComponent from '../../components/base-component.js';
import { toastService } from '../../services/toast-service.js';

export class EmployeeList extends BaseComponent {
    static properties = {
        employees: { type: Array },
        loading: { type: Boolean },
        error: { type: String },
        viewMode: { type: String },
        currentPage: { type: Number },
        itemsPerPage: { type: Number },
        searchTerm: { type: String },
        selectedIds: { type: Array },
        showDeleteModal: { type: Boolean },
        deleteMessage: { type: String },
        deletingEmployeeId: { type: String }
    };

    static styles = css`
        :host {
            display: block;
            padding: 1rem;
        }

        .loading,
        .error {
            text-align: center;
            padding: 2rem;
            color: #666;
        }

        .error {
            color: #dc3545;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            color: #FF6200;
        }

        .title {
            margin: 0;
            font-size: 1.5rem;
            color: #FF6200;
        }

        .controls {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .search-container {
            position: relative;
            display: flex;
            align-items: center;
        }

        .search-box {
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            min-width: 200px;
            padding-right: 2rem;
        }

        .clear-search {
            position: absolute;
            right: 8px;
            background: none;
            border: none;
            padding: 4px;
            cursor: pointer;
            color: #666;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }

        .clear-search:hover {
            background: rgba(0, 0, 0, 0.05);
            color: #333;
        }

        .view-toggle {
            display: flex;
            gap: 0.5rem;
        }

        .view-btn {
            padding: 0.5rem;
            border: none;
            background: none;
            cursor: pointer;
            border-radius: 4px;
            color: #f44336;
            transition: all 0.2s;
        }

        .view-btn:hover {
            background: rgba(244, 67, 54, 0.1);
        }

        .view-btn.active {
            background: rgba(244, 67, 54, 0.2);
            color: #f44336;
        }

        .view-btn svg {
            width: 20px;
            height: 20px;
        }

        .delete-selected {
            background: #dc3545;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .delete-selected:hover {
            background: #c82333;
        }
    `;

    constructor() {
        super();
        this.employees = [];
        this.loading = true;
        this.error = '';
        this.viewMode = localStorage.getItem('viewMode') || 'table';
        
        // URL'den başlangıç değerlerini al
        const params = new URLSearchParams(window.location.search);
        this.currentPage = this._getPageFromUrl() || 1;
        this.searchTerm = params.get('search') || '';
        this.itemsPerPage = parseInt(localStorage.getItem('itemsPerPage')) || 10;
        this.selectedIds = [];
        this.showDeleteModal = false;
        this.deleteMessage = '';
        this.deletingEmployeeId = null;

        // URL değişikliklerini dinle
        window.addEventListener('popstate', () => this._handleUrlChange());
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('popstate', () => this._handleUrlChange());
    }

    _handleUrlChange() {
        const params = new URLSearchParams(window.location.search);
        this.currentPage = parseInt(params.get('page')) || 1;
        this.searchTerm = params.get('search') || '';
        this.requestUpdate();
    }

    _updateUrl() {
        const url = new URL(window.location.href);
        // Sayfa 1'den farklıysa ekle
        if (this.currentPage > 1) {
            url.searchParams.set('page', this.currentPage);
        } else {
            url.searchParams.delete('page');
        }
        
        // Arama terimi varsa ekle
        if (this.searchTerm) {
            url.searchParams.set('search', this.searchTerm);
        } else {
            url.searchParams.delete('search');
        }
        
        window.history.pushState({}, '', url);
    }

    handleSearch(e) {
        this.searchTerm = e.target.value;
        this.currentPage = 1; // Aramada ilk sayfaya dön
        this._updateUrl();
    }

    handleItemsPerPageChange(e) {
        this.itemsPerPage = e.detail.value;
        this.currentPage = 1; // İlk sayfaya dön
        localStorage.setItem('itemsPerPage', this.itemsPerPage);
        this._updateUrl();
    }

    clearSearch() {
        this.searchTerm = '';
        this.currentPage = 1;
        // URL'den search parametresini kaldır
        const url = new URL(window.location.href);
        url.searchParams.delete('search');
        url.searchParams.delete('page');
        window.history.pushState({}, '', url);
    }

    setPage(page) {
        if (page !== this.currentPage) {
            this.currentPage = page;
            this._updateUrl();
        }
    }

    async firstUpdated() {
        try {
            this.loading = true;
            const data = await employeeStore.getEmployees();
            if (Array.isArray(data)) {
                this.employees = data;
            } else {
                console.error('Geçersiz veri formatı:', data);
                this.error = 'Veri formatı hatalı';
            }
        } catch (error) {
            console.error('Error loading employees:', error);
            this.error = 'Çalışanlar yüklenirken bir hata oluştu.';
        } finally {
            this.loading = false;
            this.requestUpdate();
        }

        window.addEventListener('popstate', () => {
            this.currentPage = this._getPageFromUrl();
        });
    }

    toggleView(mode) {
        this.viewMode = mode;
        localStorage.setItem('viewMode', mode);
    }

    get filteredEmployees() {
        if (!this.searchTerm) return this.employees;
        
        const searchLower = this.searchTerm.toLowerCase();
        return this.employees.filter(emp => 
            emp.firstName.toLowerCase().includes(searchLower) ||
            emp.lastName.toLowerCase().includes(searchLower) ||
            emp.email.toLowerCase().includes(searchLower)
        );
    }

    get paginatedEmployees() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredEmployees.slice(start, end);
    }

    get totalPages() {
        return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
    }

    handleSelectionChange(e) {
        const id = e.detail.id;
        const checked = e.detail.checked;
        
        if (checked) {
            this.selectedIds = [...(this.selectedIds || []), id];
        } else {
            this.selectedIds = (this.selectedIds || []).filter(selectedId => selectedId !== id);
        }
        this.requestUpdate();
    }

    handleSelectAll(e) {
        const checked = e.detail.checked;
        if (checked) {
            this.selectedIds = this.paginatedEmployees.map(emp => emp.id);
        } else {
            this.selectedIds = [];
        }
        this.requestUpdate();
    }

    async deleteSelected() {
        if (!this.selectedIds.length) return;

        const selectedEmployees = this.employees.filter(emp => this.selectedIds.includes(emp.id));
        const employeeNames = selectedEmployees.map(emp => `${emp.firstName} ${emp.lastName}`).join(', ');
        
        this.deleteMessage = this.selectedIds.length === 1
            ? localize('selected-employee-delete').replace('{name}', employeeNames)
            : localize('selected-employees-delete').replace('{count}', this.selectedIds.length);
        
        this.showDeleteModal = true;
    }

    _deleteEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        this.deleteMessage = localize('selected-employee-delete').replace('{name}', `${employee.firstName} ${employee.lastName}`);
        this.deletingEmployeeId = id;
        this.showDeleteModal = true;
    }

    async _confirmDelete() {
        try {
            if (this.deletingEmployeeId) {
                await employeeStore.deleteEmployee(this.deletingEmployeeId);
                this.employees = this.employees.filter(emp => emp.id !== this.deletingEmployeeId);
                this.deletingEmployeeId = null;
                toastService.show(localize('record-deleted'), 'success');
            } else {
                await Promise.all(this.selectedIds.map(id => employeeStore.deleteEmployee(id)));
                this.employees = this.employees.filter(emp => !this.selectedIds.includes(emp.id));
                this.selectedIds = [];
                toastService.show(localize('records-deleted'), 'success');
            }
        } catch (error) {
            console.error('Error deleting employees:', error);
            toastService.show(localize('error-deleting'), 'error');
        } finally {
            this.showDeleteModal = false;
        }
    }

    _cancelDelete() {
        this.showDeleteModal = false;
        this.deletingEmployeeId = null;
    }

    render() {
        if (this.loading) {
            return html`<div class="loading">${localize("loading")}</div>`;
        }

        if (this.error) {
            return html`<div class="error">${this.error}</div>`;
        }

        return html`
            <div class="header">
                <h2 class="title">${localize("employee-list")}</h2>
                <div class="controls">
                    <div class="search-container">
                        <input 
                            type="text" 
                            class="search-box"
                            placeholder="Ara..."
                            .value=${this.searchTerm}
                            @input=${this.handleSearch}
                            @search=${this.clearSearch}
                        >
                        ${this.searchTerm ? html`
                            <button 
                                class="clear-search" 
                                @click=${this.clearSearch}
                                title="Aramayı Temizle"
                            >
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                                </svg>
                            </button>
                        ` : ''}
                    </div>
                    ${this.selectedIds.length ? html`
                        <button class="delete-selected" @click=${this.deleteSelected}>
                            <svg viewBox="0 0 24 24" width="16" height="16">
                                <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                            ${localize('delete-selected')} (${this.selectedIds.length})
                        </button>
                    ` : ''}
                    <div class="view-toggle">
                        <button 
                            class="view-btn ${this.viewMode === 'table' ? 'active' : ''}"
                            @click=${() => this.toggleView('table')}
                            title="Tablo Görünümü"
                        >
                            <svg viewBox="0 0 24 24">
                                <path fill="currentColor" d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
                            </svg>
                        </button>
                        <button 
                            class="view-btn ${this.viewMode === 'grid' ? 'active' : ''}"
                            @click=${() => this.toggleView('grid')}
                            title="Grid Görünümü"
                        >
                            <svg viewBox="0 0 24 24">
                                <path fill="currentColor" d="M3 3h8v8H3V3zm0 10h8v8H3v-8zM13 3h8v8h-8V3zm0 10h8v8h-8v-8z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            ${this.viewMode === 'table' 
                ? html`<table-view 
                    .employees=${this.paginatedEmployees}
                    .onEdit=${this._editEmployee.bind(this)}
                    .onDelete=${this._deleteEmployee.bind(this)}
                    .selectedIds=${this.selectedIds || []}
                    @selection-change=${this.handleSelectionChange}
                    @select-all-change=${this.handleSelectAll}
                  ></table-view>`
                : html`<grid-view
                    .employees=${this.paginatedEmployees}
                    .onEdit=${this._editEmployee.bind(this)}
                    .onDelete=${this._deleteEmployee.bind(this)}
                    .selectedIds=${this.selectedIds || []}
                    @selection-change=${this.handleSelectionChange}
                  ></grid-view>`
            }
            <pagination-controls
                .currentPage=${this.currentPage}
                .totalPages=${this.totalPages}
                .itemsPerPage=${this.itemsPerPage}
                @page-change=${(e) => this.setPage(e.detail.page)}
                @items-per-page-change=${this.handleItemsPerPageChange}
            ></pagination-controls>
            <confirm-modal
                ?show=${this.showDeleteModal}
                .message=${this.deleteMessage}
                @confirm=${this._confirmDelete}
                @cancel=${this._cancelDelete}
            ></confirm-modal>
        `;
    }

    _editEmployee(id) {
        window.history.pushState({}, '', `/edit/${id}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
    }

    // URL'den sayfa numarasını al
    _getPageFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const page = parseInt(params.get('page'));
        return !isNaN(page) && page > 0 ? page : 1;
    }
}

customElements.define('employee-list', EmployeeList);