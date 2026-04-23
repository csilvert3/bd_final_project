import prisma from '../config/db.js';
 
export async function getAll(userId, isAdmin) {
  const where = isAdmin ? {} : { userId };
  return prisma.order.findMany({
    where,
    include: { items: { include: { song: true } } },
    orderBy: { createdAt: 'desc' },
  });
}
 
export async function getById(id) {
  return prisma.order.findUnique({
    where: { id },
    include: { items: { include: { song: true } } },
  });
}
 
export async function create(userId, songIds, songs) {
  const totalPrice = songs.reduce((sum, s) => sum + Number(s.price), 0);
  return prisma.order.create({
    data: {
      userId,
      totalPrice,
      items: {
        create: songs.map((s) => ({ songId: s.id, price: s.price })),
      },
    },
    include: { items: { include: { song: true } } },
  });
}
 
export async function updateStatus(id, status) {
  try {
    return await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: { include: { song: true } } },
    });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
 
export async function remove(id) {
  try {
    return await prisma.order.delete({ where: { id } });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
