export const index = describe('/', ()=>{
    it("Visits '/' , cannot click own header, can see posts, can click and visit '/aboutme",()=>{
        cy.visit('/')
        cy.get('#headerProjects').should('contain.text', 'Projects').should('be.disabled')
        cy.get('.post').should('be.visible')
        cy.get('#headerAboutMe').click()
        cy.location('pathname').should('eq', '/aboutme')
    })
})

export const aboutMe = describe('/aboutme', ()=>{
    it("Visits '/about' , cannot click own header, can see item, click svg icons, click and visit '/'", ()=>{
        cy.get('.mantine-Timeline-item').should('be.visible')
        cy.get('.linkIcon').each((e)=>{
            cy.wrap(e).click()
        })
        cy.get('#headerProjects').click()
        cy.location('pathname').should('eq', '/')
    })
})
