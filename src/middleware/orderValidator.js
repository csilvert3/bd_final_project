import { param, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
 
export const validateId = [
  param('id')
  .isInt({ min: 1 })
  .withMessage('ID must be a positive integer'),
  handleValidationErrors,
];
 
export const validateCreateOrder = [
  body('songIds')
    .exists({ values: 'falsy' })
    .withMessage('songIds is required')
    .bail()
    .isArray({ min: 1 })
    .withMessage('songIds must be a non-empty array')
    .bail()
    .custom((arr) => arr
    .every((id) => Number
    .isInteger(id) && id > 0))
    .withMessage('All song IDs must be positive integers'),
  handleValidationErrors,
];

export const validateUpdateOrderStatus = [
  body('status')
    .exists({ values: 'falsy' })
    .withMessage('status is required')
    .bail()
    .isIn(['PENDING', 'COMPLETED', 'CANCELLED'])
    .withMessage('status must be one of: PENDING, COMPLETED, CANCELLED'),
  handleValidationErrors,
];
