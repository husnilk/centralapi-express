import { PrismaClient } from "../generated/prisma-client";
const prisma = new PrismaClient();

//List all faculty
const listFaculties = async (req, res) => {
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

//List departments by Faculty ID
const listDepartmentsByFacultyId = async (req, res) => {
  const { facultyId } = req.params;
  try {
    const departments = await prisma.department.findMany({
      where: { faculty_id: parseInt(facultyId) },
    });
    res.status(200).json({
      status: "success",
      message: "Departments fetched successfully",
      departments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch departments",
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

export default {
  listFaculties,
  listDepartmentsByFacultyId,
  getFacultyById,
};
