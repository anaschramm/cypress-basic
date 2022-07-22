/// <reference types="Cypress" />
import { faker } from '@faker-js/faker';

let primeiroNome;
let sobrenome;
let enderecoEmail;
let textoLorem;


describe(" Testes no site CAC TAT", () => {

    beforeEach(() => {
    
    cy.visit("./src/index.html");
    primeiroNome = faker.name.firstName();
    sobrenome = faker.name.lastName();
    enderecoEmail = faker.internet.email();
    textoLorem = faker.lorem.lines();

    });

    it("Verificar o título da aplicação", () => {
        cy.title().should("eq", "Central de Atendimento ao Cliente TAT")
    });

    it("Preencher todos os campos e enviar o formulário", () => {
        cy.get("#firstName").type(primeiroNome);
        cy.get("#lastName").type(sobrenome);
        cy.get("#email").type(enderecoEmail);
        cy.get("#product").select("cursos");
        cy.get("input[type='radio'][value='feedback']").check();
        cy.get("input[type='checkbox']").check();
        cy.get("#phone").type("000000000");
        cy.get("#open-text-area").type(textoLorem);
        cy.get("input[type='file']#file-upload").selectFile("cypress/fixtures/example.json");
        cy.get("button[type='submit']").click();

        cy.contains("Mensagem enviada com sucesso.").should("be.visible");
        cy.get(".success").should("be.visible");
    });

    Cypress._.times(3, () => {
        it("Repetir 3 vezes o teste 'Preenchere enviar o formulário'", () => {
            cy.preencherCamposObrigatoriosEConfirmar();

    
            cy.contains("Mensagem enviada com sucesso.").should("be.visible");
            cy.get(".success").should("be.visible");
            cy.contains("Mensagem enviada com sucesso.").should("not.be.visible");
        });
    });


    it("Preencher todos os campos e enviar e verificar o tempo da mensagem", () => {
        cy.clock();
        cy.preencherCamposObrigatoriosEConfirmar();


        cy.contains("Mensagem enviada com sucesso.").should("be.visible");
        cy.get(".success").should("be.visible");
        cy.tick(3000);
        cy.contains("Mensagem enviada com sucesso.").should("not.be.visible");
    });

    it("Preencher os campos obrigatórios e enviar o formulário", () => {
        cy.get("#firstName").type(primeiroNome);
        cy.get("#lastName").type(sobrenome);
        cy.get("#email").type(enderecoEmail);
        cy.get("#open-text-area").type(textoLorem, { delay: 0 });
        cy.get("button[type='submit']").click();


        cy.contains("Mensagem enviada com sucesso.").should("be.visible");
        cy.get(".success").should("be.visible");
    });

    it("Enviar formulário com email inválido", () => {
        cy.get("#firstName").type(primeiroNome);
        cy.get("#lastName").type(sobrenome);
        cy.get("#email").type("ana@com");
        cy.get("#open-text-area").type(textoLorem);
        cy.get("button[type='submit']").click();
        
        cy.contains("Valide os campos obrigatórios!");
        cy.get(".error").should("be.visible");

    });

    it("Validar valores não númericos no campo telefone ", () => {
        cy.get("#phone").
        type("ana").
        should("have.value", "");

    });

    it("Validar se o campo telefone fica obrigatório", () => {
        cy.get("#phone-checkbox").check();
        cy.get(".phone-label-span").should("be.visible");
    

    });

    it("Enviar telefone vazio quando ele fica obrigatório", () => {
        cy.get("#firstName").type(primeiroNome);
        cy.get("#lastName").type(sobrenome);
        cy.get("#email").type(enderecoEmail);
        cy.get("#phone-checkbox").check();
        cy.get("#open-text-area").type(textoLorem);
        cy.get("button[type='submit']").click();

        cy.contains("Valide os campos obrigatórios!");
        cy.get(".error").should("be.visible");
    });

    it("Enviar formulário sem preencher os campos obrigatórios", () => {
        cy.get("button[type='submit']").click();
        
        cy.contains("Valide os campos obrigatórios!");
        cy.get(".error").should("be.visible");
    });
    
    it("Enviar o formuário  usando um comando customizado", () => {
        cy.preencherCamposObrigatoriosEConfirmar();

        cy.contains("Mensagem enviada com sucesso.").should("be.visible");
        cy.get(".success").should("be.visible");
    });

    it("Selecionar a Opção de produto 'Youtube' por texto", () => {
        cy.get("#product").select("YouTube")
        .should("have.value", "youtube");
    });

    it("Selecionar a Opção de produto 'Mentoria' por value", () => {
        cy.get("#product").select("mentoria")
        .should("have.value", "mentoria");
    });

    it("Selecionar a Opção de produto 'Blog' por indice'", () => {
        cy.get("#product").select(1)
        .should("have.value", "blog");
    });

    it("Marcar o tipo de atendimento 'Feedback'", () => {  
        cy.get("input[type='radio'][value='feedback']").check().should("be.checked");
    });  
    
    it("Marcar o tipo de atendimento 'Feedback'", () => {  
        cy.get("input[type='radio'][value='feedback']").check()
        .should('have.value', 'feedback');
    }); 

    it("Marcar cada botão de atendimento", () => {  
        cy.get("input[type='radio']")
        .should("have.have.length", 3)
        .each(function($radio){
            cy.wrap($radio).check();
            cy.wrap($radio).should("be.checked")
        });
    }); 

    it("Marcar ambos checkboxes, depois desmarcar o último", () => {  
        cy.get("input[type='checkbox']").check().should("be.checked")
        .last().uncheck().should("not.be.checked");
  
    }); 

    it("Realizar upload de um arquivo da pasta fixtures", () => {
        cy.get("input[type='file']#file-upload").should("not.have.value")
        .selectFile("cypress/fixtures/example.json")
        .then(input => {
            expect(input[0].files[0].name).to.equal("example.json");
        }
    )});

    it("Selecionar um arquivo da pasta fixtures simulando um drag-and-drop", () => {
        cy.get("input[type='file']#file-upload").should("not.have.value")
        .selectFile("cypress/fixtures/example.json", { action: "drag-drop"})
        .then(input => {
            expect(input[0].files[0].name).to.equal("example.json");
        }
    )});

    it("Selecionar um arquivo da pasta fixtures para qual foi dada um alias", () => {
        cy.fixture("example.json").as("exampleFile");
        cy.get("input[type='file']#file-upload").selectFile("@exampleFile")
        .then(input => {
            expect(input[0].files[0].name).to.equal("example.json");
        }
    )});

    it("Verificar se a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
        cy.contains("Política de Privacidade").should("have.attr", "target", "_blank");
    });

    it("Verificar se a política de privacidade abre em outra aba clicando no link", () => {
        cy.contains("Política de Privacidade").invoke("removeAttr", "target").click();
        cy.contains("CAC TAT - Política de privacidade").should("be.visible");
    });

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      });

    it("Preencher a area de texto usando o comando invoke", () => {
        const longText = Cypress._.repeat("0123456789", 20);
        cy.get("#open-text-area").invoke("val", longText).should("have.value", longText);
    
      });

      it.only("Fazer uma requisicao HTTP", () => {
        cy.request("https://cac-tat.s3.eu-central-1.amazonaws.com/index.html")
        .should((response) => {
            const { status, statusText, body } = response;
            expect(status).to.equal(200);
            expect(statusText).to.equal("OK");
            expect(body).to.include("CAC TAT");

    });
  });

  describe("Testes na API do CAC TAT", () => {
    beforeEach(() => cy.visit("./src/privacy.html"));

    it("Testar a página da política de privavidade de forma independente", () => {
        cy.contains("CAC TAT - Política de privacidade").should("be.visible");
    });

});
});