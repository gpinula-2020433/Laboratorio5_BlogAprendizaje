import { Router } from "express";
import {
    getAll,
    getPublication,
    save,
    updatePublication,
    deletePublication
} from './publication.controller.js'

const api = Router()

api.get('/', getAll)
api.get('/:id', getPublication)
api.post('/', save)
api.put('/:id', updatePublication)
api.delete('/:id', deletePublication)

export default api