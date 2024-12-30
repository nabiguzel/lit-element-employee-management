import { html, css } from 'lit';
import BaseComponent from './base-component.js';
import { localize } from '../utils/localize.js';

export class PaginationControls extends BaseComponent {
    static properties = {
        currentPage: { type: Number },
        totalPages: { type: Number },
        itemsPerPage: { type: Number }
    };

    static styles = css`
        :host {
            display: block;
        }

        .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            margin: 1rem 0;
        }

        .page-btn {
            padding: 0.5rem;
            min-width: 40px;
            height: 40px;
            border: 1px solid #ddd;
            background: white;
            cursor: pointer;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            font-weight: 500;
        }

        .page-btn:hover:not([disabled]) {
            background: rgba(255, 98, 0, 0.1);
            border-color: #FF6200;
            color: #FF6200;
        }

        .page-btn.active {
            background: #FF6200;
            color: white;
            border-color: #FF6200;
        }

        .page-btn[disabled] {
            opacity: 0.5;
            cursor: not-allowed;
            background: #f5f5f5;
        }

        .page-dots {
            padding: 0.5rem;
            color: #666;
            user-select: none;
        }

        .pagination-container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
            margin: 1rem 0;
        }

        .pagination-wrapper {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .items-per-page {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .items-per-page select {
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: white;
            min-width: 80px;
            cursor: pointer;
        }

        .items-per-page label {
            color: #666;
            font-size: 0.9rem;
        }

        .page-info {
            color: #666;
            font-size: 0.9rem;
        }
    `;

    constructor() {
        super();
        this.currentPage = 1;
        this.totalPages = 1;
        this.itemsPerPage = 10;
    }

    _createPageButtons() {
        const pages = [];
        const addPageButton = (pageNum) => {
            pages.push(html`
                <button 
                    class="page-btn ${this.currentPage === pageNum ? 'active' : ''}"
                    @click=${() => this._setPage(pageNum)}
                >
                    ${pageNum}
                </button>
            `);
        };

        // İlk sayfa
        addPageButton(1);

        // Aktif sayfadan önceki sayfalar
        if (this.currentPage > 3) {
            pages.push(html`<span class="page-dots">...</span>`);
        }
        for (let i = Math.max(2, this.currentPage - 1); i < this.currentPage; i++) {
            addPageButton(i);
        }

        // Aktif sayfa (eğer ilk veya son sayfa değilse)
        if (this.currentPage !== 1 && this.currentPage !== this.totalPages) {
            addPageButton(this.currentPage);
        }

        // Aktif sayfadan sonraki sayfalar
        for (let i = this.currentPage + 1; i < Math.min(this.totalPages, this.currentPage + 2); i++) {
            addPageButton(i);
        }
        if (this.currentPage < this.totalPages - 2) {
            pages.push(html`<span class="page-dots">...</span>`);
        }

        // Son sayfa
        if (this.totalPages > 1) {
            addPageButton(this.totalPages);
        }

        return pages;
    }

    _setPage(page) {
        const event = new CustomEvent('page-change', {
            detail: { page },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    _handleItemsPerPageChange(e) {
        const value = parseInt(e.target.value);
        this.dispatchEvent(new CustomEvent('items-per-page-change', {
            detail: { value },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="pagination-container">
                <div class="pagination">
                    <button 
                        class="page-btn"
                        ?disabled=${this.currentPage === 1}
                        @click=${() => this._setPage(this.currentPage - 1)}
                    >
                        <
                    </button>
                    ${this._createPageButtons()}
                    <button 
                        class="page-btn"
                        ?disabled=${this.currentPage === this.totalPages}
                        @click=${() => this._setPage(this.currentPage + 1)}
                    >
                        >
                    </button>
                </div>
                <div class="pagination-wrapper">
                    <div class="items-per-page">
                        <label>${localize('items-per-page')}:</label>
                        <select 
                            .value=${String(this.itemsPerPage)}
                            @change=${this._handleItemsPerPageChange}
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div class="page-info">
                        ${this.currentPage} / ${this.totalPages}
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('pagination-controls', PaginationControls); 