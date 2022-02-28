const Blog = require('../models/Blog')
const User = require('../models/User')

const initialBlogs = [
    {
        title: "WOW1",
        author: "A1",
        url: "URL1",
        likes: 1
    },
    {
        title: "WOW2",
        author: "A2",
        url: "URL2",
        likes: 2
    },
    {
        title: "WOW3",
        author: "A3",
        url: "URL3",
        likes: 3
    }
]

const nonExistingId = async () => {
    const blog = new Blog({
        title: "missingIDblog",
        author: "missingIDblogAuthor",
        url: "missingIDblogURL"
    })
    await blog.save()
    await blog.remove()
    
    return blog.id.toString()
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}