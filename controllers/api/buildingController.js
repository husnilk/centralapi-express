import { PrismaClient } from "../generated/prisma-client";
const prisma = new PrismaClient();

//List all buildings
const listBuildings = async (req, res) => {
  try {
    const buildings = await prisma.building.findMany();
    res.status(200).json({
      status: "success",
      message: "Buildings fetched successfully",
      buildings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch buildings",
    });
  }
};

//List room by Building ID
const listRoomsByBuildingId = async (req, res) => {
  const { buildingId } = req.params;
  try {
    const rooms = await prisma.room.findMany({
      where: { building_id: parseInt(buildingId) },
    });
    res.status(200).json({
      status: "success",
      message: "Rooms fetched successfully",
      rooms,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch rooms",
    });
  }
};

//Get building by ID
const getBuildingById = async (req, res) => {
  const { id } = req.params;
  try {
    const building = await prisma.building.findUnique({
      where: { id: parseInt(id) },
    });
    if (building) {
      res.status(200).json({
        status: "success",
        message: "Building fetched successfully",
        building,
      });
    } else {
      res.status(404).json({ status: "failed", message: "Building not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch building",
    });
  }
};

module.exports = {
  listBuildings,
  listRoomsByBuildingId,
  getBuildingById,
};
