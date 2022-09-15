export const admin = describe('/admin', ()=>{
    it("Visits '/admin', login , can see posts, can click and visit '/aboutme",()=>{
        cy.visit('/admin')
        cy.get('#emailField').type('')
        cy.get('#passwordField').type('')
        cy.get('#signInButton').click()
        cy.get('.post').should('be.visible')
        cy.get('#addPostButton').should('be.visible')
        cy.get('#headerAboutMe').click()
        cy.location('pathname').should('eq', '/aboutme')
    })
})