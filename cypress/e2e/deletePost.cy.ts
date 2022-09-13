export const deletePost = describe('/admin delete post', ()=>{
    it("Visits '/admin', login , click add post, form should be visible, can delete post, cannot see deleted post",()=>{
        cy.visit('/admin')
        cy.get('#emailField').type('alidejando@gmail.com')
        cy.get('#passwordField').type('@TotallyRusty1129')
        cy.get('#signInButton').click()
        cy.get('.post').should('be.visible')
        const deletedPostId = cy.get('.postId').invoke('text').wait(500)
        cy.get('#deletePostButton').click()
        cy.wait(500)
        cy.get('#deletePostConfirm').click()
        cy.wait(3000)
        cy.get('.postId').each(e=>{
            cy.wrap(e).should('not.have.text', deletedPostId)
        })
    })
})