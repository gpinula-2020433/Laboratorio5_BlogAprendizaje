import { Router } from "express";
import {
    getAll,
    getComment,
    save,
    getAllCommentsFilter
} from './comment.controller.js'
import { registerCommentValidator } from "../../middlewares/validators.js";

const api = Router()

api.get('/filter', getAllCommentsFilter)
api.get('/', getAll)
api.post('/', [registerCommentValidator], save)
api.get('/:id',  getComment)


export default api