import { PrismaClient } from "../generated/prisma-client";
const prisma = new PrismaClient();

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json({
      status: "success",
      results: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch students",
    });
  }
};

// Get a single student by ID
const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
      include: { user: true },
    });
    if (!student) {
      return res.status(404).json({
        status: "error",
        message: "Student not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Student retrieved successfully",
      data: student,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch student" });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
};
