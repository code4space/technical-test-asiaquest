require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const route = require("../router/router");
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(route);

module.exports = app