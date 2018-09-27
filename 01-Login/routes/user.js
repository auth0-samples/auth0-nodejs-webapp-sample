const express = require('express');
const protected = require('../lib/middleware/protected');
const router = express.Router();

/* GET user profile. */
router.get('/user', protected(), function(req, res, next) {
  res.render('user', {
    user: req.user ,
    userProfile: JSON.stringify(req.user, null, '  ')
  });
});

module.exports = router;
