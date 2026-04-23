import { getAllSongs, getSongById, createSong, updateSong, deleteSong } from '../services/songService.js';

export async function getAllSongsHandler(req, res) {
  const {
    search = '',
    genre  = '',
    artist = '',
    sortBy = 'id',
    order  = 'asc',
    offset = 0,
    limit  = 10,
  } = req.query;

  const songs = await getAllSongs({
    search,
    genre,
    artist,
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  });
  res.status(200).json(songs);
}

export async function getSongByIdHandler(req, res) {
  const song = await getSongById(parseInt(req.params.id));
  res.status(200).json(song);
}

export async function createSongHandler(req, res) {
  const { title, artist, album, genre, price, durationS } = req.body;
  const song = await createSong({ title, artist, album, genre, price, durationS });
  res.status(201).json(song);
}

export async function updateSongHandler(req, res) {
  const { title, artist, album, genre, price, durationS } = req.body;
  const song = await updateSong(parseInt(req.params.id), { title, artist, album, genre, price, durationS });
  res.status(200).json(song);
}

export async function deleteSongHandler(req, res) {
  await deleteSong(parseInt(req.params.id));
  res.status(200).json({ message: 'Song deleted successfully' });
}
