const mongoose = require("mongoose")
const {Schema, model} = mongoose

const tasksSchema = new Schema(
  {
    name: String,
    description: String,
    // owner: shold be the responsible person from task and a user of the API
  }
)

module.exports = model("Task", tasksSchema)