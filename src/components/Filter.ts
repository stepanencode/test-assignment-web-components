import { createComponent } from '@lit/react';
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import React from 'react';

const options = [
  { label: 'No filter', value: '' },
  { label: '>10', value: '11' },
  { label: '>50', value: '51' },
  { label: '>100', value: '101' },
];

@customElement('filter-elements')
export class FilterWC extends LitElement {
  static styles = css`
    .container {
      width: 150px;
    }

    .custom-select {
      width: 100%;
      padding: 8px;
      font-size: 14px;
      color: #333;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .custom-select option {
      padding: 10px;
      font-size: 16px;
    }

    .custom-select:hover {
      background-color: #e6e6e6;
      border-color: #999;
    }

    .custom-select:focus {
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
      outline: none;
    }
  `;

  @property({ type: String }) selectedValue: string = '';

  private handleChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedValue = selectElement.value;
    const changeEvent = new CustomEvent('selection-changed', {
      detail: this.selectedValue,
    });
    this.dispatchEvent(changeEvent);
  }

  render() {
    return html`
      <div class="container">
        <select @change=${this.handleChange} class="custom-select">
          ${options.map(
            (option) => html`
              <option
                value=${option.value}
                ?selected=${option.value === this.selectedValue}
              >
                ${option.label}
              </option>
            `
          )}
        </select>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    filter: FilterWC;
  }
}

export const Filter = createComponent({
  react: React,
  tagName: 'filter-elements',
  elementClass: FilterWC,
});
