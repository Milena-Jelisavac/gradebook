/// <reference types="Cypress" />
const Locators = require('../../fixtures/locators.json');
//const faker = require('faker');

describe('login stab', () => {
    beforeEach("Visit Gradebooks", () => {
        cy.visit('/')
        cy.url().should("contains", "gradebook.vivifyideas")
    })


    it('Stub login', () => {
        cy.get(Locators.SignIn.Email).type('m@gmail.com')
        cy.get(Locators.SignIn.Password).type('Mm123456789')
        cy.get(Locators.SignIn.Login).click()
        cy.intercept('POST', 'https://gradebook-api.vivifyideas.com/api/login',
            { fixture: 'stubUser.json' }
        )
    })

    it("Login with all empty fields", () => {
        cy.get(Locators.Header.SignIn).click()
        cy.get(Locators.SignIn.Login).click()
        cy.get(Locators.SignIn.Email).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
        cy.url().should("contains", "/login")

    })

    it("Login without email", () => {
        cy.get(Locators.Header.SignIn).click()
        cy.get(Locators.SignIn.Password).type('Mm123456789')
        cy.get(Locators.SignIn.Login).click()
        cy.get(Locators.SignIn.Email).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
            cy.url().should("contains", "/login")
        })
    })
    it("Login without password", () => {
        cy.get(Locators.Header.SignIn).click()
        cy.get(Locators.SignIn.Email).type('m@gmail.com')
        cy.get(Locators.SignIn.Login).click()
        cy.get(Locators.SignIn.Password).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
            cy.url().should("contains", "/login")
        })
    })
    it("Login with invalid email-mising @", () => {
        cy.get(Locators.SignIn.Login).click()
        cy.get(Locators.SignIn.Email).type('mgmail.com')
        cy.get(Locators.SignIn.Password).type('Mm123456789')
        cy.get(Locators.SignIn.Login).click()
        cy.get(Locators.SignIn.Email).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please enter valid email.")
            cy.url().should("contains", "/login")
        })
    })

    it("Login with invalid email-mising top part", () => {
        cy.get(Locators.SignIn.Login).click()
        cy.get(Locators.SignIn.Email).type('@gmail.com')
        cy.get(Locators.SignIn.Password).type('Mm123456789')
        cy.get(Locators.SignIn.Login).click()
        cy.get(Locators.SignIn.Email).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please enter valid email.")
            cy.url().should("contains", "/login")
        })
    })
    it("Login with invalid password", () => {
        cy.get(Locators.SignIn.Login).click()
        cy.get(Locators.SignIn.Email).type('m@gmail.com')
        cy.get(Locators.SignIn.Password).type('Mm1234567')
        cy.get(Locators.SignIn.Login).click()
        cy.get(Locators.SignIn.Email).then(($input) => {
            expect($input[0].validationMessage).to.eq("Incorrect password. Please enter valid password.")
            cy.url().should("contains", "/login")
        })
    })
    it("login with valid credentials", () => {
        cy.get(Locators.SignIn.Login).click()
        cy.get(Locators.SignIn.Email).type('m@gmail.com')
        cy.get(Locators.SignIn.Password).type('Mm123456789')
        cy.get(Locators.SignIn.Login).click()
        cy.url().should("contains", "/gradebooks")
    })
})

