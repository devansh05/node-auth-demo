const db = require("../db");
const { usersTable } = require("../db/schema");
const { eq } = require("drizzle-orm");
const { getSaltAndHashFromString } = require("../utilities/utilities");

const getAllUsers = async (_, res) =>
  res.send(await db.select().from(usersTable));

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (existingUser) {
      return res.status(400).send("User with this email already present.");
    }

    const { salt, hashedKeys } = getSaltAndHashFromString(password);

    const [userAdded] = await db
      .insert(usersTable)
      .values({ name, email, password: hashedKeys, salt })
      .returning({ id: usersTable.id });

    return res.send(`Signed up user successfully. ${userAdded.id}`);
  } catch (err) {
    console.error(`🔴🔴🔴 LOG - : ERROR`, err);
    return res.status(400).send("SERVER ERROR: ", err);
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(email, usersTable.email));
    if (!existingUser?.email || !existingUser?.salt) {
      return res.status(400).send("User not found. Please sign up.");
    }

    const { _salt, hashedKeys } = getSaltAndHashFromString(
      existingUser?.salt,
      password,
    );

    if (existingUser?.password !== hashedKeys) {
      return res.status(400).send("Wrong username or password.");
    }
    return res.status(200).send("Signed in successfully");
  } catch (err) {
    console.error(`🔴🔴🔴 LOG - : ERROR`, err);
    return res.status(400).send("SERVER ERROR: ", err);
  }
};

module.exports = { getAllUsers, signUpUser, loginUser };
