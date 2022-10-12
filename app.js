const express = require("express");
const app = express();
const env = require("dotenv").config();
const port = process.env.PORT || 5000;

const { mongoConnection } = require("./src/db/db");

mongoConnection();

app.use(express.json());

app.use("/user", require("./src/routes"));

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
