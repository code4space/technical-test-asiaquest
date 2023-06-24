const route = require("express").Router();
const validation = require('../helper/authentication')
const AI = require("../controllers/ai");
const TeacherController = require("../controllers/teacher");
const StudentController = require("../controllers/student");
const NoteController = require("../controllers/note");

// Login/Register API
route.post("/teacher/login", TeacherController.login);
route.post("/teacher/register", TeacherController.register);

route.post("/student/login", StudentController.login);
route.post("/student/register", StudentController.register);

route.use(validation)

// Task
route.post("/task", TeacherController.addTask);
route.patch("/comment/:id", TeacherController.addComment);
route.get("/completed-task", TeacherController.completedTask);
route.patch("/do-task/:id", StudentController.doTask);
route.get("/student/task", StudentController.getMyTask);

// notification
route.get("/notification", StudentController.getMyNotification);
route.patch("/notification", StudentController.readNotification);

// quick note
route.get("/quick-note", NoteController.getQuickNote);
route.patch("/quick-note/:id", NoteController.updateQuickNote);
route.post("/quick-note", NoteController.addQuickNote);
route.delete("/quick-note/:id", NoteController.deleteQuickNote);

// Routine
route.get("/routine", NoteController.getRoutine);
route.patch("/routine/:id", NoteController.updateRoutine);
route.post("/routine", NoteController.addRoutine);
route.delete("/routine/:id", NoteController.deleteRoutine);

// Todo
route.get("/todo", NoteController.getRoutine);
route.patch("/todo/:id", NoteController.updateRoutine);
route.post("/todo", NoteController.addRoutine);
route.delete("/todo/:id", NoteController.deleteRoutine);

// AI API
route.post("/ask-ai", AI.askAI);

module.exports = route;
