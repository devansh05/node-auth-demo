require("dotenv").config();
const { eq } = require("drizzle-orm");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { sessionTable, usersTable } = require("../db/schema");

async function sessionAuthenticator(req, res, next) {
  if (!req.headers.sessionid) {
    return res.status(401).send("You are not logged in.");
  }
  try {
    const [existingSession] = await db
      .select()
      .from(sessionTable)
      .rightJoin(usersTable, eq(usersTable.id, sessionTable.userId))
      .where(eq(sessionTable.id, req.headers.sessionid));

    if (existingSession.session.id !== req.headers.sessionid) {
      return res.status(401).send("You are not logged in.");
    }
    req.user = existingSession;
    next();
  } catch (err) {
    return res.status(401).send("Server error ", err);
  }
}

async function jwtAuthenticator(req, res, next) {
  try {
    console.log(`🟡 LOG - req.headers: `, req.headers);
    const tokenHeader = req.headers["authorization"];
    console.log(`🟡 LOG - tokenHeader: `, tokenHeader);
    // Header authorization : Bearer <token>
    if (!tokenHeader) {
      throw new Error("No bearer token available.");
    }

    if (!tokenHeader.startsWith("Bearer")) {
      throw new Error("The token must start with - Bearer");
    }

    const token = tokenHeader.split(" ")[1];
    console.log(`🟡 LOG - token: `, token);

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`🟡 LOG - decodedData: `, decodedData);

    req.user = decodedData;
    console.log(`🟡 LOG - req 1 : `, req);
    next();
  } catch (err) {
    return res.status(401).send(err);
  }
}

module.exports = { sessionAuthenticator, jwtAuthenticator };
