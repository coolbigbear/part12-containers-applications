import usersService from '../services/users'

const usersReducer = (state = [], action) => {
    switch (action.type) {
    case ('INIT_USERS'):
        return action.users
    default:
        return state
    }
}

export const initializeUsers = () => {
    return async dispatch => {
        const users = await usersService.getAll()
        console.log('Init users called')
        dispatch({
            type: 'INIT_USERS',
            users,
        })
    }
}

export default usersReducer