const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/facultyController");
const authenticateToken = require("../middlewares/authenticateToken");

// List all faculties
router.get("/", authenticateToken, facultyController.listFaculties);
router.get("/:id", authenticateToken, facultyController.getFacultyById);
router.post("/", authenticateToken, facultyController.addFaculty);
router.put("/:id", authenticateToken, facultyController.updateFaculty);
router.delete("/:id", authenticateToken, facultyController.deleteFaculty);

module.exports = router;
