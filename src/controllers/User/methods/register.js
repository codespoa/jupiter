const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ms = require('ms');
const authConfig = require('../../../config/auth');
const addMilliseconds = require('../../../utils/addMilliseconds');

const User = require('../../../models/User');

const register = async (req, res) => {
  try {
    const { body } = req;
    const { email, phone, password, ...restUser } = body;

    // Verificando se o e-mail ou o telefone já existem
    const usersExists = await User.find({ email });

    if (usersExists.length > 0) {
      const errors = usersExists.map((user) => {
        user.toObject();

        if (user.email === email)
          return `O e-mail '${email}' não está disponível`;
      });

      return res.status(403).json({ error: errors });
    }

    const passwordHashed = await bcrypt.hash(password, 8);

    const user = await User.create({
      email,
      password: passwordHashed,
      phone,
      ...restUser,
    });

    const token = jwt.sign(
      { tokenUser: { _id: user._id } },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );

    const convertedDate = ms(authConfig.expiresIn);
    const dateToExpire = addMilliseconds(convertedDate);

    return res.status(201).json({ token, expiresIn: dateToExpire, user });
  } catch (error) {
    console.log('\x1b[31m', `[API] Error on register user`, error);
    return res.status(500).json(error);
  }
};

module.exports = register;
