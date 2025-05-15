import { Router } from "express";
import {
    getAll,
    getComment,
    save
} from './comment.controller.js'
import { registerCommentValidator } from "../../middlewares/validators.js";

const api = Router()

api.get('/', getAll)
api.get('/:id',  getComment)
api.post('/', [registerCommentValidator], save)

export default api