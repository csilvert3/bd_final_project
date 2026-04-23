import express from 'express';
import {
  getAllOrdersHandler,
  getOrderByIdHandler,
  createOrderHandler,
  updateOrderHandler,
  deleteOrderHandler,
} from '../controllers/orderController.js';
import {
  validateId,
  validateCreateOrder,
  validateUpdateOrderStatus,
} from '../middleware/orderValidator.js';
import { authenticate } from '../middleware/authenticate.js';
 
const router = express.Router();
 
router.get('/', authenticate, getAllOrdersHandler);
router.get('/:id', authenticate, validateId, getOrderByIdHandler);
router.post('/', authenticate, validateCreateOrder, createOrderHandler);
router.put('/:id', authenticate, validateId, validateUpdateOrderStatus, updateOrderHandler);
router.delete('/:id', authenticate, validateId, deleteOrderHandler);
 
export default router;