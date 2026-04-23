import express from 'express';
import {
  getAllSongsHandler,
  getSongByIdHandler,
  createSongHandler,
  updateSongHandler,
  deleteSongHandler,
} from '../controllers/songController.js';
import {
  validateId,
  validateCreateSong,
  validateUpdateSong,
  validateSongQuery,
} from '../middleware/songValidator.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', validateSongQuery, getAllSongsHandler);
router.get('/:id', validateId, getSongByIdHandler);
 
router.post('/', authenticate, authorizeRoles('ADMIN'), validateCreateSong, createSongHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), validateId, validateUpdateSong, updateSongHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), validateId, deleteSongHandler);

export default router;
