const { matchPassword } = require("../helper/bycrypt");
const { formatDate, getDate } = require("../helper/dateFormatter");
const { getToken } = require("../helper/jwt");
const {
  Teacher,
  Task,
  Student,
  StudentTasks,
  Notification,
  StudentNotification,
} = require("../models");

class StudentController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) return res.status(400).json({ message: "email is required" });
      if (!password)
        return res.status(400).json({ message: "Password is required" });

      let user = await Student.findOne({
        where: {
          email,
        },
      });
      if (!user)
        return res.status(401).json({ message: "Invalid Username/Password" });

      const isTrue = matchPassword(password, user.password);
      if (!isTrue)
        return res.status(401).json({ message: "Invalid Username/Password" });

      const payload = { id: user.id, fullName: user.fullName, role: "student" };
      const access_token = getToken(payload);
      res.status(200).json({ access_token, name: user.fullName });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async register(req, res, next) {
    try {
      const { fullName, email, password, GradeId } = req.body;
      if (!fullName)
        return res.status(400).json({ message: "Username is required" });
      if (!email) return res.status(400).json({ message: "email is required" });
      if (!password)
        return res.status(400).json({ message: "Password is required" });
      if (!GradeId)
        return res.status(400).json({ message: "GradeId is required" });

      let user = await Student.create({ fullName, email, password, GradeId });
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

  static async doTask(req, res, next) {
    try {
      const { role, id } = req.user;
      const { TaskId, answer } = req.body;
      if (!TaskId) {
        return res.status(400).json({ message: "TaskId is required" });
      }
      if (role !== "student") {
        return res.status(401).json({ message: "Forbidden" });
      }

      await StudentTasks.update(
        { answer },
        {
          where: {
            TaskId: +TaskId,
            StudentId: id,
          },
        }
      );
      res.status(202).json({ message: "success input answer" });
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

  static async getMyTask(req, res, next) {
    try {
      const { role, id } = req.user;
      if (role !== "student") {
        return res.status(401).json({ message: "Forbidden" });
      }

      const task = await StudentTasks.findAll({
        where: {
          StudentId: +id,
        },
        attributes: ["id", "status", "answer", "comment"],
        include: {
          model: Task,
          attributes: ["date", "title", "description", "createdAt"],
          include: {
            model: Teacher,
            attributes: ["fullName"],
          },
        },
      });

      let result = [];
      for (let i = 0; i < task.length; i++) {
        let temp = task[i];
        result.push({
          id: temp.id,
          status: temp.status,
          answer: temp.answer,
          comment: temp.comment,
          releaseDate: formatDate(temp.Task.createdAt),
          deadline: formatDate(temp.Task.date),
          title: temp.Task.title,
          description: temp.Task.description,
          author: temp.Task.Teacher.fullName,
        });
      }

      res.status(200).json({ result });
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

  static async getMyNotification(req, res, next) {
    try {
      const { role, id } = req.user;
      if (role !== "student") {
        return res.status(401).json({ message: "Forbidden" });
      }

      const notification = await StudentNotification.findAll({
        where: {
          StudentId: +id,
        },
        attributes: ["id", "status", "createdAt"],
        include: {
          model: Notification,
          attributes: ["id", "description"],
        },
      });

      let result = [];
      for (let i = 0; i < notification.length; i++) {
        let temp = notification[i];
        result.push({
          id: temp.id,
          status: temp.status,
          description: temp.Notification.description,
          date: getDate(temp.createdAt),
        });
      }

      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
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

  static async readNotification(req, res, next) {
    try {
      const { role, id } = req.user;
      if (role !== "student") {
        return res.status(401).json({ message: "Forbidden" });
      }

      await StudentNotification.update(
        {
          status: true,
        },
        {
          where: {
            StudentId: +id,
          },
        }
      );

      res.status(202).json({ message: "Update Notification Success" });
    } catch (error) {
      console.log(error);
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
}

module.exports = StudentController;
