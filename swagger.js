const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Receipt Project',
  },
 //test for localhost host: 'localhost:3000',
//   host: 'personal-test1.herokuapp.com',
    host:'localhost:8080',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);

//