module.exports = function requireRole(role) {
  return function(req, res, next) {
    var userMetadata = req.user.profile._json.user_metadata || {};
    var roles = userMetadata.roles || [];

    if (roles.indexOf(role) != -1) {
      next();
    } else {
      res.redirect('/unauthorized');
    }
  }
}
