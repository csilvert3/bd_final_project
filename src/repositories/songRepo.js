import prisma from '../config/db.js';
 
export async function getAll({ search, genre, artist, sortBy, order, offset, limit }){
  const where = {};
  const conditions = [];
 
  if(search){
    conditions.push({
      OR: [
        { title:  { contains: search, mode: 'insensitive' } },
        { artist: { contains: search, mode: 'insensitive' } },
      ],
    });
  }
  if (genre)  conditions.push({ genre:  { contains: genre,  mode: 'insensitive' } });
  if (artist) conditions.push({ artist: { contains: artist, mode: 'insensitive' } });
  if (conditions.length) where.AND = conditions;
 
  return prisma.song.findMany({ where, orderBy: { [sortBy]: order }, take: limit, skip: offset });
}
 
export async function getById(id) {
  return prisma.song.findUnique({ where: { id } });
}
 
export async function create(data) {
  return prisma.song.create({ data });
}
 
export async function update(id, data) {
  try {
    return await prisma.song.update({ where: { id }, data });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
 
export async function remove(id) {
  try {
    return await prisma.song.delete({ where: { id } });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}