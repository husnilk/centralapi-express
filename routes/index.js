var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "Welcome to the Central FTI API" }).status(200);
});

module.exports = router;
