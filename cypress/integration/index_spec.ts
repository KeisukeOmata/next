describe('タイトルのテスト', () => {
  it('タイトルが「e-commerce」である', () => {
    cy.visit('/')
    cy.title().should('include', 'e-commerce')
  })
})

export {}
