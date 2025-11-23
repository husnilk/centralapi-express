const { PrismaClient } = require("../generated/prisma-client");
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

// Add a new department
const addDepartment = async (req, res) => {
  const { name, abbreviation, type, faculty_id } = req.body;
  try {
    const newDepartment = await prisma.department.create({
      data: {
        name,
        abbreviation,
        type,
        faculty_id,
      },
    });
    res.status(201).json({
      status: "success",
      message: "Department added successfully",
      department: newDepartment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to add department",
    });
  }
};

// Update department
const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name, abbreviation, type, faculty_id } = req.body;
  try {
    const updatedDepartment = await prisma.department.update({
      where: { id: parseInt(id) },
      data: {
        name,
        abbreviation,
        type,
        faculty_id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Department updated successfully",
      department: updatedDepartment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to update department",
    });
  }
};

// Delete department
const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.department.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({
      status: "success",
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete department",
    });
  }
};

module.exports = {
  listDepartments,
  listDepartmentsByFacultyId,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
