const { PrismaClient } = require("../generated/prisma-client");
const prisma = new PrismaClient();

//List all faculty
const listFaculty = async (req, res) => {
  try {
    const faculty = await prisma.faculty.findMany();
    res.status(200).json({
      status: "success",
      message: "Faculty fetched successfully",
      faculty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch faculty",
    });
  }
};

//Get faculty by ID
const getFacultyById = async (req, res) => {
  const { id } = req.params;
  try {
    const faculty = await prisma.faculty.findUnique({
      where: { id: parseInt(id) },
    });
    if (faculty) {
      res.status(200).json({
        status: "success",
        message: "Faculty fetched successfully",
        faculty,
      });
    } else {
      res.status(404).json({ status: "failed", message: "Faculty not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch faculty",
    });
  }
};

//Add a new faculty
const addFaculty = async (req, res) => {
  const { name, abbreviation, type } = req.body;
  try {
    const newFaculty = await prisma.faculty.create({
      data: {
        name,
        abbreviation,
        type,
      },
    });
    res.status(201).json({
      status: "success",
      message: "Faculty added successfully",
      faculty: newFaculty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to add faculty",
    });
  }
};

// Update faculty
const updateFaculty = async (req, res) => {
  const { id } = req.params;
  const { name, abbreviation, type } = req.body;
  try {
    const updatedFaculty = await prisma.faculty.update({
      where: { id: parseInt(id) },
      data: {
        name,
        abbreviation,
        type,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Faculty updated successfully",
      faculty: updatedFaculty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to update faculty",
    });
  }
};

// Delete faculty
const deleteFaculty = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.faculty.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({
      status: "success",
      message: "Faculty deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete faculty",
    });
  }
};

module.exports = {
  listFaculty,
  getFacultyById,
  addFaculty,
  updateFaculty,
  deleteFaculty,
};
