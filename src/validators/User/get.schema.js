const yup = require('../../lib/yup');

module.exports = yup.object().shape({
  id: yup.string().length(24).required(),
});
