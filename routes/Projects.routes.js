const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Project = require("../models/Projects.model");

router
  .route("/:projectId/tasks")
  .delete((req, res) => {
    const { projectId } = req.params;
    const { taskId } = req.body;

    Project.findByIdUndUpdate(
      projectId,
      { $pull: { tasks: { _id: taskId } } },
      { new: true }
    )
      .populate("tasks")
      .then((updatedProject) =>
        res.status(200).json({
          data: updatedProject,
          error: null,
          mesage: "Task added to project",
        })
      )
      .catch((error) =>
        res.status(500).json({
          data: null,
          message: "Something went wrong",
          error: error,
        })
      );
  })
  .put((req, res) => {
    const { projectId } = req.params;
    const { taskId } = req.body;

    Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { tasks: taskId } },
      { new: true }
    )
      .populate("tasks")
      .then((updatedProject) =>
        res.status(200).json({
          data: updatedProject,
          error: null,
          mesage: "Task added to project",
        })
      )
      .catch((error) =>
        res.status(500).json({
          data: null,
          message: "Something went wrong",
          error: error,
        })
      );
  });

router.route("/:id")
.put((req, res)=>{
  const { id } = req.params;
  const { title, description } = req.body;

  Project.findByIdAndUpdate(id, { title, description }, { new: true })
  .populate("tasks")
  .then((updatedProject) => res
    .status(200)
    .json({
      data: updatedProject,
      message: null,
      error: null,
      pagination: null,
    })
  )
  .catch((error) => res
    .status(500)
    .json({
      error: error,
      message: `Could not update Project with id: ${id}`,
      data: null,
      pagination: null,
    })
  );

})

.get((req, res) => {
  const { id } = req.params;

  Project.findById(id)
    .populate("tasks")
    .then((oneProject) =>
      res.status(200).json({
        data: oneProject,
        message: null,
        error: null,
        pagination: null,
      })
    )
    .catch((error) =>
      res.status(500).json({
        error: error,
        message:
          "Something went wrong, not sure what. Read the error mesage if you really want to know.",
        data: null,
        pagination: null,
      })
    );
});

router.post("/", (req, res) => {
  const { title, description } = req.body;

  Project.create({
    title,
    description,
  })
    .then((newProject) =>
      res.status(200).json({
        message: "Project created.",
        data: newProject,
        error: null,
        // status: 200
      })
    )
    .catch((error) =>
      res.status(500).json({
        error: error,
        message: null,
        data: null,
      })
    );
});

router.get("/", (req, res) => {
  Project.find()
    // .limit() // Is used to limit the number of items per page
    // .skip() // skip is used to simulate pages
    .populate("tasks")
    .then((projectsList) =>
      res.status(200).json({
        data: projectsList,
        message: null,
        error: null,
        // pagination: {count: projectsLIst.length, ...}
      })
    )
    .catch((error) =>
      res.status(500).json({
        error: error,
        message: null,
        data: null,
      })
    );
});

module.exports = router;
