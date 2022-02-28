describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.createUser({
            'blogs': [],
            'username': 'test',
            'name': 'test',
            'password': 'test'
        })
    })

    it('Login form is shown', function () {
        cy.contains('Log in to application')
        cy.get('form').contains('username')
        cy.get('form').contains('password')
        cy.contains('Log in')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('test')
            cy.get('#password').type('test')
            cy.get('#loginButton').click()
            cy.contains('Successfully logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('wrong username')
            cy.get('#password').type('wrong password')
            cy.get('#loginButton').click()
            cy.contains('Wrong credentials')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'test', password: 'test' })
            cy.createBlog({
                'title': 'diff Title',
                'author': 'diff Author',
                'url': 'diff url'
            })
        })

        it('A blog can be created', function () {
            cy.contains('create new').click()
            cy.get('#title').type('test title')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.contains('add').click()

            cy.contains('test title')
            cy.contains('test author')
        })

        it('A user can like a blog', function () {
            cy.contains('Show more').click()
            cy.contains('likes 0').contains('like').click()
            cy.contains('likes 1')
        })

        it('A user can delete their own blog', function () {
            cy.contains('Show more').click()
            cy.contains('Delete').click()
            cy.on('window:confirm', (str) => {
                expect(str).to.equal('Do you want to delete diff Title?')
            })
            cy.on('window:confirm', () => true)

            cy.contains('diff Title').should('not.exist')
            cy.contains('diff Author').should('not.exist')
        })

        it.only('Blogs are sorted by amount of likes', function () {
            cy.createBlog({
                'title': 'diff Title',
                'author': 'diff Author',
                'url': 'diff url',
                'likes': 10
            })
            cy.createBlog({
                'title': 'diff Title',
                'author': 'diff Author',
                'url': 'diff url',
                'likes': 5
            })
            cy.createBlog({
                'title': 'diff Title',
                'author': 'diff Author',
                'url': 'diff url',
                'likes': 15
            })

            const correctLikesTextOrder = ['likes 15', 'likes 10', 'likes 5', 'likes 0']

            cy.get('[id^=showMoreButton]').click({ multiple: true })
            cy.get('.blog').should('have.length', 4).then(blogs => {
                console.log(blogs)
            }).each(($li, index) => {
                cy.wrap($li).should('contain.text', correctLikesTextOrder[index])
            })

        })
    })
})