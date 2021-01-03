/// <reference types="Cypress" />
const Locators = require('../../fixtures/locators.json')
const faker = require('faker');
import { authLogin } from '../../page_objects/login_objects'

var profesorId = ""
var gradebookId = ""





describe('Primer 4 dan', () => {
    before('Visit gallery app', () => {
        cy.visit('/login')
        authLogin.login('m@gmail.com', 'Mm123456789')
    })


    it("Create professor successful", () => {
        cy.get(Locators.Header.Professors).click()
        cy.get(Locators.Header.CreateProfesor).click()
        cy.get(Locators.CreateProfesor.FirstName).type("Test")
        cy.get(Locators.CreateProfesor.LastName).type("1")
        cy.get(Locators.CreateProfesor.AddImages).click()
        cy.get(Locators.CreateProfesor.ImageURL).type("https://www.espreso.rs/data/images/2017/12/08/15/298425_atila-sabo-cigota_ls.jpg")
        cy.get(Locators.CreateProfesor.Submit).click()
        cy.url().should("eq", "https://gradebook.vivifyideas.com/all-professors")


    })
    
    it('Create gradebook and set Id', () => {
        cy.intercept('POST', 'https://gradebook-api.vivifyideas.com/api/diaries', (req) => {

        }).as('some')

        cy.get(Locators.Header.CreateGradebook).click()
        cy.get(Locators.CreateGradebook.GradebookTitle).type("Knjiga")
        cy.get('#professor').select('Test 1')
        cy.get(Locators.CreateGradebook.Submit).click()
        cy.wait('@some').then((interception) => {
            profesorId = interception.response.body.professor_id
            gradebookId = interception.response.body.id
            
            expect(interception.response.body.title).to.equal("Knjiga")
        })
    })

    it('Finding gradebook on All gradebooks page', () => {
        cy.visit('https://gradebook.vivifyideas.com/gradebooks')
        cy.wait(1000)
        cy.get(Locators.Gradebooks.Filter).focus().type("*Dnevnik")
        cy.get(Locators.Gradebooks.Search).click()
        cy.get('a[href=`/single-gradebook/${gradebookId}`]').click()
        cy.url().should("contains", `/single-gradebook/${gradebookId}`)

    })
    it('Edit gradebook title', () => {
            cy.visit(`https://gradebook.vivifyideas.com/single-gradebook/${gradebookId}`)
            cy.get(Locators.SingleGradebookPage.Edit).click()
            cy.get(Locators.CreateGradebook.GradebookTitle).clear().type('Novi nasov')
            cy.get(Locators.CreateGradebook.Submit).click()
           
        })
    
    it('Dobavljanje gradebooka preko backenda', () => {
            cy.request({
                method: "GET",
                url: `https://gradebook-api.vivifyideas.com/api/diaries/${gradebookId}`,
                
                failOnStatusCode: false
            }).its('body').then((responseBody) => {
                expect(responseBody.title).to.equal("Novi naslov")
                expect(responseBody.id).to.equal(gradebookId)
                expect(responseBody.professor_id).to.equal(profesorId)
                
                })
        })


})


