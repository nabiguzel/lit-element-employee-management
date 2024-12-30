import { html, css } from 'lit';
import BaseComponent from './base-component.js';
import { localize } from '../utils/localize.js';
import { languageManager } from '../utils/language-manager.js';
import { svgIng } from '../assets/svg/svg-ing.js';
import { svgEmployees } from '../assets/svg/svg-employees.js';
import { svgAdd } from '../assets/svg/svg-add.js';

export class NavMenu extends BaseComponent {
  static styles = css`
    :host {
      display: block;
      background: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      padding: 1rem 2rem;
    }

    nav {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #ff6200;
      text-decoration: none;
      font-weight: bold;

      .logo-label {
        color: #000;
      }
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .nav-link {
      color: #ff6200;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
    }

    .nav-link:hover {
      color: #ff4400;
    }

    .add-new {
      background: #ff4400;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      font-weight: 500;
    }

    .add-new:hover {
      background: #ee3300;
    }

    .language-selector {
      padding: 0.5rem;
      border: 1px solid #eee;
      border-radius: 4px;
      background: white;
    }

    .icon {
      width: 20px;
      height: 20px;
    }
  `;

  static properties = {
    currentLanguage: { type: String }
  };

  constructor() {
    super();
    this.currentLanguage = languageManager.getCurrentLanguage();
  }

  render() {
    return html`
      <nav>
        <div class="left-section">
          <a href="/" class="logo">
            <div class="icon">${svgIng}</div>
            <span class="logo-label">ING</span>
          </a>
        </div>
        <div class="right-section">
          <div class="nav-links">
            <a href="/" class="nav-link">
              <svg-icon .icon=${svgEmployees} size="20"></svg-icon>
              <span>${localize('employees')}</span>
            </a>
            <a href="/add" class="nav-link">
            <svg-icon .icon=${svgAdd} size="20"></svg-icon>
              <span>${localize('add-new')}</span>
            </a>
          </div>
          <select
            class="language-selector"
            @change=${this._handleLanguageChange}
            .value=${this.currentLanguage}
          >
            <option value="tr" ?selected=${this.currentLanguage === 'tr'}>🇹🇷 TR</option>
            <option value="en" ?selected=${this.currentLanguage === 'en'}>🇬🇧 EN</option>
          </select>
        </div>
      </nav>
    `;
  }

  _handleLanguageChange(e) {
    this.currentLanguage = e.target.value;
    languageManager.setLanguage(e.target.value);
  }
}

customElements.define('nav-menu', NavMenu);
