import { Router } from "express";
import {
    getAll,
    getPublication,
    save
} from './publication.controller.js'
import { registerPublicationValidator } from "../../middlewares/validators.js";

const api = Router()

api.get('/', getAll)
api.get('/:id', getPublication)
api.post('/', [registerPublicationValidator], save)

export default api