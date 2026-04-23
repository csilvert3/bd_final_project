import prisma from '../config/db.js';

export async function createUser(data) {
  try {
    const user = await prisma.user.create({ data, omit: { password: true } });
    return user;
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error('Email has already been used');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}
