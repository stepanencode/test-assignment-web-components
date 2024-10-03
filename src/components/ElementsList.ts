import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './ElementItem';
import { createComponent } from '@lit/react';
import React from 'react';

@customElement('elements-list')
export class ElementsListComponent extends LitElement {
  @property({ type: Array }) selectedItems: number[] = [];
  @state() private filterValue: string = '';
  @state() private items = Array.from({ length: 100 }, (_, i) => i + 1); // Создаем 100 элементов

  static styles = css`
    ul {
      list-style-type: none;
      padding: 0;
      max-height: 300px;
      overflow-y: auto;
      background: #1f1f1f;
    }
    li {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      border-bottom: 1px solid #444;
    }
    input[type='checkbox'] {
      margin-right: 1rem;
    }
    input[type='text'] {
      margin-bottom: 0.5rem;
      padding: 0.5rem;
    }
    select {
      margin-left: 1rem;
      padding: 0.5rem;
    }
  `;

  handleFilterChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.filterValue = target.value;
  }

  private handleCheckboxToggle(item: number) {
    const isSelected = this.selectedItems.includes(item);
    const updatedSelection = isSelected
      ? this.selectedItems.filter((i) => i !== item)
      : [...this.selectedItems, item];
    this.selectedItems = updatedSelection;
    this.dispatchEvent(
      new CustomEvent('changeSelection', { detail: updatedSelection })
    );
  }

  render() {
    const filteredItems = this.items.filter((item) =>
      this.filterValue ? item.toString().includes(this.filterValue) : true
    );

    return html`
      <input
        type="text"
        placeholder="Search"
        @input=${this.handleFilterChange}
        value=${this.filterValue}
      />
      <select @change=${this.handleFilterChange}>
        <option value="">No filter</option>
        <option value=">10">>10</option>
        <option value=">100">>100</option>
        <option value=">200">>200</option>
      </select>

      <ul>
        ${filteredItems.map(
          (item) => html`
            <li>
              <input
                type="checkbox"
                ?checked=${this.selectedItems.includes(item)}
                @change=${() => this.handleCheckboxToggle(item)}
              />
              <span>Element ${item}</span>
            </li>
          `
        )}
      </ul>
    `;
  }
}

export const ElementsList = createComponent({
  react: React,
  tagName: 'elements-list',
  elementClass: ElementsListComponent,
});
