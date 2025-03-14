import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/avatar';
import '@vaadin/grid';
import { columnBodyRenderer, GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('grid-wrap-cell-content')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  render() {
    return html`
      <vaadin-grid .items="${this.items}" theme="wrap-cell-content">
        <vaadin-grid-column
          header="Image"
          flex-grow="0"
          auto-width
          ${columnBodyRenderer(this.avatarRenderer, [])}
        ></vaadin-grid-column>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column
          header="Address"
          ${columnBodyRenderer(this.addressRenderer, [])}
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  private avatarRenderer: GridColumnBodyLitRenderer<Person> = (person) => html`
    <vaadin-avatar
      img="${person.pictureUrl}"
      name="${person.firstName} ${person.lastName}"
      alt="User avatar"
    ></vaadin-avatar>
  `;

  private addressRenderer: GridColumnBodyLitRenderer<Person> = ({ address }) => html`
    <span>${address.street} ${address.city} ${address.zip} ${address.state}</span>
  `;
}
// end::snippet[]
