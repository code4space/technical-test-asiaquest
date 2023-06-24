const { matchPassword } = require("../helper/bycrypt");
const { formatDate } = require("../helper/dateFormatter");
const { getToken } = require("../helper/jwt");
const {
  Teacher,
  Task,
  Student,
  StudentTasks,
  Notification,
  StudentNotification,
} = require("../models");

class TeacherController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ message: "email is required" });
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      let user = await Teacher.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(401).json({ message: "Invalid Username/Password" });
      }

      const isTrue = matchPassword(password, user.password);
      if (!isTrue) {
        return res.status(401).json({ message: "Invalid Username/Password" });
      }

      const payload = { id: user.id, fullName: user.fullName, role: "teacher" };
      const access_token = getToken(payload);
      res.status(200).json({ access_token, name: user.fullName });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async register(req, res, next) {
    try {
      const { fullName, email, password } = req.body;
      if (!fullName) {
        return res.status(400).json({ message: "Username is required" });
      }
      if (!email) {
        return res.status(400).json({ message: "email is required" });
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      let user = await Teacher.create({ fullName, email, password });
      res.status(201).json({ id: user.id, name: user.fullName });
    } catch (error) {
      if (
        error.name == "SequelizeUniqueConstraintError" ||
        error.name == "SequelizeValidationError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async addTask(req, res, next) {
    try {
      const { date, title, description, GradeId } = req.body;
      const { id, role, fullName } = req.user;
      if (role !== "teacher") {
        return res.status(401).json({ message: "Forbidden" });
      }
      if (!date) {
        return res.status(400).json({ message: "date is required" });
      }
      if (!title) {
        return res.status(400).json({ message: "title is required" });
      }
      if (!description) {
        return res.status(400).json({ message: "description is required" });
      }
      if (!GradeId) {
        return res.status(400).json({ message: "GradeId is required" });
      }

      let task = await Task.create({
        date,
        title,
        description,
        TeacherId: +id,
        GradeId,
      });

      let student = await Student.findAll({
        where: {
          GradeId,
        },
      });

      let notification = await Notification.create({
        description: `${fullName} has assigned you a new task about ${title} that needs to be completed by ${formatDate(
          date
        )}`,
        GradeId,
      });

      for (const studentProfile of student) {
        await StudentTasks.create({
          status: "remaining",
          TaskId: task.id,
          StudentId: studentProfile.id,
        });

        await StudentNotification.create({
          status: false,
          NotificationId: notification.id,
          StudentId: studentProfile.id,
        });
      }

      res.status(201).json({ message: "Task has been added " });
    } catch (error) {
      console.log(error);
      if (
        error.name == "SequelizeUniqueConstraintError" ||
        error.name == "SequelizeValidationError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: error });
      }
    }
  }

  static async addComment(req, res, next) {
    try {
      const { comment, TaskId, StudentId } = req.body;
      const { role, fullName } = req.user;
      if (role !== "teacher") {
        return res.status(401).json({ message: "Forbidden" });
      }
      if (!comment) {
        return res.status(400).json({ message: "comment is required" });
      }
      if (!TaskId) {
        return res.status(400).json({ message: "TaskId is required" });
      }
      if (!StudentId) {
        return res.status(400).json({ message: "StudentId is required" });
      }

      await StudentTasks.update(
        {
          comment,
        },
        {
          where: {
            id: +req.params.id
          },
        }
      );

      let studentTask = await StudentTasks.findOne({
        where: {
          TaskId,
          StudentId,
        },
      });

      let task = await Task.findOne({
        where: { id: studentTask.TaskId },
      });

      let notification = await Notification.create({
        description: `The task titled "${task.title}" has been commented by ${fullName}`,
        GradeId: task.GradeId,
      });

      await StudentNotification.create({
        status: false,
        NotificationId: notification.id,
        StudentId
      });

      res.status(202).json({ message: "add comment success" });
    } catch (error) {
      console.log(error);
      if (
        error.name == "SequelizeUniqueConstraintError" ||
        error.name == "SequelizeValidationError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: error });
      }
    }
  }

  static async completedTask(req, res, next) {
    try {
      const { role, id } = req.user;
      if (role !== "teacher") {
        return res.status(401).json({ message: "Forbidden" });
      }

      let task = await Task.findAll({
        where: {
          TeacherId: id,
        }
      });

      let studentTask = [];

      for (const el of task) {
        console.log(el.id)
        let result = await StudentTasks.findAll({
          where: {
            TaskId: el.id,
            status: "completed",
          },
          attributes: [
            "id",
            "status",
            "answer",
            "answer1",
            "comment",
            "TaskId",
            "StudentId",
            "createdAt",
            "updatedAt",
          ],
          include: {
            model: Task,
            attributes: [
              'description',
              'title',
              'date',
            ]
          }
        });

        if (result) {
          studentTask.push(result);
        }
      }

      res.status(200).json({ completed: studentTask.flat(Infinity) });
    } catch (error) {
      console.log(error);
      if (
        error.name == "SequelizeUniqueConstraintError" ||
        error.name == "SequelizeValidationError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: error });
      }
    }
  }
}

module.exports = TeacherController;
