import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement, css } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import './layout-item';

import '@vaadin/vaadin-item';

@customElement('basic-layouts-horizontal-layout')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      vaadin-horizontal-layout {
        border: 1px solid var(--lumo-primary-color);
        border-radius: var(--lumo-border-radius-l);
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-horizontal-layout theme="spacing padding">
        <layout-item>Item 1</layout-item>
        <layout-item>Item 2</layout-item>
        <layout-item>Item 3</layout-item>
        <layout-item>Item 4</layout-item>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}