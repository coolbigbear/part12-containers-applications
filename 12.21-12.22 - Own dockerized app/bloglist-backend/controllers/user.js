const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    errors = validateUserRequest(body)
    if (errors.length != 0) {
        return response.status(400).json(errors).end()
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })
    
    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1 })
    response.json(users)
})

function validateUserRequest(body) {
    errors = []

    if (!body.hasOwnProperty('username')) {
        errors.push({ error: "username missing"})
    } else if (body.username.length < 3) {
        errors.push({ error: "username must be at least 3 characters long"})
    }

    if (!body.hasOwnProperty('password')) {
        errors.push({ error: "password missing"})
    } else if (body.password.length < 3) {
        errors.push({ error: "password must be at least 3 characters long"})
    }

    return errors
    
}

module.exports = usersRouter