const { sessionAuthenticator, jwtAuthenticator } = require("./authenticators");
const { ensureAuthenticated } = require("./ensureAuthenticated");
const { restrictToRole } = require("./restrictToRole");
module.exports = {
  ensureAuthenticated,
  sessionAuthenticator,
  jwtAuthenticator,
  restrictToRole
};
