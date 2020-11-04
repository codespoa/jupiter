const jwt = require('jsonwebtoken')
const ms = require('ms')
const authConfig = require('../config/auth')
const addMilliseconds = require('../utils/addMilliseconds')

const User = require('../models/User')

const loginWithoutPassword = async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    try {
      const { email } = req.body

      const user = await User.findOne({ email }).select('+password').lean()


      if (!user)
        return res.status(404).json({ error: true, msg: 'Usuário não encontrado' })


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
  } else {
    next()
  }
}

module.exports = loginWithoutPassword
