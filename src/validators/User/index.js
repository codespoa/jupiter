const get = require('./get.schema');
const list = require('./list.schema');
const register = require('./register.schema');
const update = require('./update.schema');
const changePassword = require('./changePassword.schema');
const forgotPassword = require('./forgotPassword.schema');
const recoverPassword = require('./recoverPassword.schema');

module.exports = {
  get,
  list,
  register,
  update,
  changePassword,
  forgotPassword,
  recoverPassword,
};
