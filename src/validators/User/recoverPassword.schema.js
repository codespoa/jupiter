const yup = require('../../lib/yup');

module.exports = yup.object().shape({
  token: yup.string().required(),
  password: yup.string().min(6).required(),
});
