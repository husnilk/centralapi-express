const express = require("express");
const router = express.Router();
const departementController = require("../controllers/departementController");
const authenticateToken = require("../middleware/authenticateToken");

// List all departements
router.get("/", authenticateToken, departementController.listDepartements);
router.get(
  "/faculty/:facultyId/departements",
  authenticateToken,
  departementController.listDepartementsByFacultyId
);
router.get("/:id", authenticateToken, departementController.getDepartementById);
router.post("/", authenticateToken, departementController.addDepartement);
router.put("/:id", authenticateToken, departementController.updateDepartement);
router.delete(
  "/:id",
  authenticateToken,
  departementController.deleteDepartement
);

module.exports = router;
