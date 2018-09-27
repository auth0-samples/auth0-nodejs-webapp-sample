const express = require('express');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();

/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  const { _raw, _json, ...passportProfile } = req.user;

  res.render('user', {
    user: req.user,
    passportProfile: JSON.stringify(passportProfile, null, 2),
    auth0UserInfo: JSON.stringify(_json, null, 2),
  });
});

module.exports = router;
