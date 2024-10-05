import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createComponent } from '@lit/react';
import React from 'react';
import ElementItem from '../types/element.type';
import './SelectedItemsArray';
import './ElementsList';

@customElement('modal-component')
class ModalComponent extends LitElement {
  @property({ type: Array }) elements: ElementItem[] = [];
  @property({ type: Array }) selectedItems: ElementItem[] = [];
  @property({ type: Function }) onSave!: (items: ElementItem[]) => void;
  @property({ type: Function }) onDelete!: (item: ElementItem) => void;
  @property({ type: Function }) onCancel!: () => void;

  static styles = css`
    .modal {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      background-color: #333;
      color: white;
      border-radius: 8px;
      width: 500px;
      height: 400px;
      margin: 2rem auto;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }

    .modal h2 {
      margin-top: 0;
    }

    .buttons {
      display: flex;
      justify-content: space-between;
    }

    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }
  `;

  private changeSelection(event: CustomEvent) {
    this.selectedItems = event.detail;
  }

  private handleSave() {
    this.onSave(this.selectedItems);
  }

  private handleCancel() {
    this.selectedItems = [];
    this.onCancel();
  }

  render() {
    return html`
      <div class="overlay" @click=${this.onCancel}></div>
      <div class="modal">
        <h2>Select Items</h2>
        <elements-list
          .elements=${this.elements}
          @toggle-item=${this.toggleItem}
          .selectedItems=${this.selectedItems}
          @changeSelection=${this.changeSelection}
        ></elements-list>
        <selected-items-array
          .selectedItems=${this.selectedItems}
          @on-delete=${this.onDelete}
        ></selected-items-array>
        <div class="buttons">
          <button @click=${this.handleSave}>Save</button>
          <button @click=${this.handleCancel}>Cancel</button>
        </div>
      </div>
    `;
  }

  toggleItem(event: CustomEvent) {
    const itemId = event.detail;
    this.dispatchEvent(
      new CustomEvent('toggle-item', {
        detail: itemId,
        bubbles: true,
        composed: true,
      })
    );
  }
}

export const Modal = createComponent({
  react: React,
  tagName: 'modal-component',
  elementClass: ModalComponent,
  events: {
    handleSave: 'onSave',
    handleCancel: 'onCancel',
  },
});
