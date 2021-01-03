/// <reference types="Cypress" />
const Locators = require('../../fixtures/locators.json');
const faker = require('faker');
import { authLogin } from '../../page_objects/login_objects'
var userId = ""


describe("Checking header button names and url", () => {

    it('Layout - unsingin user', () => {
        cy.visit('https://gradebook.vivifyideas.com/')
        cy.get(Locators.Header.SignIn).should('have.text', 'Login').click()
        cy.url().should("contains", "/login")
        cy.get(Locators.Header.Register).should('have.text', 'Register').click()
        cy.url().should("contains", "/register")

    })

    it('Get user Id', () => {
        cy.request({
            method: 'POST',
            url: 'https://gradebook-api.vivifyideas.com/api/login',
            body: {
                email: 'm@gmail.com',
                password: 'Mm123456789'
            }
        }).its('body').then((response) => {

            window.localStorage.setItem('userId', response.user.id)
            userId = response.user.id
            cy.log(userId)
        })
    })



    it('Login', () => {
        cy.visit('https://gradebook.vivifyideas.com/')
        cy.get(Locators.SignIn.Email).type('m@gmail.com')
        cy.get(Locators.SignIn.Password).type('Mm123456789')
        cy.get(Locators.SignIn.Login).click()

    })
    it('Layout sining user - Gradebooks button and url', () => {

        cy.get(Locators.Header.Gradebooks).should('have.text', 'Gradebooks').click()
        cy.url().should("contains", "/gradebooks")

    })

    it("Layout sining user - My Gradebook url", () => {
        cy.contains('My Gradebook').should('be.visible').click()
        cy.url().should("contains", `/my-gradebook/${userId}`)

    })

    it('Layout sining user - Create gradebook button and url', () => {
        cy.get(Locators.Header.CreateGradebook).click()
        cy.get(Locators.Header.CreateGradebook).should('have.text', 'Add Gradebook').click()
        cy.url().should("contains", "/gradebooks/create")
    })

    it('Layout sining user - ALL profesors button and url', () => {
        cy.get(Locators.Header.Professors).click()
        cy.get(Locators.Header.AllProfessors).should('have.text', 'All Professors').click()
        cy.url().should("contains", "/teachers")
    })
    it('Layout sining user - Create professors button and url', () => {
        cy.get(Locators.Header.Professors).click()
        cy.get(Locators.Header.CreateProfesor).should('have.text', 'Add Professor').click()
        cy.url().should("contains", "/professors/create")
    })
    it('Layout sining user - ALL profesors button and url', () => {
        cy.get(Locators.Header.SingOut).should('have.text', 'Logout').click()
        cy.url().should("contains", "/login")
    })

})
