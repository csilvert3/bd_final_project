import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'js-yaml';

import authRoutes from './routes/authRoutes.js';
import songRoutes from './routes/songRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
if (process.env.NODE_ENV !== 'test') app.use(morgan('tiny'));

let specs;
try {
specs = YAML.load(fs.readFileSync('./docs/openapi.yaml', 'utf8'));
} catch (error) {
  console.error('Failed to load OpenAPI specification:', error);
  process.exit(1);
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/comments', commentRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;