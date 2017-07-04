var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var rp = require('request-promise');

var env = {
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN
};

/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  var idToken = req.user.extraParams.id_token;
  var userId = req.user.profile._json.sub

  var options = {
    method: 'GET',
    uri: 'https://' + env.AUTH0_DOMAIN + '/api/v2/users/' + userId,
    auth: {
      'bearer': idToken
    },
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(function (profile) {
      req.session.passport.user.fullProfile = profile
      res.render('user', {
        user: req.user.fullProfile,
        userProfile: JSON.stringify(req.user.fullProfile, null, 2)
      });
    })
    .catch(function (err) {
      console.log(err);
      res.redirect('/');
    });
});


router.post('/update', ensureLoggedIn, function(req, res, next) {
  var idToken = req.user.extraParams.id_token;
  var userId = req.user.profile._json.sub
  var country = req.body.country

  var userData = { "user_metadata": { "country": country } }

  var options = {
    method: 'PATCH',
    uri: 'https://' + env.AUTH0_DOMAIN + '/api/v2/users/' + userId,
    body: userData,
    auth: {
      'bearer': idToken
    },
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(function (profile) {
      req.session.passport.user.fullProfile = profile
      res.redirect('/user');
    })
    .catch(function (err) {
      console.log("Patch Failed:" + err);
      res.redirect('/user');
    });
});

module.exports = router;
