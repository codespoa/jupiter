const { Router } = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const validators = require('../../validators/Me')
const createFirstUser = require('../../middlewares/createFirstUser')
const loginWithoutPassword = require('../../middlewares/loginWithoutPassword')

const router = Router()

const { login, get } = require('./methods')

router.get('/', auth(['admin', 'user']), get)
router.post('/', createFirstUser, loginWithoutPassword, validate(validators.login), login)

module.exports = router
