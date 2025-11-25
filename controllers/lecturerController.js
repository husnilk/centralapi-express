const { PrismaClient } = require('../generated/prisma-client');
const prisma = new PrismaClient();

// Get all lecturers
const getAllLecturers = async (req, res) => {
    try {
        const lecturers = await prisma.lecturer.findMany();
        res.status(200).json({
            status: 'success',
            results: lecturers.length,
            data: lecturers
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lecturers' });
    }
};

// Get a single lecturer by ID
const getLecturerById = async (req, res) => {
    const { id } = req.params;
    try {
        const lecturer = await prisma.lecturer.findUnique({
            where: { id: parseInt(id) },
            with: { user: true }
        });
        if (!lecturer) {
            return res.status(404).json({ error: 'Lecturer not found' });
        }
        res.status(200).json({
            status: 'success',
            message: 'Lecturer retrieved successfully',
            data: lecturer
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch lecturer' });
    }
}

// Add new lecturer (commented out for future use)
const addNewLecturer = async (req, res) => {
    const lecturerData = req.body;
    try {
        const newUser = await prisma.user.create({
            data: lecturerData.user
        })
        const newLecturer = await prisma.lecturer.create({
            data: {
                ...lecturerData,
                userId: newUser.id
            }
        });
        res.status(201).json({
            status: 'success',
            message: 'Lecturer created successfully',
            data: newLecturer
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: 'Failed to create lecturer'
        });
    }
}

// Update a lecturer by ID (commented out for future use)
const updateLecturerById = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedLecturer = await prisma.lecturer.update({
            where: { id: parseInt(id) },
            data: updateData
        });
        res.status(200).json({
            status: 'success',
            message: 'Lecturer updated successfully',
            data: updatedLecturer
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: 'Failed to update lecturer'
        });
    }
}

//Delete a lecturer by ID (commented out for future use)
const deleteLecturerById = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.lecturer.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({
            status: 'success',
            message: 'Lecturer deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: 'Failed to delete lecturer'
        });
    }
}

module.exports = {
    getAllLecturers,
    getLecturerById,
    addNewLecturer,
    updateLecturerById,
    deleteLecturerById
};