import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/blogs`
let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.put(baseUrl + '/' + newObject.id, newObject, config)
    return response.data
}

const del = async newObject => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(baseUrl + '/' + newObject.id, config)
    return response.data
}

const addComment = async (id, comment) => {
    const response = await axios.post(baseUrl + '/' + id + '/comments', { comment }, null)
    return response.data
}

export default { getAll, setToken, create, update, del, addComment }