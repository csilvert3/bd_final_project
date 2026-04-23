import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
  await prisma.$queryRaw`TRUNCATE comments, order_items, orders, songs, users RESTART IDENTITY CASCADE;`;

  const usersData = [
    { email: 'alice@test.com', password: 'alice1234', role: 'USER'  },
    { email: 'admin@test.com', password: 'admin1234', role: 'ADMIN' },
  ];

  const users = [];
  for (const u of usersData) {
    const hashed = await bcrypt.hash(u.password, 10);
    const user = await prisma.user.create({
      data: { email: u.email, password: hashed, role: u.role },
    });
    users.push(user);
  }
  const [alice, admin] = users;

  const songsData = [
    { title: 'Blinding Lights', artist: 'The Weeknd',   album: 'After Hours', genre: 'Pop', price: 1.29, durationS: 200 },
    { title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', genre: 'Pop', price: 1.29, durationS: 203 },
    { title: 'Peaches', artist: 'Justin Bieber',album: 'Justice', genre: 'R&B', price: 0.99, durationS: 198 },
    { title: 'Stay', artist: 'Kid Laroi', album: null, genre: 'Pop', price: 0.99, durationS: 141 },
    { title: 'As It Was', artist: 'Harry Styles', album: 'Harry\'s House', genre: 'Pop', price: 1.29, durationS: 167 },
    { title: 'Heat Waves', artist: 'Glass Animals', album: 'Dreamland', genre: 'Indie Pop', price: 0.99, durationS: 238 },
  ];

  const songs = [];
  for (const s of songsData) {
    const song = await prisma.song.create({ data: s });
    songs.push(song);
  }

  const aliceOrder = await prisma.order.create({
    data: {
      userId: alice.id,
      totalPrice: 2.58,
      status: 'COMPLETED',
      items: {
        create: [
          { songId: songs[0].id, price: 1.29 },
          { songId: songs[1].id, price: 1.29 },
        ],
      },
    },
  });

  const adminOrder = await prisma.order.create({
    data: {
      userId: admin.id,
      totalPrice: 1.98,
      status: 'PENDING',
      items: {
        create: [
          { songId: songs[2].id, price: 0.99 },
          { songId: songs[3].id, price: 0.99 },
        ],
      },
    },
  });

  await prisma.comment.createMany({
    data: [
      { userId: alice.id, songId: songs[1].id, body: 'Absolute banger!', rating: 5 },
      { userId: alice.id, songId: songs[1].id, body: 'Great song to work out to.', rating: 4 },
      { userId: admin.id, songId: songs[3].id, body: 'Plays on repeat everyday.', rating: 5 },
      { userId: admin.id, songId: songs[2].id, body: 'Catchy but gets old fast.', rating: 3 },
    ],
  });

  console.log('Seed completed successfully!');
} catch (error) {
  console.error('Seed failed:', error);
} finally {
  await prisma.$disconnect();
}