import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ElementItem from '../types/element.type';
import { createComponent } from '@lit/react';
import React from 'react';

@customElement('selected-items-array')
export class SelectedItemsArrayWC extends LitElement {
  static styles = css`
    .selected-items-container {
      display: flex;
      flex-direction: column;
      list-style-type: none;
      align-items: start;
      flex-wrap: wrap;
      margin: 0;
    }

    .selected-items-list {
      display: flex;
      flex-direction: row;
      margin: 0;
      padding: 0;
    }

    .selected-items-header {
      margin: 10px 0;
      color: white;
    }
    .empty-selected-items {
      margin: 0 0 15px 0;
      color: white;
      display: flex;
      align-items: center;
    }

    .selected-item {
      width: 130px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: #000;
      border-radius: 5px;
      padding: 5px 10px;
      margin-right: 10px;
      margin-bottom: 10px;
      color: white;
      font-size: 14px;
    }
    .selected-item-divider {
      margin: 0 10px;
      height: 100%;
      width: 1px;
      background-color: #666;
    }

    .delete-button {
      background: none;
      border: none;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }

    .delete-button:hover {
      color: red;
    }
  `;

  @property({ type: Array }) selectedItems: ElementItem[] = [];
  @property({ type: Function }) onDelete!: (item: ElementItem) => void;

  render() {
    return html`
      <div class="selected-items-container">
        <h3 class="selected-items-header">Current selected items:</h3>
        ${this.selectedItems.length >= 1
          ? html`<ul class="selected-items-list">
              ${this.selectedItems.map(
                (item) => html`
                  <li class="selected-item" key=${item.id}>
                    <span>${item.name}</span>
                    <div class="selected-item-divider"></div>
                    <button
                      class="delete-button"
                      @click=${() => this.deleteItem(item.id)}
                      }
                    >
                      x
                    </button>
                  </li>
                `
              )}
            </ul>`
          : html`<p class="empty-selected-items">
              You don't have any selected items ...
            </p>`}
      </div>
    `;
  }
  private deleteItem(itemId: number) {
    const updatedSelection = this.selectedItems.filter((i) => i.id !== itemId);
    this.dispatchEvent(
      new CustomEvent('changeSelection', { detail: updatedSelection })
    );
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
    delete: 'onDelete',
  },
});
