const yup = require('../../lib/yup');

module.exports = yup.object().shape({
  device: yup.string().oneOf(['web', 'ios', 'android']).default('web'),
  email: yup.string().email().required(),
});
