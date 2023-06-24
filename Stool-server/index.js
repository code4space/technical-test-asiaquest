require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./router/router");
const port = 3000;

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(route);

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
