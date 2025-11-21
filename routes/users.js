var express = require("express");
var router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", authenticateToken, userController.listUser);
router.post("/", authenticateToken, userController.addUser);
router.put("/:id", authenticateToken, userController.editUser);
router.delete("/:id", authenticateToken, userController.deleteUser);

module.exports = router;
