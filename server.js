const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const { auth, requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app
  .use(auth(config))
  .use(bodyParser.json({limit: '50mb', extended: true}))
  .use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}))
  .use(bodyParser.text({ limit: '200mb' }))
  
  .get('/', (req, res, next) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  })
  .get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  })
  .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});