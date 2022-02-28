var _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    total = 0
    blogs.forEach(element => {
        total += element.likes
    });
    return total
}

const favouriteBlog = (blogs) => {
    mostFavouriteBlog = {}

    if (!blogs.length == 0) {
        mostFavouriteBlog = blogs.reduce((a, b) => a.likes > b.likes ? a : b)
    }

    delete mostFavouriteBlog.__v
    delete mostFavouriteBlog._id
    delete mostFavouriteBlog.url
  
    return mostFavouriteBlog
}

const mostBlogs = (blogs) => {
    
    const mostBlogAuthor = {}

    if (blogs.length != 0) {
        let result = _(blogs)
            .groupBy(blogs, 'author')
            .map(function (blog, blogIndex) {
                return { [blogIndex]: _.countBy(blog, 'author') }
            }).value()[0].false
    
        mostBlogAuthor.author = Object.keys(result).reduce((a, b) => result[a] > result[b] ? a : b)
        mostBlogAuthor.blogs = result[mostBlogAuthor.author]
    }
    
    return mostBlogAuthor
}

const mostLikes = (blogs) => {
    
    const mostLikesAuthor = {}

    if (blogs.length != 0) {
        let result =
            _(blogs)
            .groupBy('author')
            .map(function (blog, blogIndex) {
                return { [blogIndex]: _.sumBy(blog, 'likes')}
            })
            .value()
            
        result = result.reduce(function (prev, current) {
            return (Object.values(prev)[0] > Object.values(current)[0]) ? prev : current
        })
        mostLikesAuthor.author = Object.keys(result)[0]
        mostLikesAuthor.likes = Object.values(result)[0]
    }
    
    return mostLikesAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}