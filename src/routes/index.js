const me = require('../controllers/Me');
const user = require('../controllers/User');

const routes = (app) => {
  app.use('/me', me);
  app.use('/user', user);
};

module.exports = routes;
