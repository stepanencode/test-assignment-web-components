import { createComponent } from '@lit/react';
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import React from 'react';
// import ElementItem from '../types/element.type';

@customElement('filter-elements')
export class FilterWC extends LitElement {
  // Array of options (each option has a value and a label)
  //   @property({ type: Array }) elements: ElementItem[] = [];

  //   @property({ type: Array }) options: { value: string; label: string }[] = [];

  // Selected value
  @property({ type: String }) selectedValue: string = '';

  // Handle the change event when a new option is selected
  private handleChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedValue = selectElement.value;
    // console.log('FFFF elem', this.elements);
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
