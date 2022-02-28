const BlogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const middleware = require('../utils/middleware')
const { uuid } = require('uuidv4');

BlogRouter.get('/', async (request, response) => {
    blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    return response.json(blogs)
})

BlogRouter.post('/', middleware.middlewareExtractor, async (request, response, next) => {
    
    console.log("Accepted request to create blog");
    user = await User.findById(request.user.id)
    const blog = new Blog(request.body)

    blog.user = user.id

    result = await blog.save()
    result = result.toJSON()

    user.blogs = user.blogs.concat(result.id)
    await user.save()

    response.status(201).json(result)    
})

BlogRouter.put('/:id', async (request, response, next) => {

    result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.status(200).json(result)
})

BlogRouter.delete('/:id', middleware.middlewareExtractor, async (request, response, next) => {

    blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === request.user.id) {
        result = await Blog.findByIdAndRemove(request.params.id)
    }
    response.status(204).end()
})

BlogRouter.post('/:id/comments', async (request, response, next) => {
    let blog = await Blog.findById(request.params.id)
    comment = {
        comment: request.body.comment,
        id: uuid()
    }
    blog.comments = blog.comments.concat(comment)
    console.log('blog: ', comment);
    blog.save()
    response.status(200).json(blog)
})

module.exports = BlogRouter
