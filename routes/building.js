import { Router } from "express";
const router = Router();
import {
  listBuildings,
  getBuildingById,
  addBuilding,
  updateBuilding,
  deleteBuilding,
} from "../controllers/buildingController";
import authenticateToken from "../middleware/authenticateToken";

// List all buildings
router.get("/", authenticateToken, listBuildings);
router.get("/:id", authenticateToken, getBuildingById);
router.post("/", authenticateToken, addBuilding);
router.put("/:id", authenticateToken, updateBuilding);
router.delete("/:id", authenticateToken, deleteBuilding);

export default router;
