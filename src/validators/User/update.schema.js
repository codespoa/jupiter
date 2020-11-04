const yup = require('../../lib/yup');

module.exports = yup.object().shape({
  first_name: yup.string(),
  last_name: yup.string(),
  email: yup.string().email(),
  phone: yup
    .string()
    .matches(/(^[0-9]+$)/, 'phone somente digitos são permitidos')
    .length(11),
});
