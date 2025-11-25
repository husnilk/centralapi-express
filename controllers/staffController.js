const { PrismaClient } = require("../generated/prisma-client");
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
    res
      .status(500)
      .json({ status: "error", message: "Failed to retrieve staff member." });
  }
};

// Add New Staff Member
const addStaff = async (req, res) => {
  const {
    username,
    password,
    name,
    email,
    type,
    avatar,
    photo,
    nip,
    nik,
    karpeg,
    npwp,
    gender,
    birthday,
    birthplace,
    phone,
    address,
    department_id,
    marital_status,
    religion,
    association_type,
    status,
  } = req.body;

  try {
    const newUser = await prisma.staff.create({
      data: {
        username,
        password,
        name,
        email,
        type,
        avatar,
        photo
      }
    });

    const newStaff = await prisma.staffProfile.create({
      data: {
        id: newUser.id,
        nik,
        name,
        nip,
        karpeg,
        npwp,
        gender,
        birthday,
        birthplace,
        phone,
        address,
        department_id,
        marital_status,
        religion,
        association_type,
        status,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Staff member added successfully.",
      data: { ...newUser, ...newStaff },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "error",
        message: "Failed to add staff member."
      });
  }
};


// Update staff member
const updateStaff = async (req, res) => {
  const {
    username,
    password,
    name,
    email,
    type,
    avatar,
    photo,
    nip,
    nik,
    karpeg,
    npwp,
    gender,
    birthday,
    birthplace,
    phone,
    address,
    department_id,
    marital_status,
    religion,
    association_type,
    status,
  } = req.body;

  try {
    const updatedUser = await prisma.staff.update({
      where: { id: parseInt(req.params.id) },
      data: {
        username,
        password,
        name,
        email,
        type,
        avatar,
        photo
      }
    });

    const updatedStaff = await prisma.staffProfile.update({
      where: { id: parseInt(req.params.id) },
      data: {
        nik,
        name,
        nip,
        karpeg,
        npwp,
        gender,
        birthday,
        birthplace,
        phone,
        address,
        department_id,
        marital_status,
        religion,
        association_type,
        status,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Staff member updated successfully.",
      data: { ...updatedUser, ...updatedStaff },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "error",
        message: "Failed to update staff member."
      });
  }
}

const deleteStaff = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) },
    });

    await prisma.staff.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.status(204).send();
  }
  catch (error) {
    res
      .status(500)
      .json({
        status: "error",
        message: "Failed to delete staff member."
      });
  }
};

module.exports = {
  getAllStaff,
  getStaffById,
  addStaff,
  updateStaff,
  deleteStaff,
};
