const express = require('express');
const router = express.Router();
const lecturerController = require('../controllers/lecturerController');

router.get('/', lecturerController.getAllLecturers);
router.post('/', lecturerController.addNewLecturer);
router.get('/:id', lecturerController.getLecturerById);
router.patch('/:id', lecturerController.updateLecturerById);
router.delete('/:id', lecturerController.deleteLecturerById);

module.exports = router;    