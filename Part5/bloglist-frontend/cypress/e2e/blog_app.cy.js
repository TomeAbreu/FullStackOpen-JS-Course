describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'motu',
      name: 'Master of the Universe',
      password: 'motu',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.visit('http://localhost:3000')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', () => {
      cy.contains('login').click()
      cy.get('#username').type('motu')
      cy.get('#password').type('motu')
      cy.get('#login-button').click()
      cy.contains('motu is logged in')
    })
    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('motu')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong user credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'motu is logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'motu', password: 'motu' })
      cy.contains('motu is logged in')
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#blogTitle').type('blog title')
      cy.get('#blogAuthor').type('blog author')
      cy.get('#blogUrl').type('blog url')
      cy.contains('create').click()
      cy.get('.blog').should('contain', 'blog title')
    })
    describe('a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'blog title',
          author: 'blog author',
          url: 'http://blog.com',
          likes: 10,
        })
      })

      it('User can like a blog', function () {
        cy.contains('view').click()
        cy.contains('like').click()
      })

      it('User that created the blog can deleted it', function () {
        cy.contains('view').click()
        cy.contains('Delete').click()
      })

      it('Not possible to delete blog created from other user', function () {
        cy.logout()
        const user = {
          username: 'tome',
          name: 'Tome Abreu',
          password: '123',
        }
        cy.createUser(user)
        cy.login({ username: 'tome', password: '123' })
        cy.contains('view').click()
        cy.contains('Delete').should('not.exist')
      })
    })
    describe('two blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'blog title',
          author: 'blog author',
          url: 'http://blog.com',
          likes: 10,
        })
        cy.createBlog({
          title: 'blog title2',
          author: 'blog author2',
          url: 'http://blog2.com',
          likes: 20,
        })
      })

      it('Blogs are ordered by number of likes', function () {
        cy.get('.blog').eq(0).should('contain', 'blog title2')
        cy.get('.blog').eq(1).should('contain', 'blog title')
      })
    })
  })
})
