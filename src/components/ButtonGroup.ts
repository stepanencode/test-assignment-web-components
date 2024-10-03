import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import React from 'react';
import { createComponent } from '@lit/react';

// import { createComponent } from '@lit-labs/react';

@customElement('button-group')
class ButtonGroupComponent extends LitElement {
  static styles = css`
    .buttons {
      display: flex;
      justify-content: space-between;
    }
    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
    }
    button.save {
      background-color: #4caf50;
      color: white;
    }
    button.cancel {
      background-color: #f44336;
      color: white;
    }
  `;

  render() {
    return html`
      <div class="buttons">
        <button
          class="save"
          @click=${() => this.dispatchEvent(new CustomEvent('save'))}
        >
          Save
        </button>
        <button
          class="cancel"
          @click=${() => this.dispatchEvent(new CustomEvent('cancel'))}
        >
          Cancel
        </button>
      </div>
    `;
  }
}

// Обертка для React
export const ButtonGroup = createComponent({
  react: React,
  tagName: 'button-group',
  elementClass: ButtonGroupComponent,
  events: {
    save: 'onSave',
    cancel: 'onCancel',
  },
});
