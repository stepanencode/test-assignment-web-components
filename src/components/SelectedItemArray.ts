import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ElementItem from '../types/element.type';
import { createComponent } from '@lit/react';
import React from 'react';

@customElement('selected-items-array')
export class SelectedItemsArrayWC extends LitElement {
  static styles = css`
    ul {
      list-style-type: none;
    }
    li {
      margin: 7px 0;
    }
  `;

  @property({ type: Array }) selectedItems: ElementItem[] = [];
  @property({ type: Function }) onDelete!: () => void;

  private handleDelete() {
    this.onDelete(
      this.setSelectedItems((prev) => prev.filter((i) => i !== item))
    );
  }

  render() {
    return html`
      <ul>
        ${this.selectedItems.map(
          (item) => html`
            <li key=${item.id}>
              <span>Element {item.id}{' '}</span>
              <button @click=${this.handleDelete}>x</button>
            </li>
          `
        )}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'selected-items-array': SelectedItemsArrayWC;
  }
}

export const SelectedItemsArray = createComponent({
  react: React,
  tagName: 'selected-items-array',
  elementClass: SelectedItemsArrayWC,
  events: {
    handleDelete: 'onDelete',
  },
});
