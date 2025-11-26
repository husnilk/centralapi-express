const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const authenticateToken = require("../middlewares/authenticateToken");

// List all departements
router.get("/", authenticateToken, departmentController.listDepartments);
router.get(
  "/faculty/:facultyId/departements",
  authenticateToken,
  departmentController.listDepartmentsByFacultyId
);
router.get("/:id", authenticateToken, departmentController.getDepartmentById);
router.post("/", authenticateToken, departmentController.addDepartment);
router.put("/:id", authenticateToken, departmentController.updateDepartment);
router.delete(
  "/:id",
  authenticateToken,
  departmentController.deleteDepartment
);

module.exports = router;
