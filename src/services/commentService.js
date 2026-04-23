import * as commentRepo from '../repositories/commentRepo.js';
import { getById as getSong } from '../repositories/songRepo.js';

export async function getAllComments(songId) {
  return commentRepo.getAll(songId);
}

export async function getCommentById(id) {
  const comment = await commentRepo.getById(id);
  if (!comment) {
    const err = new Error(`Comment ${id} not found`);
    err.status = 404;
    throw err;
  }
  return comment;
}

export async function createComment(userId, songId, body, rating) {
  const song = await getSong(songId);
  if (!song) {
    const err = new Error(`Song ${songId} not found`);
    err.status = 404;
    throw err;
  }
  return commentRepo.create({ userId, songId, body, rating: rating ?? null });
}

export async function updateComment(id, data) {
  const comment = await commentRepo.update(id, data);
  if (!comment) {
    const err = new Error(`Comment ${id} not found`);
    err.status = 404;
    throw err;
  }
  return comment;
}

export async function deleteComment(id) {
  const result = await commentRepo.remove(id);
  if (!result) {
    const err = new Error(`Comment ${id} not found`);
    err.status = 404;
    throw err;
  }
}
