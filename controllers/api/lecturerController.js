import { PrismaClient } from "../generated/prisma-client";
const prisma = new PrismaClient();

// Get all lecturers
const getAllLecturers = async (req, res) => {
  try {
    const lecturers = await prisma.lecturer.findMany();
    res.status(200).json({
      status: "success",
      results: lecturers.length,
      data: lecturers,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch lecturers",
    });
  }
};

// Get a single lecturer by ID
const getLecturerById = async (req, res) => {
  const { id } = req.params;
  try {
    const lecturer = await prisma.lecturer.findUnique({
      where: { id: parseInt(id) },
      with: { user: true },
    });
    if (!lecturer) {
      return res.status(404).json({
        status: "error",
        message: "Lecturer not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Lecturer retrieved successfully",
      data: lecturer,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch lecturer",
    });
  }
};

module.exports = {
  getAllLecturers,
  getLecturerById,
};
