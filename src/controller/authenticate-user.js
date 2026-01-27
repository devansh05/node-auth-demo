const signUpUser = (req, res) => {
  console.log(`🟡 LOG - : SIGN UP`);
  res.send("SIGN UP");
};
const loginUser = (req, res) => {
  console.log(`🟡 LOG - : LOG IN`);
  res.send("LOGGED IN");
};

module.exports = { signUpUser, loginUser };
