import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createComponent } from '@lit/react';
// import { createComponent } from '@lit-labs/react';
// import { ElementsList } from './ElementSelector';
import { ElementsList } from './ElementsList'; // Импортируем ElementsList
// import ElementItem from '../types/elements.type';
import React from 'react';

// import { elementsArray } from '../lib/data';
// import { ElementItem } from './ElementItem';

@customElement('modal-component')
class ModalComponent extends LitElement {
  //   @property({ type: Array }) selectedItems: number[] = [];
  //   @property({ type: Function }) onSave!: (items: number[]) => void;
  //   @property({ type: Function }) onCancel!: () => void;

  @property({ type: Array }) elements: ElementItem[] = ElementsList;
  //   @property({ type: Function }) onSave!: () => void;
  //   @property({ type: Function }) onCancel!: () => void;

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

  render() {
    return html`
      <div class="modal">
        <h2>Select items</h2>
        <elements-list></elements-list>
      </div>
    `;
  }

  //   private handleSave() {
  //     this.onSave(this.selectedItems);
  //   }

  //   render() {
  //     return html`
  //       <div class="overlay" @click=${this.onCancel}></div>
  //       <div class="modal">
  //         <h2>Select Items</h2>
  //         <elements-list
  //           .elements=${this.elements}
  //           @toggle-item=${this.toggleItem}
  //         ></elements-list>
  //         <div>
  //         //   <button @click=${this.onSave}>Save</button>
  //         //   <button @click=${this.onCancel}>Cancel</button>
  //         </div>
  //       </div>
  //     `;
  //   }

  //   toggleItem(event: CustomEvent) {
  //     const itemId = event.detail;
  //     this.dispatchEvent(
  //       new CustomEvent('toggle-item', {
  //         detail: itemId,
  //         bubbles: true,
  //         composed: true,
  //       })
  //     );
  //   }

  //   render() {
  //     return html`
  //       <div class="modal">
  //         <h2>Select items</h2>
  //         <elements-list
  //           .selectedItems=${this.selectedItems}
  //           @changeSelection=${(e: CustomEvent) =>
  //             (this.selectedItems = e.detail)}
  //         ></elements-list>

  //         <div class="buttons">
  //           <button @click=${this.handleSave}>Save</button>
  //           <button @click=${this.onCancel}>Cancel</button>
  //         </div>
  //       </div>
  //     `;
  //   }

  //   function handleToggleItem(id: number) {
  //     setElements((prevElements) =>
  //       prevElements.map((element) =>
  //         element.id === id
  //           ? { ...element, isChecked: !element.isChecked }
  //           : element
  //       )
  //     );
  //   }

  //   return (
  //     <div>
  //       <h1>Element Selector</h1>
  //       <ElementsList elements={elements} onToggleItem={handleToggleItem} />
  //     </div>
  //   );
}

// Обертка для использования модального окна в React
export const Modal = createComponent({
  react: React,
  tagName: 'modal-component',
  elementClass: ModalComponent,
  //   events: {
  //     onSave: 'onSave',
  //     onCancel: 'onCancel',
  //   },
});
