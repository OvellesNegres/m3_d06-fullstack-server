require("dotenv/config");
require("./db");
const express = require("express");

const app = express();

require("./config")(app);

// 👇 Start handling routes here
const indexRoute = require("./routes")
app.use("/", indexRoute)

const projectRouter = require("./routes/Projects.routes")
app.use("/api/projects", projectRouter)

const taskRouter = require("./routes/Tasks.routes")
app.use("/api/tasks", taskRouter)

require("./error-handling")(app);

module.exports = app;
