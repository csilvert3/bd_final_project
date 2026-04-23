import { param, body, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
 
export const validateId = [
  param('id')
  .isInt({ min: 1 })
  .withMessage('ID must be a positive integer'),
  handleValidationErrors,
];
 
export const validateCreateSong = [
  body('title')
    .exists({ values: 'falsy' })
    .withMessage('Title is required')
    .bail()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Title cannot be empty'),
 
  body('artist')
    .exists({ values: 'falsy' })
    .withMessage('Artist is required')
    .bail()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Artist cannot be empty'),
 
  body('price')
    .exists({ values: 'falsy' })
    .withMessage('Price is required')
    .bail()
    .isFloat({ min: 0.01 })
    .withMessage('Price must be a positive number'),
 
  body('album')
    .optional()
    .trim(),

  body('genre')
    .optional()
    .trim(),

  body('durationS')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer'),
 
  handleValidationErrors,
];
 
export const validateUpdateSong = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Title cannot be empty'),
  
  body('artist')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Artist cannot be empty'),
  
  body('price')
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage('Price must be a positive number'),
  
  body('album')
    .optional()
    .trim(),
  
  body('genre')
    .optional()
    .trim(),

  body('durationS')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer'),
  
  handleValidationErrors,
];
 
export const validateSongQuery = [
  query('genre')
    .optional()
    .trim(),
  
  query('artist')
    .optional()
    .trim(),
  
  query('search')
    .optional()
    .trim(),
  
  query('sortBy')
    .optional()
    .isIn(['id', 'title', 'artist', 'price', 'createdAt'])
    .withMessage('sortBy must be one of: id, title, artist, price, createdAt'),
  
  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Order must be asc or desc'),
  
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be a non-negative integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be an integer between 1 and 50'),
  
  handleValidationErrors,
];
