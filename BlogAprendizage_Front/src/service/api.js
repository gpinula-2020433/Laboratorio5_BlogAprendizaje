import axios from 'axios'

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:3200/v1',
        timeout: 5000
    }
)

export const getPublications = async () => {
    try {
        const res = await apiClient.get('/publication')
        return res.data.publications
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getPublicationById = async (id) => {
    try {
        const res = await apiClient.get(`/publication/${id}`)
        return res.data.publication
    } catch(err) {
        return {
            error: true,
            err
        }
    }
}

export const createComment = async (commentData) => {
    try {
        const res = await apiClient.post('/comment', commentData)
        return res.data.comment
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getComments = async () => {
    try {
        const res = await apiClient.get('/comment')
        return res.data.comments
    } catch(err) {
        return {
            error: true,
            err
        }
    }
}

export const getCommentById = async (id) => {
    try {
        const res = await apiClient.get(`/comment/${id}`)
        return res.data.comment
    } catch(err) {
        return {
            error: true,
            err
        }
    }
}

export const getCommentsByPublication = async (publicationId) => {
    try {
        const res = await apiClient.get(`/comment/filter?publication=${publicationId}`)
        return res.data.comments
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}
