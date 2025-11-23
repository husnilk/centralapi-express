const express = require("express");
const router = express.Router();
const buildingController = require("../controllers/buildingController");
const authenticateToken = require("../middlewares/authenticateToken");

// List all buildings
router.get("/", authenticateToken, buildingController.listBuildings);
router.get(
  "/building/:buildingId/rooms",
  authenticateToken,
  buildingController.listRoomsByBuildingId
);
router.get("/:id", authenticateToken, buildingController.getBuildingById);
router.post("/", authenticateToken, buildingController.addBuilding);
router.put("/:id", authenticateToken, buildingController.updateBuilding);
router.delete("/:id", authenticateToken, buildingController.deleteBuilding);

module.exports = router;
