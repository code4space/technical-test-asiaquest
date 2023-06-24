const { matchPassword } = require("../helper/bycrypt");
const { getToken } = require("../helper/jwt");
const { Teacher, Task } = require("../models");

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
      res.status(200).json({ access_token });
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
      const {id, role} = req.user
      console.log(date, title, description, GradeId)
      if (role !== 'teacher') {
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

      await Task.create({ date, title, description, TeacherId: +id, GradeId });


      res.status(201).json({ message: "Task has been added " });
    } catch (error) {
      console.log(error)
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
