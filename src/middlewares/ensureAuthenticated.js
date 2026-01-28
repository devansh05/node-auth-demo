function ensureAuthenticated(req, res, next) {
  try {
    if (!req.user) {
      throw new Error("Log in before proceeding ahead.");
    }
    next();
  } catch (err) {
    return res.status(401).send(err);
  }
}

module.exports = { ensureAuthenticated };
