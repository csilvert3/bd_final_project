import { body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
 
export const validateSignup = [
  body('email')
    .exists({ values: 'falsy' })
    .withMessage('Email is required')
    .bail()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Email must be a valid email address'),
 
  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage('Password must be between 8 and 64 characters'),
 
  handleValidationErrors,
];
 
export const validateLogin = [
  body('email')
    .exists({ values: 'falsy' })
    .withMessage('Email is required'),

  body('password')
  .exists({ values: 'falsy' })
  .withMessage('Password is required'),
  
  handleValidationErrors,
];
