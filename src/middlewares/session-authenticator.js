const db = require("../db");
const { sessionTable, usersTable } = require("../db/schema");
const { eq } = require("drizzle-orm");

async function sessionAuthenticator(req, res, next) {
  if (!req.headers.sessionid) {
    return res.status(401).send("1 You are not logged in.");
  }
  try {
    const [existingSession] = await db
      .select()
      .from(sessionTable)
      .rightJoin(usersTable, eq(usersTable.id, sessionTable.userId))
      .where(eq(sessionTable.id, req.headers.sessionid));

    if (existingSession.session.id !== req.headers.sessionid) {
      return res.status(401).send("3 You are not logged in.");
    }
    req.user = existingSession;
    next();
  } catch (err) {
    return res.status(401).send("4 Server error ", err);
  }
}

module.exports = { sessionAuthenticator };
