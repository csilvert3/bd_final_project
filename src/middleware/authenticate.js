import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const err = new Error('Not authenticated. Please provide a valid token.');
  err.status = 401;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(err);
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.userId, role: payload.role };
    next();
  } catch (error) {
    return next(err);
  }
}
