const { randomBytes, createHmac } = require("crypto");

const getSaltAndHashFromString = (userSalt, inputString) => {
  const salt = userSalt ? userSalt : randomBytes(256).toString("hex");

  const hashedKeys = createHmac("sha256", salt)
    .update(inputString)
    .digest("hex");

  return { salt, hashedKeys };
};

module.exports = { getSaltAndHashFromString };
