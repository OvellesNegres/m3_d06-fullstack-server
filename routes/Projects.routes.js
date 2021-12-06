const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Project = require("../models/Projects.model");

router.post("/", (req, res) => {
  const {
    title,
    description
  } = req.body;

  Project.create({
    title,
    description
  })
  .then(newProject=>res
    .status(200)
    .json(
      {
        message: "Project created.",
        data: newProject,
        error: null,
        // status: 200
      }
    ))
    .catch(error=> res
      .status(500)
      .json({
        error: error,
        message: null,
        data: null
      }))
});

router.get("/", (req, res) =>{
  Project
  .find()
  .populate("tasks")
  .then(projectsList=> res
    .status(200)
    .json({
      data: projectsList,
      message: null,
      error: null
    }))
    .catch(error=> res
      .status(500)
      .json({
        error: error,
        message: null,
        data: null
      })
    )
})

module.exports = router