const yup = require('../../lib/yup');

module.exports = yup.object().shape({
  filter: yup.string(),
  active: yup.boolean(),
  sort: yup
    .string()
    .oneOf(['name', '-name', 'updatedAt', '-updatedAt'])
    .default('-updatedAt'),
  page: yup.number().integer().min(1),
  perPage: yup.number().integer().min(1).default(1),
});
