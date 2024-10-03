import { createComponent } from '@lit/react';
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import React from 'react';

@customElement('element-item')
export class ElementItemComponent extends LitElement {
  @property({ type: Boolean }) isSelected = false;
  @property({ type: Number }) id!: number;

  static styles = css`
    li {
      display: flex;
      align-items: center;
    }
    input[type='checkbox'] {
      margin-right: 1rem;
    }
  `;

  render() {
    return html`
      <li>
        <input type="checkbox" ?checked=${this.isSelected} />
        <span>Element ${this.id}</span>
      </li>
    `;
  }
}

export const ElementsList = createComponent({
  react: React,
  tagName: 'element-item',
  elementClass: ElementItemComponent,
});
