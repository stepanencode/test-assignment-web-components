// import { html, css, LitElement } from 'lit';
// import { customElement, property, state } from 'lit/decorators.js';
// import './ElementItem';
// import { createComponent } from '@lit/react';
// import React from 'react';
// import { elementsArray } from '../lib/data';

// @customElement('elements-list')
// export class ElementsListComponent extends LitElement {
//   @property({ type: Array }) selectedItems: number[] = [];
//   @state() private filterValue: string = '';
//   // @state() private items = Array.from({ length: 100 }, (_, i) => i + 1); // Создаем 100 элементов
//   @state() private items = elementsArray;

//   static styles = css`
//     ul {
//       list-style-type: none;
//       padding: 0;
//       max-height: 300px;
//       overflow-y: auto;
//       background: #1f1f1f;
//     }
//     li {
//       display: flex;
//       align-items: center;
//       padding: 0.5rem;
//       border-bottom: 1px solid #444;
//     }
//     input[type='checkbox'] {
//       margin-right: 1rem;
//     }
//     input[type='text'] {
//       margin-bottom: 0.5rem;
//       padding: 0.5rem;
//     }
//     select {
//       margin-left: 1rem;
//       padding: 0.5rem;
//     }
//   `;

//   handleFilterChange(e: Event) {
//     const target = e.target as HTMLInputElement;
//     this.filterValue = target.value;
//   }

//   private handleCheckboxToggle(item: number) {
//     const isSelected = this.selectedItems.includes(item);
//     const updatedSelection = isSelected
//       ? this.selectedItems.filter((i) => i !== item)
//       : [...this.selectedItems, item];
//     this.selectedItems = updatedSelection;
//     this.dispatchEvent(
//       new CustomEvent('changeSelection', { detail: updatedSelection })
//     );
//   }

//   render() {
//     const filteredItems = this.items.filter((item) =>
//       this.filterValue ? item.toString().includes(this.filterValue) : true
//     );

//     return html`
//       <input
//         type="text"
//         placeholder="Search"
//         @input=${this.handleFilterChange}
//         value=${this.filterValue}
//       />
//       <select @change=${this.handleFilterChange}>
//         <option value="">No filter</option>
//         <option value=">10">>10</option>
//         <option value=">100">>100</option>
//         <option value=">200">>200</option>
//       </select>

//       <ul>
//         ${this.items.map(
//           (item) => html`
//             <li>
//               <input
//                 type="checkbox"
//                 ?checked=${this.selectedItems.includes(item)}
//                 @change=${() => this.handleCheckboxToggle(item)}
//               />
//               <span>Element ${item.id}</span>
//             </li>
//           `
//         )}
//       </ul>
//     `;
//   }
// }

// export const ElementsList = createComponent({
//   react: React,
//   tagName: 'elements-list',
//   elementClass: ElementsListComponent,
// });

import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ElementItem from '../types/element.type';
import { createComponent } from '@lit/react';
import React from 'react';

@customElement('elements-list')
export class ElementsListWC extends LitElement {
  static styles = css`
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin: 5px 0;
    }
    label {
      cursor: pointer;
    }
  `;

  @property({ type: Array }) elements: ElementItem[] = [];
  @property({ type: Function }) onToggleItem: (id: number) => void = () => {};

  render() {
    return html`
      <ul>
        ${this.elements.map(
          (element) => html`
            <li>
              <label>
                <input
                  type="checkbox"
                  .checked=${element.isChecked}
                  @change=${() => this.toggleItem(element.id)}
                />
                ${element.name}
              </label>
            </li>
          `
        )}
      </ul>
    `;
  }

  toggleItem(id: number) {
    this.onToggleItem(id);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'elements-list': ElementsListWC;
  }
}

// Создаем React обертку для Lit компонента
export const ElementsList = createComponent({
  react: React,
  tagName: 'elements-list',
  elementClass: ElementsListWC,
});
