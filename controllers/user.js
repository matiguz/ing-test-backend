    _       = require('lodash'),
    config  = require('../config'),
    jwt     = require('jsonwebtoken');

// USERS.
var users = [{
  id: 1,
  username: 'user',
  password: 'password'
}];

function createIdToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
}

function createAccessToken() {
  return jwt.sign({
    iss: config.issuer,
    aud: config.audience,
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    scope: 'full_access',
    sub: "matiguz-dev",
    jti: genJti(), // unique identifier for the token
    alg: 'HS256'
  }, config.secret);
}

function verifyAccessToken(token) {
    return jwt.verify(token, config.secret, (err, decodedToken) => {
        if (err || !decodedToken)
        {
          return false;
        }
  
        return true;
    });
  }

// Generate Unique Identifier for the access token
function genJti() {
  let jti = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i++) {
      jti += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  
  return jti;
}

function getUserScheme(req) {
  
  var username;
  var type;
  var userSearch = {};

  // The POST contains a username and not an email
  if(req.body.username) {
    username = req.body.username;
    type = 'username';
    userSearch = { username: username };
  }
  // The POST contains an email and not an username
  else if(req.body.email) {
    username = req.body.email;
    type = 'email';
    userSearch = { email: username };
  }

  return {
    username: username,
    type: type,
    userSearch: userSearch
  }
}

module.exports = {
    sessionCreate: (req,res,next) => {
        var userScheme = getUserScheme(req);

        if (!userScheme.username || !req.body.password) {
            return res.status(400).send({message:"You must send the username and the password"});
        }

        var user = _.find(users, userScheme.userSearch);
        
        if (!user) {
            return res.status(401).send({message:"The username or password don't match"});
        }

        if (user.password !== req.body.password) {
            return res.status(401).send({message:"The username or password don't match"});
        }

        let id_token = createIdToken(user);
        let access_token = createAccessToken()
        
        res.status(201).send({
            id_token,
            access_token
        });
    },
    verifyAccessToken(token) {
        return jwt.verify(token, config.secret)
      }
}