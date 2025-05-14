import { Router } from "express";
import {
    getAll,
    getComment,
    save,
    updateComment,
    deleteComment
} from './comment.controller.js'

const api = Router()

api.get('/', getAll)
api.get('/:id', getComment)
api.post('/', save)
api.put('/:id', updateComment)
api.delete('/:id', deleteComment)

export default api