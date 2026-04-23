import { getAllComments, getCommentById, createComment, updateComment, deleteComment } from '../services/commentService.js';

export async function getAllCommentsHandler(req, res) {
  const { songId } = req.query;
  const comments = await getAllComments(songId);
  res.status(200).json(comments);
}

export async function getCommentByIdHandler(req, res) {
  const comment = await getCommentById(parseInt(req.params.id));
  res.status(200).json(comment);
}

export async function createCommentHandler(req, res) {
  const { songId, body, rating } = req.body;
  const comment = await createComment(req.user.id, songId, body, rating);
  res.status(201).json(comment);
}

export async function updateCommentHandler(req, res) {
  const id = parseInt(req.params.id);
  const comment = await getCommentById(id);
 
  if (comment.userId !== req.user.id && req.user.role !== 'ADMIN') {
    const err = new Error('Forbidden: insufficient permission.');
    err.status = 403;
    throw err;
  }
  const { body, rating } = req.body;
  const updated = await updateComment(id, { body, rating });
  res.status(200).json(updated);
}

export async function deleteCommentHandler(req, res) {
  const id = parseInt(req.params.id);
  const comment = await getCommentById(id);

  if (comment.userId !== req.user.id && req.user.role !== 'ADMIN') {
    const err = new Error('Forbidden: insufficient permission.');
    err.status = 403;
    throw err;
  }
  await deleteComment(id);
  res.status(200).json({ message: 'Comment deleted successfully' });
}
