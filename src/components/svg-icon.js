import { LitElement, css } from 'lit';

export class SvgIcon extends LitElement {
    static properties = {
        icon: { type: Object },
        color: { type: String },
        size: { type: Number }
    };

    static styles = css`
        :host {
            display: inline-block;
        }
        
        svg {
            fill: var(--icon-color, currentColor);
            width: var(--icon-size, 20px);
            height: var(--icon-size, 20px);
        }
    `;

    constructor() {
        super();
        this.size = 24;
    }

    updated(changedProperties) {
        if (changedProperties.has('color')) {
            let colorValue;
            switch (this.color) {
                case 'primary':
                    colorValue = '#0066FF';
                    break;
                case 'secondary':
                    colorValue = '#555555';
                    break;
                default:
                    colorValue = this.color;
                    break;
            }
            this.style.setProperty('--icon-color', colorValue);
        }

        if (changedProperties.has('size')) {
            this.style.setProperty('--icon-size', `${this.size}px`);
        }
    }

    render() {
        return this.icon;
    }
}

customElements.define('svg-icon', SvgIcon);
  