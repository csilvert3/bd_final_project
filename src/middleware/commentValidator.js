import { param, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id')
  .isInt({ min: 1 })
  .withMessage('ID must be a positive integer'),
  handleValidationErrors,
];

export const validateCreateComment = [
  body('songId')
    .exists({ values: 'falsy' })
    .withMessage('songId is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('songId must be a positive integer'),

  body('body')
    .exists({ values: 'falsy' })
    .withMessage('Body is required')
    .bail()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Body cannot be empty'),

  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('rRating must be an integer between 1 and 5'),

  handleValidationErrors,
];

export const validateUpdateComment = [
  body('body')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Body cannot be empty'),

  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),

  handleValidationErrors,
];

export const validateCommentQuery = [
  param('id')
  .optional()
  .isInt({ min: 1 })
  .withMessage('ID must be a positive integer'),
  handleValidationErrors,
];
 