const {
  Teacher,
  Task,
  Student,
  StudentTasks,
  Notification,
  StudentNotification,
  Note,
} = require("../models");

class NoteController {
  static async getQuickNote(req, res, next) {
    try {
      const { role, id } = req.user;
      let note;
      if (role === "student") {
        note = await Note.findAll({
          where: {
            StudentId: id,
          },
          attributes: ["id", "title", "description"],
        });
      } else {
        note = await Note.findAll({
          where: {
            TeacherId: id,
          },
          attributes: ["id", "title", "description"],
        });
      }

      return res.status(200).json({ note });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateQuickNote(req, res, next) {
    try {
      const { title, description } = req.body;
      await Note.update(
        { title, description },
        {
          where: { id: +req.params.id },
        }
      );
      return res.status(202).json({ message: "Update Note success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async addQuickNote(req, res, next) {
    const { role, id } = req.user;
    const { title, description } = req.body;

    if (role === "student") {
      await Note.create({ title, description, StudentId: id });
    } else {
      await Note.create({ title, description, TeacherId: id });
    }
    return res.status(201).json({ message: "new Note has been created" });
  }
  catch(error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }

  static async deleteQuickNote(req, res, next) {
    try {
      await Note.destroy({
        where: { id: +req.params.id },
      });
      return res.status(200).json({ message: "note deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = NoteController;
