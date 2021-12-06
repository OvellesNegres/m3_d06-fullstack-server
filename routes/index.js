const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("All API routes are under '/api'. Please go there");
  // The tipical content is an html welcome page
  // with instructions on how to use the api.
});

module.exports = router;
