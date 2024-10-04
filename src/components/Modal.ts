import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createComponent } from '@lit/react';
import { ElementsList } from './ElementsList';
import React from 'react';
import ElementItem from '../types/element.type';

@customElement('modal-component')
class ModalComponent extends LitElement {
  @property({ type: Array }) elements: ElementItem[] = ElementsList;
  @property({ type: Array }) selectedItems: ElementItem[] = [];
  @property({ type: Function }) onSave!: (items: ElementItem[]) => void;
  @property({ type: Function }) onCancel!: () => void;

  static styles = css`
    /* Добавим стили для модального окна */
    .modal {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      background-color: #333;
      color: white;
      border-radius: 8px;
      max-width: 400px;
      margin: 2rem auto;
    }
    .buttons {
      display: flex;
      justify-content: space-between;
    }
  `;

  private changeSelection(event: CustomEvent) {
    this.selectedItems = event.detail;
  }

  private handleSave() {
    this.onSave(this.selectedItems);
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
        <div class="buttons">
          <button @click=${this.handleSave}>Save</button>
          <button @click=${this.onCancel}>Cancel</button>
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
    onCancel: 'onCancel',
  },
});
