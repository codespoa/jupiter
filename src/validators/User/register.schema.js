const yup = require('../../lib/yup');

module.exports = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .matches(/(^[0-9]+$)/, 'phone somente digitos são permitidos')
    .length(11)
    .required(),
  password: yup.string().min(6).required(),
});
