const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcryptjs')
const User = require('../models/User')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('superSecret', 10)
        const user = new User({ username: 'testUsername1', name: 'testName1', passwordHash })
        
        await User.create(user)
    }, 110000)

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'testUsername2',
            name: 'testName2',
            password: 'testUserPassword2',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('Creating a user that already exists fails with appropriate message', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = { username: 'testUsername1', name: 'testName1', password: 'password' }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/) 

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('Adding a user with too short password fails with appropriate message', async () => {
        const usersAtStart = await helper.usersInDb()
        
        const newUser = {
            username: 'testUsername4',
            name: 'testName3',
            password: 'o',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('Adding a user with too short username fails with appropriate message', async () => {
        const usersAtStart = await helper.usersInDb()
        
        const newUser = {
            username: 'o',
            name: 'testName4',
            password: 'verylongpassword',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('Adding a user with no username fails with appropriate message', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'testName5',
            password: 'verylongpassword',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('Adding a user with no password fails with appropriate message', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'testUsername6',
            name: 'testName6'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})