const jwt = require('jsonwebtoken')
const ms = require('ms')
const bcrypt = require('bcrypt')
const authConfig = require('../../../config/auth')

const User = require('../../../models/User')
const addMilliseconds = require('../../../utils/addMilliseconds')

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!password)
      return res.status(400).json({ error: true, msg: 'Senha é um campo obrigatório' }).end()

    const user = await User.findOne({ email }).select('+password').lean()

    if (!user)
      return res.status(404).json({ error: true, msg: 'Usuário não encontrado' })

    // Compare the passwords
    const passwordIsEqual = await bcrypt.compare(password, user.password)

    if (!passwordIsEqual)
      return res.status(401).json({ error: true, msg: 'E-mail e/ou senha incorreta' })

    if (!user.active)
      return res.status(401).json({ error: true, msg: 'Usuário inativo' })

    const { _id } = user

    // Generate session token
    const token = jwt.sign({ tokenUser: _id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    })

    const convertedDate = ms(authConfig.expiresIn)
    const dateToExpire = addMilliseconds(convertedDate)

    return res.status(200).json({ token, expiresIn: dateToExpire })

  } catch (error) {
    console.log('\x1b[31m', `[API] Error in login`, error)
    return res.status(500).json(error)
  }
}

const get = async (req, res) => {
  try {
    const { _id } = req.tokenUser;

    const user = await User.findById(_id).select('-password');

    if (!user)
      return res
        .status(400)
        .json({ error: `O id '${_id}' não foi encontrado` });

    return res.status(200).json(user);
  } catch (error) {
    console.log('\x1b[31m', `[API] Error on get user`, error);
    return res.status(500).json(error);
  }
};



module.exports = login, get;
