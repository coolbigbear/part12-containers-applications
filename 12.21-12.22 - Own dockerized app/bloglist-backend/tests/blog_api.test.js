const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

let token = null

beforeEach(async () => {
    const user = { username: 'testUsername1', name: 'testName1', password: 'superSecret'}
    const passwordHash = await bcrypt.hash(user.password, 10)
    const mongoUser = new User({ username: user.username, name: user.name, passwordHash })
    
    await User.deleteMany({})
    await User.create(mongoUser)

    response = await api.post('/api/login').send(user)
    token = 'bearer ' + response.body.token

    await Blog.deleteMany({})
    for (let index = 0; index < helper.initialBlogs.length; index++) {
        const element = helper.initialBlogs[index];
        await api.post('/api/blogs').set('Authorization', token).send(element).expect(201)
    }

})

describe('when database contains prefilled data', () => {

    test('correct number of blogs is returned', async () => {
        const response = await api.get('/api/blogs').set('Authorization', token).expect(200)

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('add a new blog and make sure it is saved correctly', async () => {
        // Create new note
        blog = {title:"newTitle", author:"newAuthor", url:"newURL", likes: 4}
        response = await api.post('/api/blogs')
            .set('Authorization', token)
            .send(blog)
            .expect(201)
        
        newBlogID = response.body.id
        blog.id = newBlogID

        //Check if note is the same as the one sent
        response = await api.get(`/api/blogs`).set('Authorization', token).expect(200)
        expected = response.body[helper.initialBlogs.length]

        expect(expected.author).toEqual(blog.author)
        expect(expected.id).toEqual(blog.id)
        expect(expected.likes).toEqual(blog.likes)
        expect(expected.title).toEqual(blog.title)
        expect(expected.url).toEqual(blog.url)
    })

    test('note uses "id" instead of "_id"', async () => {
        const response = await api.get('/api/blogs').set('Authorization', token)
        expect(response.body[0].id).toBeDefined()
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('if likes property is missing from POST request it will default to 0', async () => {
        blog = { title: "newTitle", author: "newAuthor", url: "newURL" }
        response = await api.post('/api/blogs').set('Authorization', token).send(blog)
        
        //Check if note is the same as the one sent
        response = await api.get(`/api/blogs`).set('Authorization', token).expect(200)
        expect(response.body[helper.initialBlogs.length].likes).toEqual(0)
    })
    
    test('if title or url is missing from POST request it will return 400', async () => {
        blog = { author: "newAuthor", likes: 5 }
        response = await api.post('/api/blogs').set('Authorization', token).send(blog).expect(400)
    })

    test('removing a note works', async () => {
        response = await api.get(`/api/blogs`).set('Authorization', token).expect(200)
        response = await api.delete(`/api/blogs/${response.body[0].id}`).set('Authorization', token).expect(204)
        
        response = await api.get(`/api/blogs`).set('Authorization', token).expect(200)
        // console.log(response)
        expect(response.body.length).toEqual(helper.initialBlogs.length - 1)
    })
    
    test('updating a note works', async () => {
        blog = { title: "updatedTitle", author: "updatedAuthor", url: "updatedURL", likes: 1 }

        response = await api.get(`/api/blogs`).set('Authorization', token).expect(200)
        response = await api.put(`/api/blogs/${response.body[0].id}`).set('Authorization', token).send(blog).expect(200)
        blog.id = response.body.id

        response = await api.get(`/api/blogs`).set('Authorization', token).expect(200)
        expected = helper.initialBlogs[0]

        expect(expected.author).toEqual(blog.author)
        expect(response.body[0].id).toEqual(blog.id)
        expect(expected.likes).toEqual(blog.likes)
        expect(expected.title).toEqual(blog.title)
        expect(expected.url).toEqual(blog.url)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})