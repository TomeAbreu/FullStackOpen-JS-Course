//Create custom command for login
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

//Command custom for logout
Cypress.Commands.add('logout', () => {
  localStorage.removeItem('loggedBlogAppUser')
})

//Command custom for creatinga new user
Cypress.Commands.add('createUser', (user) => {
  cy.request('POST', 'http://localhost:3003/api/users/', user)
})

//Command to add a new blog
Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogAppUser')).token
      }`,
    },
  })

  cy.visit('http://localhost:3000')
})
