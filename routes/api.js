import { Router } from "express";
import facultyController from "../controllers/api/facultyController";
const router = Router();
const authenticateApiToken = require("../middlewares/authenticateApiToken");
const buildingController = require("../controllers/api/buildingController");
const roomController = require("../controllers/api/roomController");
const facultyController = require("../controllers/api/facultyController");
const departmentController = require("../controllers/api/departmentController");
const studentController = require("../controllers/api/studentController");
const lecturerController = require("../controllers/api/lecturerController");
const staffController = require("../controllers/api/staffController");

router.get(
  "/buildings",
  authenticateApiToken,
  buildingController.listBuildings,
);
router.get(
  "/buildings/:id/rooms",
  authenticateApiToken,
  roomController.listRoomsByBuildingId,
);
router.get(
  "/buildings/:id",
  authenticateApiToken,
  buildingController.getBuildingById,
);
router.get("/rooms", authenticateApiToken, roomController.listRooms);
router.get("/rooms/:id", authenticateApiToken, roomController.getRoomById);
router.get("/faculties", authenticateApiToken, facultyController.listFaculties);
router.get(
  "/faculties/:id/departments",
  authenticateApiToken,
  departmentController.listDepartmentsByFacultyId,
);
router.get(
  "/faculties/:id",
  authenticateApiToken,
  facultyController.getFacultyById,
);
router.get(
  "/departments",
  authenticateApiToken,
  departmentController.listDepartments,
);
router.get(
  "/departments/:id",
  authenticateApiToken,
  departmentController.getDepartmentById,
);
router.get("/students", authenticateApiToken, studentController.listStudents);
router.get(
  "/students/:id",
  authenticateApiToken,
  studentController.getStudentById,
);
router.get(
  "/lecturers",
  authenticateApiToken,
  lecturerController.listLecturers,
);
router.get(
  "/lecturers/:id",
  authenticateApiToken,
  lecturerController.getLecturerById,
);
router.get("/staff", authenticateApiToken, staffController.listStaff);
router.get("/staff/:id", authenticateApiToken, staffController.getStaffById);
