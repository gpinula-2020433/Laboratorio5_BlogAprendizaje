// Validar campos en las rutas
import { body } from "express-validator";
import { validateErrors } from "./validate.errors.js";

export const registerCommentValidator = [
  body('username', 'Username cannot be empty')
    .notEmpty()
    .isLength({ max: 45 })
    .withMessage("Username can't exceed 45 characters"),
  body('comment', 'Comment cannot be empty')
    .notEmpty()
    .isLength({ max: 1000 })
    .withMessage("Comment can't exceed 1000 characters"),
  body('publication', 'Publication is required')
    .notEmpty()
    .isMongoId()
    .withMessage('Publication must be a valid MongoDB ID'),
  validateErrors
]

export const registerPublicationValidator = [
  body('title', 'Title cannot be empty')
    .notEmpty()
    .isLength({ max: 45 })
    .withMessage("Title can't be longer than 45 characters"),
  body('mainText', 'Main text cannot be empty')
    .notEmpty()
    .isLength({ max: 1000 })
    .withMessage("Main text can't be longer than 1000 characters"),
  body('course', 'Course is required. Must be Taller, Tecnología, Práctica Supervisada')
    .notEmpty()
    .isIn(['Taller', 'Tecnología', 'Práctica Supervisada']),
  body('author', 'Author cannot be empty')
    .notEmpty()
    .trim(),
  validateErrors
]