import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
    switch (action.type) {
    case ('SET_USER'):
        return action.user
    case ('CLEAR_USER'):
        return null
    default:
        return state
    }
}

export const setUser = (user) => {
    return dispatch => {
        blogService.setToken(user.token)
        dispatch({
            type: 'SET_USER',
            user,
        })
    }
}

export const clearUser = () => {
    return dispatch => {
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch({
            type: 'CLEAR_USER'
        })
    }
}

export default userReducer