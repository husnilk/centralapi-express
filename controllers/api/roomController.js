import { PrismaClient } from "../generated/prisma-client";
const prisma = new PrismaClient();

// List all rooms
const listRooms = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany();
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

// Get room by ID
const getRoomById = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await prisma.room.findUnique({
      where: { id: parseInt(id) },
    });
    if (room) {
      res.status(200).json({
        status: "success",
        message: "Room fetched successfully",
        room,
      });
    } else {
      res.status(404).json({ status: "failed", message: "Room not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch room",
    });
  }
};

export default {
  listRooms,
  getRoomById,
};
