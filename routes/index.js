const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send(' This My Recipt Project. I am making a Recipt.');
  
});
routes.use('/recipt', require('./recipt'))
routes.use('/swagger', require('./swagger'))
module.exports = routes;