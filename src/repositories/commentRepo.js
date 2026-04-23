import prisma from '../config/db.js';
 
export async function getAll(songId) {
  const where = songId ? { songId: parseInt(songId) } : {};
  return prisma.comment.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
}
 
export async function getById(id) {
  return prisma.comment.findUnique({ where: { id } });
}
 
export async function create(data) {
  return prisma.comment.create({ data });
}
 
export async function update(id, data) {
  try {
    return await prisma.comment.update({ where: { id }, data });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
 
export async function remove(id) {
  try {
    return await prisma.comment.delete({ where: { id } });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}