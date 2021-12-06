const express = require("express"); // we should be able to run ES6 syntax with import statement
const router = express.Router();
const mongoose = require("mongoose");

// if we want to build the response object from a factory
// we should have this impoted from a utils folder
// const createResponseObject = require("../utils")

const Task = require("../models/Tasks.model")

router.post("/", (req, res)=>{
  const {
    name,
    description,
  } = req.body;

  Task.create({
    name,
    description,
  })
  .then(newTask => res
    .status(200)
    .json(
      {
        message: "Task created",
        // status: 200,
        error: null,
        data: newTask
      }
    ))
    .catch(error => res
      .status(500)
      .json(
        {
          message: null,
          // status: 500,
          error: error,
          data: null
        }
      )
    )
})

router.get("/", (req, res)=>{
  Task
  .find()
  .then(tasksList => res
    .status(200)
    .json(
      {
        message: null,
        error: null,
        data: tasksList, // this is an array, we should keep in mind for later
        // status: 200
      }
    ))
})

module.exports = router