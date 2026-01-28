require("dotenv").config();
const express = require("express");
const { userRouter } = require("./routes");
const { jwtAuthenticator } = require("./middlewares");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// app.use(sessionAuthenticator);

app.use(jwtAuthenticator);

app.use("/users", userRouter);

app.listen(PORT, () => console.log(`🟡 LOG - : PORT `, PORT));
