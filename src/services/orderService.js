import * as orderRepo from '../repositories/orderRepo.js';
import { getById as getSong } from '../repositories/songRepo.js';
 
export async function getAllOrders(userId, isAdmin) {
  return orderRepo.getAll(userId, isAdmin);
}
 
export async function getOrderById(id) {
  const order = await orderRepo.getById(id);
  if (!order) {
    const err = new Error(`Order ${id} not found`);
    err.status = 404;
    throw err;
  }
  return order;
}

export async function createOrder(userId, songIds) {
  const songs = [];
  for (const songId of songIds) {
    const song = await getSong(songId);
    if (!song) {
      const err = new Error(`Song ${songId} not found`);
      err.status = 404;
      throw err;
    }
    songs.push(song);
  }
  return orderRepo.create(userId, songIds, songs);
}

export async function updateOrderStatus(id, status) {
  const order = await orderRepo.getById(id);
  if (!order) {
    const err = new Error(`Order ${id} not found`);
    err.status = 404;
    throw err;
  }
  if (order.status === 'COMPLETED') {
    const err = new Error("Cannot update a completed order");
    err.status = 400;
    throw err;
  }
  return orderRepo.updateStatus(id, status);
}

export async function deleteOrder(id) {
  const order = await orderRepo.getById(id);
  if (!order) {
    const err = new Error(`Order ${id} not found`);
    err.status = 404;
    throw err;
  }
  if (order.status === 'COMPLETED') {
    const err = new Error("Cannot delete a completed order");
    err.status = 400;
    throw err;
  }
  await orderRepo.remove(id);
}
