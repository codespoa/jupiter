const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ms = require('ms')
const authConfig = require('../config/auth')
const addMilliseconds = require('../utils/addMilliseconds')

const User = require('../models/User')

const CreateFirstUser = async (req, res, next) => {
  try {

    const { email, password } = req.body

    const user = await User.count()

    if (user) {
      next()
    }

    if (!password)
        return res.status(400).json({ error: true, msg: 'Senha é um campo obrigatório' }).end()

      const passwordHashed = await bcrypt.hash(password, 8)

      const firstUser = await User.create([
        {
          _id: '5ef9f794b941aa199f6a7478',
          name: 'Admin user',
          email,
          password: passwordHashed,
        },
      ])

      const token = jwt.sign(
        { tokenUser: { _id: firstUser._id } },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        }
      )

      const convertedDate = ms(authConfig.expiresIn)
      const dateToExpire = addMilliseconds(convertedDate)

      return res.status(201).json({ token, expiresIn: dateToExpire, firstUser })

  } catch (err) {
    console.log('\x1b[31m', `[API] Error`, err)
    return res.status(500).json({ error: true, msg: 'Erro interno no servidor' })
  }

}

module.exports = CreateFirstUser