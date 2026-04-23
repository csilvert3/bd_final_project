import express from 'express';
import {
  getAllCommentsHandler,
  getCommentByIdHandler,
  createCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
} from '../controllers/commentController.js';
import {
  validateId,
  validateCreateComment,
  validateUpdateComment,
} from '../middleware/commentValidator.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', getAllCommentsHandler);
router.get('/:id', validateId, getCommentByIdHandler);
 
router.post('/', authenticate, validateCreateComment, createCommentHandler);
router.put('/:id', authenticate, validateId, validateUpdateComment, updateCommentHandler);
router.delete('/:id', authenticate, validateId, deleteCommentHandler);
 
export default router;