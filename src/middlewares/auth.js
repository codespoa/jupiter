const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../config/auth');
const User = require('../models/User');

const auth = (roles = 'user') => async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json();

  const [, token] = authHeader.split(' ');

  try {
    const tokenDecoded = await promisify(jwt.verify)(token, authConfig.secret);
    if (!tokenDecoded) return res.status(401).end();

    const { tokenUser: userId } = tokenDecoded;
    
    const user = await User.findById(userId);

    if(!user) return res.status(404).json({error: true, msg: 'Usuário não encontrado'})

    if (!user.active)
      return res.status(401).json({ errors: ['Seu usuário esta inativo.'] });

    if (roles !== 'user' && !roles.includes(user.role))
      return res.status(403).json({ errors: ['Você não tem acesso a este recurso.'] });

    req.tokenUser = user;
    req.admin = (user.role === 'admin');

    return next();
  } catch (error) {
    return res.status(401).json();
  }
};

module.exports = auth;
