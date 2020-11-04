const yup = require('../../lib/yup');

module.exports = yup.object().shape({
  _id: yup.string().length(24),
  current_password: yup.string().min(6).required(),
  new_password: yup.string().min(6).required(),
});
