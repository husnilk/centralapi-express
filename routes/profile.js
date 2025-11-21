var express = require("express");
var router = express.Router();

const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/", authenticateToken, getProfile);
router.put("/", authenticateToken, updateProfile);

module.exports = router;
