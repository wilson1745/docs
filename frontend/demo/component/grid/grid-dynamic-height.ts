import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/combo-box';
import { ComboBoxValueChangedEvent } from '@vaadin/combo-box';
import '@vaadin/grid';
import { columnBodyRenderer, GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-dynamic-height')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  @state()
  private invitedPeople: Person[] = [];

  @state()
  private selectedValue = '';

  async firstUpdated() {
    const people = (await getPeople()).people.map((person) => {
      return {
        ...person,
        displayName: `${person.firstName} ${person.lastName}`,
      };
    });
    this.items = people;
  }

  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <vaadin-combo-box
          .items="${this.items}"
          .value="${this.selectedValue}"
          @value-changed=${(e: ComboBoxValueChangedEvent) => (this.selectedValue = e.detail.value)}
          item-label-path="displayName"
          item-value-path="id"
          style="flex: 1;"
        ></vaadin-combo-box>
        <vaadin-button
          theme="primary"
          @click="${() => {
            const person = this.items.find((p) => p.id == parseInt(this.selectedValue));
            const isInvited = person && this.invitedPeople.some((p) => p.id === person.id);
            if (person && !isInvited) {
              this.invitedPeople = [...this.invitedPeople, person];
              this.selectedValue = '';
            }
          }}"
          >Send invite</vaadin-button
        >
      </vaadin-horizontal-layout>

      ${this.invitedPeople.length === 0
        ? this.renderNoInvitationAlert()
        : this.renderInvitedPeopleTable()}
    `;
  }

  private manageRenderer: GridColumnBodyLitRenderer<Person> = ({ id }) => html`
    <vaadin-button
      theme="error tertiary icon"
      @click="${() => {
        this.invitedPeople = this.invitedPeople.filter((p) => p.id !== id);
      }}"
    >
      <vaadin-icon icon="vaadin:trash"></vaadin-icon>
    </vaadin-button>
  `;

  private renderNoInvitationAlert = () => {
    return html`
      <div
        style="padding: var(--lumo-size-l);text-align: center;font-style: italic; color: var(--lumo-contrast-70pct);"
      >
        No invitation has been sent
      </div>
    `;
  };

  private renderInvitedPeopleTable = () => {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid .items="${this.invitedPeople}" all-rows-visible>
        <vaadin-grid-column header="Name" path="displayName" auto-width></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
        <vaadin-grid-column path="address.phone"></vaadin-grid-column>
        <vaadin-grid-column
          header="Manage"
          ${columnBodyRenderer(this.manageRenderer, [])}
        ></vaadin-grid-column>
      </vaadin-grid>
      <!-- end::snippet[] -->
    `;
  };
}
