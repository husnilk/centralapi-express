const { PrismaClient } = require('../generated/prisma-client');
const prisma = new PrismaClient();

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await prisma.student.findMany();
        res.status(200).json({
            status: 'success',
            results: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: 'Failed to fetch students'
        });
    }
};

// Get a single student by ID
const getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await prisma.student.findUnique({
            where: { id: parseInt(id) },
            include: { user: true }
        });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({
            status: 'success',
            message: 'Student retrieved successfully',
            data: student
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch student' });
    }
}

// Add new student (commented out for future use)
const addNewStudent = async (req, res) => {
    const studentData = req.body;
    try {
        const newUser = await prisma.user.create({
            data: studentData.user
        })
        const newStudent = await prisma.student.create({
            data: {
                ...studentData,
                userId: newUser.id
            }
        });
        res.status(201).json({
            status: 'success',
            message: 'Student created successfully',
            data: newStudent
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: 'Failed to create student'
        });
    }
};

// Update student by ID (commented out for future use)
const updateStudentById = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedStudent = await prisma.student.update({
            where: { id: parseInt(id) },
            data: updateData
        });
        res.status(200).json({
            status: 'success',
            message: 'Student updated successfully',
            data: updatedStudent
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: 'Failed to update student'
        });
    }
};

//Delete student by ID (commented out for future use)
const deleteStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.student.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).json({
            status: 'success',
            message: 'Student deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: 'Failed to delete student'
        });
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    addNewStudent,
    updateStudentById,
    deleteStudentById
};