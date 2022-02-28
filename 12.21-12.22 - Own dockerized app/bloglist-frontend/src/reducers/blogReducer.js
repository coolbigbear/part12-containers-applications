import blogService from '../services/blogs'
import { v4 } from 'uuid'

const blogReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
    case 'DEL_BLOG':
        return state.filter(obj => obj.id !== action.data.id)
    case 'LIKE':
        return state.map(obj => {
            if (obj.id === action.data) {
                obj.likes = obj.likes + 1
            }
            return obj
        })
    case 'NEW_BLOG':
        return [...state, action.data]
    case 'ADD_COMMENT':
        return state.map(obj => {
            if (obj.id === action.data.id) {
                obj.comments = obj.comments.concat({ comment: action.data.comment, id: v4() })
            }
            return obj
        })
    case 'INIT_BLOGS':
        return action.data
    default: return state
    }
}

export const createBlog = (blog, user) => {
    return async dispatch => {
        const blogResponse = await blogService.create(blog)
        console.log('Blog being added to the store', blog)
        blogResponse.user = user
        dispatch({
            type: 'NEW_BLOG',
            data: blogResponse
        })
    }
}

export const deleteBlog = (content) => {
    return async dispatch => {
        await blogService.del(content)
        dispatch({
            type: 'DEL_BLOG',
            data: content
        })
    }
}

export const likeBlog = (content) => {
    return async dispatch => {
        content.likes = content.likes + 1
        delete content.user
        await blogService.update(content)
        dispatch({
            type: 'LIKE',
            data: content.id
        })
    }
}

export const addComment = (id, comment) => {
    return async dispatch => {
        let response = await blogService.addComment(id, comment)
        console.log('response: ', response)
        dispatch({
            type: 'ADD_COMMENT',
            data: {
                id,
                comment
            }
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        console.log('Fetching all blogs')
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

export default blogReducer