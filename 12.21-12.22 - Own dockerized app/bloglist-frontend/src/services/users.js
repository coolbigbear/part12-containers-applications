import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users`

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

export default { getAll }