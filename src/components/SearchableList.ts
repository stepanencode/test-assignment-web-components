import React from 'react';
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ElementItem from '../types/element.type';
import { createComponent } from '@lit/react';

@customElement('searchable-list')
class SearchableListWC extends LitElement {
  static styles = css`
    .selected-items-container {
      background-color: #333;
      padding: 10px;
      border-radius: 5px;
      color: white;
    }

    .selected-item {
      padding: 5px;
      margin-bottom: 5px;
      background-color: #000;
      border-radius: 5px;
    }

    input {
      padding: 8px;
      margin-bottom: 10px;
      width: 100%;
    }
  `;

  @property({ type: Array }) elements: ElementItem[] = [];

  private searchTerm: string = '';

  private handleSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }

  private searchItems() {
    const newSearchedElements = this.elements.filter((item) =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log('searchItems', this.searchTerm);
    console.log('newSearchedElements', newSearchedElements);
    this.dispatchEvent(
      new CustomEvent('search', { detail: newSearchedElements })
    );
  }

  render() {
    return html`
      <input
        type="text"
        placeholder="Search..."
        @input=${this.handleSearchChange}
        @change=${() => this.searchItems()}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'searchable-list': SearchableListWC;
  }
}

export const ElementsList = createComponent({
  react: React,
  tagName: 'searchable-list',
  elementClass: SearchableListWC,
});
