require('dotenv').config()
const express = require("express");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Successfully initialized.");
});

app.listen(PORT, () => console.log(`🟡 LOG - : PORT `, PORT));
