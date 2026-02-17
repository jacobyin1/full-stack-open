import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newP) => {
    return axios.post(baseUrl, newP).then(response => response.data)
}

const delete_p = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
} 

const update = (id, newObj) => {
    return axios.put(`${baseUrl}/${id}`, newObj).then(response => response.data)
}

export default { getAll, create, delete_p, update }