require("dotenv").config();
const express = require("express");
const { userRouter } = require("./routes");
const { sessionAuthenticator } = require("./middlewares");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(sessionAuthenticator);

app.use("/users", userRouter);

app.listen(PORT, () => console.log(`🟡 LOG - : PORT `, PORT));
