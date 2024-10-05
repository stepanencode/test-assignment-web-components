import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ElementItem from '../types/element.type';
import { createComponent } from '@lit/react';
import React from 'react';

@customElement('elements-list')
export class ElementsListWC extends LitElement {
  static styles = css`
    label {
      cursor: pointer;
    }

    input[type='checkbox']:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .items-list {
      overflow-y: auto;
      height: 200px;
      list-style-type: none;
      padding: 5px 20px;
      background-color: black;
      margin: 0;
    }

    .item {
      margin: 7px 0;
    }
  `;

  @property({ type: Array }) elements: ElementItem[] = [];
  @property({ type: Function }) onToggleItem: (id: number) => void = () => {};
  @property({ type: Array }) selectedItems: ElementItem[] = [];

  render() {
    return html`
      <ul class="items-list">
        ${this.elements.map(
          (element) => html`
            <li class="item">
              <label>
                <input
                  type="checkbox"
                  .checked=${this.selectedItems.some(
                    (el) => el.id === element.id
                  )}
                  ?disabled=${!this.selectedItems.some(
                    (el) => el.id === element.id
                  ) && this.selectedItems.length >= 3}
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

  private toggleItem(item: number) {
    const isSelected = this.selectedItems.find((el) => el.id === item);
    const updatedSelection = isSelected
      ? this.selectedItems.filter((i) => i.id !== item)
      : [
          ...this.selectedItems,
          { id: item, name: 'Element ' + item, isChecked: true },
        ];
    if (updatedSelection.length <= 3) {
      this.selectedItems = updatedSelection;
    } else {
      return;
    }
    console.log(updatedSelection, 'updatedSelection2');
    this.dispatchEvent(
      new CustomEvent('changeSelection', { detail: updatedSelection })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'elements-list': ElementsListWC;
  }
}

export const ElementsList = createComponent({
  react: React,
  tagName: 'elements-list',
  elementClass: ElementsListWC,
});
