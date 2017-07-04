const express = require('express');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();
const rp = require('request-promise');

const env = {
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN
};

/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  const idToken = req.user.extraParams.id_token;
  const userId = req.user.profile._json.sub;

  const options = {
    method: 'GET',
    uri: 'https://' + env.AUTH0_DOMAIN + '/api/v2/users/' + userId,
    auth: {
      bearer: idToken
    },
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(function(profile) {
      req.session.passport.user.fullProfile = profile;
      res.render('user', {
        user: req.user.fullProfile,
        userProfile: JSON.stringify(req.user.fullProfile, null, 2)
      });
    })
    .catch(function(err) {
      console.log(err);
      res.redirect('/');
    });
});

router.post('/update', ensureLoggedIn, function(req, res, next) {
  const idToken = req.user.extraParams.id_token;
  const userId = req.user.profile._json.sub;
  const country = req.body.country;

  const userData = { user_metadata: { country } };

  const options = {
    method: 'PATCH',
    uri: 'https://' + env.AUTH0_DOMAIN + '/api/v2/users/' + userId,
    body: userData,
    auth: {
      bearer: idToken
    },
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(function(profile) {
      req.session.passport.user.fullProfile = profile;
      res.redirect('/user');
    })
    .catch(function(err) {
      console.log('Patch Failed:' + err);
      res.redirect('/user');
    });
});

module.exports = router;
