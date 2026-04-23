import express from 'express';
import { logInLimiter } from '../middleware/rateLimiter.js';
import { signUpHandler, logInHandler } from '../controllers/authController.js';
import { validateSignup, validateLogin } from '../middleware/userValidator.js';

const router = express.Router();

router.post('/signup', validateSignup, signUpHandler);
router.post('/login',  logInLimiter, validateLogin, logInHandler);

export default router;
