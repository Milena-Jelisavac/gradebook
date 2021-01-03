/// <reference types="Cypress" />
const Locators = require('../../fixtures/locators.json');
const faker = require('faker');
import { authLogin } from '../../page_objects/login_objects'
let userData = {
    randomFirstName: faker.name.findName(),
    randomLastName: faker.name.lastName(),
    randomImage: faker.image.avatar()

}

describe('Create professor', () => {


    beforeEach("Login", () => {
        cy.visit('/')
        authLogin.login('m@gmail.com', 'Mm123456789')
        cy.get(Locators.Header.Professors).click()
        cy.get(Locators.Header.CreateProfesor).click()

    })


    it("Create profesor without First Name", () => {

        cy.get(Locators.CreateProfesor.LastName).type(userData.randomLastName)
        cy.get(Locators.CreateProfesor.AddImages).click()
        cy.get(Locators.CreateProfesor.ImageURL).type(userData.randomImage)
        cy.get(Locators.CreateProfesor.Submit).click()
        cy.get(Locators.CreateProfesor.FirstName).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
        cy.url().should("eq", "https://gradebook.vivifyideas.com/create-professor")
    })

    it("Create profesor without Last Name", () => {

        cy.get(Locators.CreateProfesor.FirstName).type(userData.randomFirstName)
        cy.get(Locators.CreateProfesor.AddImages).click()
        cy.get(Locators.CreateProfesor.ImageURL).type(userData.randomImage)
        cy.get(Locators.CreateProfesor.Submit).click()
        cy.get(Locators.CreateProfesor.LastName).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
        cy.url().should("eq", "https://gradebook.vivifyideas.com/create-professor")
    })
    it("Create profesor without Image", () => {

        cy.get(Locators.CreateProfesor.FirstName).type(userData.randomFirstName)
        cy.get(Locators.CreateProfesor.LastName).type(userData.randomLastName)
        cy.get(Locators.CreateProfesor.AddImages).click()
        cy.get(Locators.CreateProfesor.Submit).click()
        cy.get(Locators.CreateProfesor.ImageURL).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
        cy.url().should("eq", "https://gradebook.vivifyideas.com/create-professor")
    })

    it("Create profesor - invalid link", () => {
        cy.get(Locators.CreateProfesor.FirstName).type(userData.randomFirstName)
        cy.get(Locators.CreateProfesor.LastName).type(userData.randomLastName)
        cy.get(Locators.CreateProfesor.AddImages).click()
        cy.get(Locators.CreateProfesor.ImageURL).type("ocdn.eu/pulscms-transforms/1/slika")
        cy.get(Locators.CreateProfesor.Submit).click()
        cy.wait(1500)
        cy.url().should("eq", "https://gradebook.vivifyideas.com/create-professor")

    })

    it('Create professor with 256 character in First name', () => {
        cy.get(Locators.CreateProfesor.FirstName).type("oKGxFCARtuaWonyKLmQgbRpazgPXW3d6Uk90TpPN6iYxCg7F4tdSNoBIeGAYrujdB4N2XUKa4idvixv8SpZ61weYEuVpKWArVaMBW76th4ZKgKoyVZQtqwUGOfefJJ3iCEZTRErDxMTIxksrY2dcxLeIb0vDWlSF8sZsVl0zwBqOpBn1dgmMHqPFpIJDsVHs5cjlOzAsb36LV4TLBwFJ0U9lmSrhGuhcZpCi87SUDezvGlBdfBgcArUGJXJGYhD1")
        cy.get(Locators.CreateProfesor.LastName).type(userData.randomLastName)
        cy.get(Locators.CreateProfesor.AddImages).click()
        cy.get(Locators.CreateProfesor.ImageURL).type(userData.randomImage)
        cy.get(Locators.CreateProfesor.Submit).click()
        cy.wait(1500)
        cy.url().should("eq", "https://gradebook.vivifyideas.com/create-professor")
    })
    it('Create professor with 256 character in Last name', () => {
        cy.get(Locators.CreateProfesor.FirstName).type(userData.randomFirstName)
        cy.get(Locators.CreateProfesor.LastName).type("ecw2JER6IRHGkV3Z9pF0nVFdU450sHdST9eb5Mqh1a7ulOZMHsZ1KYRBJG8vJePCJ3U2HwWhs4uP3dvv50MsbDnL0L28KH3r8nRPpFTHTZGgptqeXpnCEWWHObH0WlnTDpiIA2WQIxxTHlqxyqOEKk1cagKaYWEc6jcHdHJTFtUKSP9mg5vz8FVRy3jTnyvn7chNwZAciRvHx9wHXyiNPY2x56XuvkN8pcWrAJvdhQgvGsuhvQn6MRE3zL5Qfnd6")
        cy.get(Locators.CreateProfesor.AddImages).click()
        cy.get(Locators.CreateProfesor.ImageURL).type(userData.randomImage)
        cy.get(Locators.CreateProfesor.Submit).click()
        cy.wait(1500)
        cy.get(Locators.CreateProfesor.LastName).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
        cy.url().should("eq", "https://gradebook.vivifyideas.com/create-professor")
    })
    it("Create professor successful", () => {
        cy.get(Locators.CreateProfesor.FirstName).type(userData.randomFirstName)
        cy.get(Locators.CreateProfesor.LastName).type(userData.randomLastName)
        cy.get(Locators.CreateProfesor.AddImages).click()
        cy.get(Locators.CreateProfesor.ImageURL).type(userData.randomImage)
        cy.get(Locators.CreateProfesor.Submit).click()
        cy.url().should("eq", "https://gradebook.vivifyideas.com/all-professors")
        

    })
    
})      
