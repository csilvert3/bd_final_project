import * as songRepo from '../repositories/songRepo.js';
 
export async function getAllSongs(options) {
  return songRepo.getAll(options);
}

export async function getSongById(id) {
  const song = await songRepo.getById(id);
  if (!song) {
    const err = new Error(`Song ${id} not found`);
    err.status = 404;
    throw err;
  }
  return song;
}

export async function createSong(data) {
  return songRepo.create(data);
}

export async function updateSong(id, data) {
  const song = await songRepo.update(id, data);
  if (!song) {
    const err = new Error(`Song ${id} not found`);
    err.status = 404;
    throw err;
  }
  return song;
}

export async function deleteSong(id) {
  const result = await songRepo.remove(id);
  if (!result) {
    const err = new Error(`Song ${id} not found`);
    err.status = 404;
    throw err;
  }
}