function restrictToRole(role) {
  return function (req, res, next) {
    if (req.user.role !== role) {
      return res.status(401).json({ error: "Your are not authorized." });
    }
    return next();
  };
}

module.exports = { restrictToRole };
