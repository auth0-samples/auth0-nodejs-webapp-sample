var express = require('express');
var protected = require('../lib/middleware/protected');
var router = express.Router();

/* GET user profile. */
router.get('/user', protected(), function(req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  res.render('user', {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: 'Profile page'
  });
});

module.exports = router;
