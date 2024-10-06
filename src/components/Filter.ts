import { createComponent } from '@lit/react';
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import React from 'react';

@customElement('filter-elements')
export class FilterWC extends LitElement {
  @property({ type: String }) selectedValue: string = '';

  private handleChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedValue = selectElement.value;
    const changeEvent = new CustomEvent('selection-changed', {
      detail: this.selectedValue,
    });
    this.dispatchEvent(changeEvent);
  }

  private options = [
    { label: '', value: '' },
    { label: '>10', value: '11' },
    { label: '>50', value: '51' },
    { label: '>100', value: '101' },
  ];

  render() {
    return html`
      <select @change=${this.handleChange}>
        ${this.options.map(
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
