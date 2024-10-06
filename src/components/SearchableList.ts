import React from 'react';
import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createComponent } from '@lit/react';

@customElement('searchable-list')
class SearchableListWC extends LitElement {
  static styles = css`
    input {
      padding: 8px;
      margin-bottom: 10px;
      width: 200px;
    }
  `;

  private searchTerm: string = '';

  private handleSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.searchItems();
  }

  private searchItems() {
    this.dispatchEvent(new CustomEvent('search', { detail: this.searchTerm }));
  }

  render() {
    return html`
      <input
        .value=${this.searchTerm}
        type="text"
        placeholder="Search..."
        @input=${this.handleSearchChange}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'searchable-list': SearchableListWC;
  }
}

export const SearchableList = createComponent({
  react: React,
  tagName: 'searchable-list',
  elementClass: SearchableListWC,
});
