import { getAllOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder } from '../services/orderService.js';

export async function getAllOrdersHandler(req, res) {
  const isAdmin = req.user.role === 'ADMIN';
  const orders = await getAllOrders(req.user.id, isAdmin);
  res.status(200).json(orders);
}

export async function getOrderByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const order = await getOrderById(id);

  if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
    const err = new Error('Forbidden: insufficient permission.');
    err.status = 403;
    throw err;
  }
  res.status(200).json(order);
}

export async function createOrderHandler(req, res) {
  const { songIds } = req.body;
  const order = await createOrder(req.user.id, songIds);
  res.status(201).json(order);
}

export async function updateOrderHandler(req, res) {
  const id = parseInt(req.params.id);
  const order = await getOrderById(id);

  if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
    const err = new Error('Forbidden: insufficient permission.');
    err.status = 403;
    throw err;
  }
  const updated = await updateOrderStatus(id, req.body.status);
  res.status(200).json(updated);
}

export async function deleteOrderHandler(req, res) {
  const id = parseInt(req.params.id);
  const order = await getOrderById(id);

  if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
    const err = new Error('Forbidden: insufficient permission.');
    err.status = 403;
    throw err;
  }
  await deleteOrder(id);
  res.status(200).json({ message: 'Order deleted successfully' });
}
