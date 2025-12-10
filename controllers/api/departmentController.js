import { PrismaClient } from "../generated/prisma-client";
const prisma = new PrismaClient();

// List all departments
const listDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany();
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

// Get department by ID
const getDepartmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await prisma.department.findUnique({
      where: { id: parseInt(id) },
    });
    if (department) {
      res.status(200).json({
        status: "success",
        message: "Department fetched successfully",
        department,
      });
    } else {
      res
        .status(404)
        .json({ status: "failed", message: "Department not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch department",
    });
  }
};

export default {
  listDepartments,
  getDepartmentById,
};
