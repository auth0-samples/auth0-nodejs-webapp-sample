/**
 * This is an example middleware that checks the user's in the session.
 *
 * If the user is not logged in, it stores the url in `redirectTo` attribute
 * and then it redirects to `/login`.
 *
 */
module.exports = function() {
  return function protected(req, res, next) {
    if (req.user) { return next(); }
    req.session.returnTo = req.originalUrl;
    res.redirect('/login');
  }
};
