const { PrismaClient } = require("../generated/prisma-client");
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
      status: "erro",
      message: "Failed to fetch buildings",
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

//Add a new building
const addBuilding = async (req, res) => {
  const { name, abbreviation, floors, build_year, type } = req.body;
  try {
    const newBuilding = await prisma.building.create({
      data: {
        name,
        abbreviation,
        floors,
        build_year,
        type,
      },
    });
    res.status(201).json({
      status: "success",
      message: "Building added successfully",
      building: newBuilding,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to add building",
    });
  }
};

const updateBuilding = async (req, res) => {
  const { id } = req.params;
  const { name, abbreviation, floors, build_year, type } = req.body;
  try {
    const updatedBuilding = await prisma.building.update({
      where: { id: parseInt(id) },
      data: {
        name,
        abbreviation,
        floors,
        build_year,
        type,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Building updated successfully",
      building: updatedBuilding,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to update building",
    });
  }
};

//Delete a building
const deleteBuilding = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.building.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({
      status: "success",
      message: "Building deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete building",
    });
  }
};

module.exports = {
  listBuildings,
  getBuildingById,
  addBuilding,
  updateBuilding,
  deleteBuilding,
};
