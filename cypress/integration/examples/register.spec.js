/// <reference types="Cypress" />
const Locators = require('../../fixtures/locators.json');
const faker = require('faker');

let userData = {
    randomFirstName: faker.name.findName(),
    randomLastName: faker.name.lastName(),
    randomPassword: faker.internet.password(8) + "1",
    randomEmail: faker.internet.email()

}



describe("Registracija", () => {

    beforeEach("Visit url", () => {
        cy.visit("/")
        cy.url().should("contains", "gradebook.vivifyideas")


    })

    it("Register without first name", () => {

        cy.get(Locators.Header.Register).click()
        cy.get(Locators.Register.LastName).type(userData.randomLastName)
        cy.get(Locators.Register.Password).type(userData.randomPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(userData.randomPassword)
        cy.get(Locators.Register.Email).type(userData.randomEmail)
        cy.get(Locators.Register.TermsAndConditions).check()
        cy.get(Locators.Register.Submit).click()
        cy.wait(1000)
        cy.get(Locators.Register.FirstName).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")

        })

    })
    it("Register without last name", () => {
        cy.get(Locators.Header.Register).click()
        cy.get(Locators.Register.FirstName).type(userData.randomFirstName)
        cy.get(Locators.Register.Password).type(userData.randomPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(userData.randomPassword)
        cy.get(Locators.Register.Email).type(userData.randomEmail)
        cy.get(Locators.Register.TermsAndConditions).check()
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.LastName).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
            cy.url().should('contains', 'https://gradebook.vivifyideas.com/register')
        })

    })
    it("Register without password and confirmed password", () => {
        cy.get(Locators.Header.Register).click()
        cy.get(Locators.Register.FirstName).type(userData.randomFirstName)
        cy.get(Locators.Register.LastName).type(userData.randomLastName)
        cy.get(Locators.Register.Email).type(userData.randomEmail)
        cy.get(Locators.Register.TermsAndConditions).check()
        cy.get(Locators.Register.Submit).click()
        cy.wait(1000)
        cy.url().should('contains', 'https://gradebook.vivifyideas.com/register')

    })
    it("Register, pasword and confirmed password not matching", () => {
        cy.get(Locators.Header.Register).click()
        cy.get(Locators.Register.FirstName).type(userData.randomFirstName)
        cy.get(Locators.Register.LastName).type(userData.randomLastName)
        cy.get(Locators.Register.Password).type(userData.randomPassword)
        cy.get(Locators.Register.Email).type(userData.randomEmail)
        cy.get(Locators.Register.TermsAndConditions).check()
        cy.get(Locators.Register.Submit).click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal("Your passwords doesn`t match, try again, please")
            cy.url().should('contains', 'https://gradebook.vivifyideas.com/register')
        })

    })

    it("Registration without terms and condition check", () => {

        cy.get(Locators.Header.Register).click()
        cy.get(Locators.Register.FirstName).type(userData.randomFirstName)
        cy.get(Locators.Register.LastName).type(userData.randomLastName)
        cy.get(Locators.Register.Password).type(userData.randomPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(userData.randomPassword)
        cy.get(Locators.Register.Email).type(userData.randomEmail)
        cy.get(Locators.Register.TermsAndConditions).uncheck()
        cy.get(Locators.Register.Submit).click()
        cy.url().should('contains', 'https://gradebook.vivifyideas.com/register')
    })
    it("Registration with to short password", () => {

        cy.get(Locators.Header.Register).click()
        cy.get(Locators.Register.FirstName).type(userData.randomFirstName)
        cy.get(Locators.Register.LastName).type(userData.randomLastName)
        cy.get(Locators.Register.Password).type("tes1")
        cy.get(Locators.Register.PasswordConfirmation).type("tes1")
        cy.get(Locators.Register.Email).type(userData.randomEmail)
        cy.get(Locators.Register.TermsAndConditions).check()
        cy.get(Locators.Register.Submit).click()
        cy.url().should('include', '/register')
        cy.get(Locators.Register.Password).then(($input) => {
            expect($input[0].validationMessage).to.equal("Please match requested form.Must contain at least one number, and at least 8 or more characters")
            cy.url().should('contains', 'https://gradebook.vivifyideas.com/register')
        })
    })
    it("Registration with to password with no number", () => {

        cy.get(Locators.Header.Register).click()
        cy.get(Locators.Register.FirstName).type(userData.randomFirstName)
        cy.get(Locators.Register.LastName).type(userData.randomLastName)
        cy.get(Locators.Register.Password).type("novalozinka")
        cy.get(Locators.Register.PasswordConfirmation).type("novalozinka")
        cy.get(Locators.Register.Email).type(userData.randomEmail)
        cy.get(Locators.Register.TermsAndConditions).uncheck()
        cy.get(Locators.Register.Submit).click()
        cy.url().should('contains', 'https://gradebook.vivifyideas.com/register')
    })
    it("Register with 256 characters in first name", () => {

        cy.get(Locators.Header.Register).click()
        cy.get(Locators.Register.FirstName).type("FtDNk8FDAPO7AJpRKBnhNU5j0cmeCPVlK0CH14pAGALoIyI6Ry5lD1p3RjPG6uiYqviuvXmaQ4UDxjnVy5FMcovkIn095kXiUaWtzRY82iaQoP76vqaB5P7OCsvIA8A5ToblAoOxj8zJzHbJpsETZr1gAN0u6DlF86uU0zcVBenI1I0Wx84fvL10D8YP91soUA6fOUFlOoX8d2Fw0XXlgwE0abYJZL6mjsgzVUoJdjCVp69HTGEYrDBDD76mpHP5")
        cy.get(Locators.Register.LastName).type(userData.randomLastName)
        cy.get(Locators.Register.Password).type(userData.randomPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(userData.randomPassword)
        cy.get(Locators.Register.Email).type(userData.randomEmail)
        cy.get(Locators.Register.TermsAndConditions).check()
        cy.get(Locators.Register.Submit).click()
        cy.wait(500)
        cy.get(Locators.Register.FirstName).then(($input) => {
            expect($input[0].validationMessage).to.eq("First name is to long. It can have max 255 characters.")
        })
        cy.url().should('contains', 'https://gradebook.vivifyideas.com/register')
    })
    it("Register with 256 characters in last name", () => {

        cy.get(Locators.Header.Register).click()
        cy.get(Locators.Register.FirstName).type(userData.randomFirstName)
        cy.get(Locators.Register.LastName).type("FtDNk8FDAPO7AJpRKBnhNU5j0cmeCPVlK0CH14pAGALoIyI6Ry5lD1p3RjPG6uiYqviuvXmaQ4UDxjnVy5FMcovkIn095kXiUaWtzRY82iaQoP76vqaB5P7OCsvIA8A5ToblAoOxj8zJzHbJpsETZr1gAN0u6DlF86uU0zcVBenI1I0Wx84fvL10D8YP91soUA6fOUFlOoX8d2Fw0XXlgwE0abYJZL6mjsgzVUoJdjCVp69HTGEYrDBDD76mpHP5")
        cy.get(Locators.Register.Password).type(userData.randomPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(userData.randomPassword)
        cy.get(Locators.Register.Email).type(userData.randomEmail)
        cy.get(Locators.Register.TermsAndConditions).check()
        cy.get(Locators.Register.Submit).click()
        cy.wait(500)
        cy.get(Locators.Register.LastName).then(($input) => {
            expect($input[0].validationMessage).to.eq("Last name is to long. It can have max 255 characters.")
        })
        cy.url().should('contains', 'https://gradebook.vivifyideas.com/register')
    })

    it("Register with email mising @", () => {
        cy.get(Locators.Header.Register).click()
        cy.get(Locators.Register.FirstName).type(userData.randomFirstName)
        cy.get(Locators.Register.LastName).type(userData.randomLastName)
        cy.get(Locators.Register.Password).type(userData.randomPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(userData.randomPassword)
        cy.get(Locators.Register.Email).type("primer.com")
        cy.get(Locators.Register.TermsAndConditions).check()
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.Email).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please include an '@' in the email address. 'primer.com' is missing an '@'.")
        })
        cy.url().should('contains', 'https://gradebook.vivifyideas.com/register')
    })
    it("Register with email mising .", () => {
        cy.get(Locators.Header.Register).click()
        cy.get(Locators.Register.FirstName).type(userData.randomFirstName)
        cy.get(Locators.Register.LastName).type(userData.randomLastName)
        cy.get(Locators.Register.Password).type(userData.randomPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(userData.randomPassword)
        cy.get(Locators.Register.Email).type("primerbeztacke@com")
        cy.get(Locators.Register.TermsAndConditions).check()
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.Email).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please include an '.' in the email address. 'primer@com' is missing an '@'.")
        })
        cy.url().should('contains', 'https://gradebook.vivifyideas.com/register')
    })
    it("Register with email mising top part", () => {
        cy.get(Locators.Header.Register).click()
        cy.get(Locators.Register.FirstName).type(userData.randomFirstName)
        cy.get(Locators.Register.LastName).type(userData.randomLastName)
        cy.get(Locators.Register.Password).type(userData.randomPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(userData.randomPassword)
        cy.get(Locators.Register.Email).type("@.com")
        cy.get(Locators.Register.TermsAndConditions).check()
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.Email).then(($input) => {
            expect($input[0].validationMessage).to.eq("Please enter a part followed by '@'. '@.com' is incomplete.")
        })
        cy.url().should('contains', 'https://gradebook.vivifyideas.com/register')
    })

    it("Registration with valid credentials", () => {

        cy.get(Locators.Header.Register).click()
        cy.get(Locators.Register.FirstName).type(userData.randomFirstName)
        cy.get(Locators.Register.LastName).type(userData.randomLastName)
        cy.get(Locators.Register.Password).type(userData.randomPassword)
        cy.get(Locators.Register.PasswordConfirmation).type(userData.randomPassword)
        cy.get(Locators.Register.Email).type(userData.randomEmail)
        cy.get(Locators.Register.TermsAndConditions).check()
        cy.get(Locators.Register.Submit).click
        cy.url().should("contains", "/gradebooks")
    })
})