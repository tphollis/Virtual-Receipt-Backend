const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const cors = require('cors');

const app = express();
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();
const port = process.env.PORT || 3000
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};
app.use(cors())
// req.isAuthenticated is provided from the auth router
/*app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  //res.send(req.oidc);
  //console.log(req.oidc.isAuthenticated());
});*/

/*app.get('/profile', requiresAuth(), (req,res) =>{
    //res.send(JSON.stringify(req.oidc.user));
    const user = req.openId?.oidc.user
    res.status(200).json({user});
});*/

// auth router attaches /login, /logout, and /callback routes to the baseURL


app
  .use(auth(config))
  .use(bodyParser.json())
  
  .get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');})
  .get('/profile', requiresAuth(), (req,res) =>{
      //res.send(JSON.stringify(req.oidc.user));
      const user = req.openId?.oidc.user
      res.status(200).json({user});
  }).use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});