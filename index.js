const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to LLM Gemini API!!!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
