import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createComponent } from '@lit/react';
import React from 'react';
import ElementItem from '../types/element.type';
import './SelectedItemsArray';
import './ElementsList';
import './SearchableList';
import './Filter';

@customElement('modal-component')
class ModalComponent extends LitElement {
  static styles = css`
    .modal {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      background-color: #333;
      color: white;
      border-radius: 8px;
      width: 500px;
      max-height: 400px;
      margin: 2rem auto;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }

    .modal h3 {
      margin: 0;
    }

    .buttons {
      display: flex;
      justify-content: flex-start;
    }

    .save-button {
      background: #0da846;
      padding: 10px;
      width: 75px;
      border: none;
      border-radius: 5px;
      color: white;
      font-size: 14px;
      cursor: pointer;
      margin-right: 10px;
    }

    .save-button:hover {
      background: #0a913c;
    }

    .cancel-button {
      background: #c70e14;
      width: 75px;
      padding: 10px;
      border: none;
      border-radius: 5px;
      color: white;
      font-size: 14px;
      cursor: pointer;
      margin-right: 10px;
    }

    .header-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .cancel-button:hover {
      background: red;
    }

    .close-button {
      background: none;
      border: none;
      color: white;
      font-size: 14px;
      cursor: pointer;
    }

    .close-button:hover {
      color: red;
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

  @property({ type: Array }) elements: ElementItem[] = [];
  @property({ type: Array }) filteredItems: ElementItem[] = [];
  @property({ type: Function }) setFilteredItems!: (
    filteredItems: ElementItem[]
  ) => void;
  @property({ type: Array }) selectedItems: ElementItem[] = [];
  @property({ type: Function }) onSave!: (items: ElementItem[]) => void;
  @property({ type: Function }) onCancel!: () => void;

  private changeSelection(event: CustomEvent) {
    this.selectedItems = event.detail;
  }

  private searchResult(event: CustomEvent) {
    this.searchValue = event.detail;
    this.filterAndSearch();
  }

  private filterResult(event: CustomEvent) {
    this.filterValue = event.detail;
    this.filterAndSearch();
  }

  private filterValue = '';
  private searchValue = '';

  private filterAndSearch() {
    const newFilteredElements = this.elements.filter((item) => {
      const digit = item.name.match(/Element\s+(\d+)/i)?.[1] || '';
      return +digit >= +this.filterValue;
    });
    const newSearchedElements = newFilteredElements.filter((item) => {
      return item.name.toLowerCase().includes(this.searchValue.toLowerCase());
    });
    this.setFilteredItems(newSearchedElements);
  }

  private handleSave() {
    this.onSave(this.selectedItems);
    this.filterValue = '';
    this.searchValue = '';
    this.setFilteredItems(this.elements);
  }

  private handleCancel() {
    this.selectedItems = [];
    this.onCancel();
    this.filterValue = '';
    this.searchValue = '';
    this.setFilteredItems(this.elements);
  }

  render() {
    return html`
      <div class="overlay" @click=${this.onCancel}></div>
      <div class="modal">
        <span class="header-container">
          <h3>Select Items</h3>
          <button class="close-button" @click=${this.onCancel}>x</button>
        </span>
        <searchable-list @search=${this.searchResult}></searchable-list>
        <filter-elements
          @selection-changed=${this.filterResult}
        ></filter-elements>
        <elements-list
          .elements=${this.elements}
          .selectedItems=${this.selectedItems}
          @changeSelection=${this.changeSelection}
          .filteredItems=${this.filteredItems}
        ></elements-list>
        <selected-items-array
          .selectedItems=${this.selectedItems}
          @changeSelection=${this.changeSelection}
        ></selected-items-array>
        <div class="button-container">
          <button class="save-button" @click=${this.handleSave}>Save</button>
          <button class="cancel-button" @click=${this.handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    `;
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
