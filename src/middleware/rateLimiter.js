import rateLimit from "express-rate-limit";

export const logInLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  handler: function (req, res, next) {
    const error = new Error('Too many login requests. Try again later.');
    error.status = 429;
    next(error);
  },
});
