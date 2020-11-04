module.exports = {
  secret: process.env.SESSION_KEY,
  expiresIn: process.env.SESSION_LIFETIME,
};
