/// <reference types="Cypress" />
const Locators = require('../../fixtures/locators.json');
//const faker = require('faker');



describe('login stab', () => {
     
    
    it('Stub login', () => {
        cy.visit('/')
        cy.url().should("contains", "gradebook.vivifyideas")
        cy.get(Locators.SignIn.Email).type('m@gmail.com')
        cy.get(Locators.SignIn.Password).type('Mm123456789')
        cy.get(Locators.SignIn.Login).click()
        cy.intercept('POST', 'https://gradebook-api.vivifyideas.com/api/login',
            { fixture: 'stubUser.json' }
        )
    })
})