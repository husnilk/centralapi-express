const { PrismaClient } = require("../generated/prisma-client");
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

//List room by Building ID
const listRoomsByBuildingId = async (req, res) => {
  const { buildingId } = req.params;
  try {
    const rooms = await prisma.room.findMany({
      where: { building_id: parseInt(buildingId) },
    });
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

// Add a new room
const addRoom = async (req, res) => {
  const {
    name,
    abbreviation,
    floor,
    number,
    capacity,
    size,
    location,
    public,
    availability,
    type,
    building_id,
  } = req.body;
  try {
    const newRoom = await prisma.room.create({
      data: {
        name,
        abbreviation,
        floor,
        number,
        capacity,
        size,
        location,
        public,
        availability,
        type,
        building_id,
      },
    });
    res.status(201).json({
      status: "success",
      message: "Room added successfully",
      room: newRoom,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to add room",
    });
  }
};

// Update room details
const updateRoom = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    abbreviation,
    floor,
    number,
    capacity,
    size,
    location,
    public,
    availability,
    type,
    building_id,
  } = req.body;
  try {
    const updatedRoom = await prisma.room.update({
      where: { id: parseInt(id) },
      data: {
        name,
        abbreviation,
        floor,
        number,
        capacity,
        size,
        location,
        public,
        availability,
        type,
        building_id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Room updated successfully",
      room: updatedRoom,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to update room",
    });
  }
};

// Delete a room
const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.room.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({
      status: "success",
      message: "Room deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete room",
    });
  }
};

module.exports = {
  listRooms,
  listRoomsByBuildingId,
  getRoomById,
  addRoom,
  updateRoom,
  deleteRoom,
};
