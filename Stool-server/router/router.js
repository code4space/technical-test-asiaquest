const route = require("express").Router();
const validation = require('../helper/authentication')
const AI = require("../controllers/ai");
const TeacherController = require("../controllers/teacher");
const StudentController = require("../controllers/student");
const Note = require("../controllers/note");

// Login/Register API
route.post("/teacher/login", TeacherController.login);
route.post("/teacher/register", TeacherController.register);

route.post("/student/login", StudentController.login);
route.post("/student/register", StudentController.register);

route.use(validation)

// Task
route.post("/task", TeacherController.addTask);

// AI API
route.post("/ask-ai", AI.askAI);

module.exports = route;
