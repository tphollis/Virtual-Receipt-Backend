const routes = require('express').Router();

routes.use('/user', require('./user'));
routes.use('/receipt', require('./receipt'));
routes.use('/', require('./swagger'));

module.exports = routes;