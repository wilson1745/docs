import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/button';
import '@vaadin/radio-group';
import { RadioGroupValueChangedEvent } from '@vaadin/radio-group';
import '@vaadin/vertical-layout';

@customElement('basic-layouts-margin')
export class Example extends LitElement {
  constructor() {
    super();
    this.classList.add('basic-layouts-example');
  }

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private theme!: string;

  render() {
    return html`
      <div class="container">
        <vaadin-vertical-layout theme="${this.theme} spacing padding" style="align-items: stretch">
          <vaadin-button>Button 1</vaadin-button>
          <vaadin-button>Button 2</vaadin-button>
          <vaadin-button>Button 3</vaadin-button>
        </vaadin-vertical-layout>
      </div>
      <vaadin-radio-group
        label="Margin"
        @value-changed="${(e: RadioGroupValueChangedEvent) => (this.theme = e.detail.value)}"
      >
        <vaadin-radio-button value="margin" label="Enabled" checked></vaadin-radio-button>
        <vaadin-radio-button value="" label="Disabled"></vaadin-radio-button>
      </vaadin-radio-group>
    `;
  }
  // end::snippet[]
}
