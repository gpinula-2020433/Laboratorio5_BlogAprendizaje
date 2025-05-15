import axios from 'axios'

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:3200/v1',
        timeout: 5000
    }
)

export const getPublications = async () => {
    try {
        const res = await apiClient.get('/publication')  // Cambié a /publications
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
        const res = await apiClient.get(`/publication/${id}`)  // /publication se mantiene para ID
        return res.data.publication  // Cambié a res.data.publication
    } catch(err) {
        return {
            error: true,
            err
        }
    }
}

export const createPublication = async (publicationData) => {
    try {
        return await apiClient.post('/publication', publicationData)
    } catch(err) {
        return {
            error: true,
            err
        }
    }
}

export const updatePublication = async (id, publicationData) => {
    try {
        return await apiClient.put(`/publication/${id}`, publicationData)
    } catch(err) {
        return {
            error: true,
            err
        }
    }
}

export const deletePublication = async (id) => {
    try {
        return await apiClient.delete(`/publication/${id}`)
    } catch(err) {
        return {
            error: true,
            err
        }
    }
}


export const getComments = async () => {
    try {
        const res = await apiClient.get('/comment')  // Cambié a /comments
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
        const res = await apiClient.get(`/comment/${id}`)  // /comment se mantiene para ID
        return res.data.comment  // Cambié a res.data.comment
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


export const updateComment = async (id, commentData) => {
    try {
        return await apiClient.put(`/comment/${id}`, commentData)
    } catch(err) {
        return {
            error: true,
            err
        }
    }
}

export const deleteComment = async (id) => {
    try {
        return await apiClient.delete(`/comment/${id}`)
    } catch(err) {
        return {
            error: true,
            err
        }
    }
}
