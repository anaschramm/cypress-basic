import { faker } from '@faker-js/faker';

Cypress.Commands.add("preencherCamposObrigatoriosEConfirmar", () => {
    cy.get("#firstName").type(faker.name.firstName());
    cy.get("#lastName").type(faker.name.lastName());
    cy.get("#email").type(faker.internet.email());
    cy.get("#open-text-area").type(faker.lorem.lines());
    cy.get("button[type='submit']").click();
 });
