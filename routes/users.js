var express = require("express");
var router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const userController = require("../controllers/userController");
const {
  createUserValidators,
  updateUserValidators,
  idParamValidator,
  validate,
} = require("../validators/userValidators");

/* GET users listing. */
router.get("/", authenticateToken, userController.listUser);
router.post(
  "/",
  authenticateToken,
  createUserValidators,
  validate,
  userController.addUser
);
router.put(
  "/:id",
  authenticateToken,
  updateUserValidators,
  validate,
  userController.editUser
);
router.delete(
  "/:id",
  authenticateToken,
  idParamValidator,
  validate,
  userController.deleteUser
);

module.exports = router;
