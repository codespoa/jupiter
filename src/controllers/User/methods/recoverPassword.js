const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const authTokenConfig = require('../../../config/auth');
const emailTokenConfig = require('../../../config/email');

const User = require('../../../models/User');

const recoverPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Gerando o token
    const tokenDecoded = await promisify(jwt.verify)(
      token,
      emailTokenConfig.secret
    );

    if (!tokenDecoded)
      return res.status(401).json({ error: 'Decoded token error' });

    // Transformando a senha em um hash
    const passwordHashed = await bcrypt.hash(password, 8);

    // Busca o usuário, se encontrar atualiza
    const user = await User.findByIdAndUpdate(
      { _id: tokenDecoded._id },
      { password: passwordHashed }
    );

    if (!user) return res.status(400).json({ error: 'Usuário não encontrado' });

    const { _id, admin } = user;

    // Gerando o token
    const sessionToken = jwt.sign(
      { tokenUser: { _id, admin } },
      authTokenConfig.secret,
      {
        expiresIn: authTokenConfig.expiresIn,
      }
    );

    const userObject = user.toObject();

    return res.status(200).json({
      token: sessionToken,
      expiresIn: authTokenConfig.expiresIn,
      user: userObject,
    });
  } catch (error) {
    console.log('\x1b[31m', `[API] Error on user recover password`, error);
    return res.status(500).json(error);
  }
};

module.exports = recoverPassword;
