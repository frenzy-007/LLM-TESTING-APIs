const express = require("express");
const app = express();

require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<div>
    <h1>Welcome to LLM Promt!!!</h1>
    <form>
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname">
  <input type="submit" value="Submit">
</form></div>`);
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: message,
    });

    res.json({
      reply: response.text,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
