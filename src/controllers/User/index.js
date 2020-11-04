const { Router } = require('express');
const multer = require('multer');
const auth = require('../../middlewares/auth');
const fileUpload = require('../../config/multer');
const validate = require('../../middlewares/validate');
const validators = require('../../validators/User');

const {
  changePassword,
  forgotPassword,
  recoverPassword,
  get,
  list,
  register,
  update,
  updatePhotoProfile,
} = require('./methods');

const router = Router();

router.get('/', auth(['admin', 'user']), validate(validators.list), list);

router.get('/:id', auth(['admin', 'user']), validate(validators.get), get);

router.post('/', validate(validators.register), register);

router.put('/:id?', auth(['admin', 'user']), update);

router.put(
  '/profile-photo',
  auth(['admin', 'user']),
  multer(fileUpload).single('profile_photo'),
  updatePhotoProfile
);
router.put(
  '/change-password',
  auth('admin'),
  validate(validators.changePassword),
  changePassword
);
router.post(
  '/forgot-password',
  auth('admin'),
  validate(validators.forgotPassword),
  forgotPassword
);
router.post(
  '/recover-password',
  auth('admin'),
  validate(validators.recoverPassword),
  recoverPassword
);

module.exports = router;
