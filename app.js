require("dotenv/config");
require("./db");
const express = require("express");

const app = express();

require("./config")(app);

// 👇 Start handling routes here

require("./error-handling")(app);

module.exports = app;
