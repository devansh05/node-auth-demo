const { randomBytes, createHmac } = require("crypto");

const getSaltAndHashFromString = (inputString) => {
  const salt = randomBytes(256).toString("hex");

  const hashedKeys = createHmac("sha256", salt)
    .update(inputString)
    .digest("hex");

  return { salt, hashedKeys };
};

module.exports = { getSaltAndHashFromString };
