import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// List All Staff Members

const getAllStaff = async (req, res) => {
  try {
    const staffMembers = await prisma.staff.findMany();
    res.status(200).json({
      status: "success",
      message: "Staff members retrieved successfully.",
      data: staffMembers,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve staff members.",
    });
  }
};

// Get Staff Member by ID
const getStaffById = async (req, res) => {
  const { id } = req.params;
  try {
    const staffMember = await prisma.staff.findUnique({
      where: { id: parseInt(id) },
    });
    if (staffMember) {
      res.status(200).json({
        status: "success",
        message: "Staff member retrieved successfully.",
        data: staffMember,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Staff member not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve staff member.",
    });
  }
};

module.exports = {
  getAllStaff,
  getStaffById,
};
