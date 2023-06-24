const {
  Note,
  Routine,
  Todo
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
    try {
      const { role, id } = req.user;
      const { title, description } = req.body;

      if (role === "student") {
        await Note.create({ title, description, StudentId: id });
      } else {
        await Note.create({ title, description, TeacherId: id });
      }
      return res.status(201).json({ message: "new Note has been created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
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

  static async getTodo(req, res, next) {
    try {
      const { role, id } = req.user;
      let todo;
      if (role === "student") {
        todo = await Todo.findAll({
          where: {
            StudentId: id,
          },
          attributes: ["id", "task", "status", "comment"],
        });
      } else {
        todo = await Todo.findAll({
          where: {
            TeacherId: id,
          },
          attributes: ["id", "task", "status", "comment"],
        });
      }

      return res.status(200).json({ todo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateTodo(req, res, next) {
    try {
      const { task, status, comment } = req.body;
      await Todo.update(
        { task, status, comment },
        {
          where: { id: +req.params.id },
        }
      );
      return res.status(202).json({ message: "Update Todo success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async addTodo(req, res, next) {
    try {
      const { role, id } = req.user;
      const { task, status, comment } = req.body;

      if (role === "student") {
        await Todo.create({ task, status, comment, StudentId: id });
      } else {
        await Todo.create({ task, status, comment, TeacherId: id });
      }
      return res.status(201).json({ message: "new Todo has been created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteTodo(req, res, next) {
    try {
      await Todo.destroy({
        where: { id: +req.params.id },
      });
      return res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getRoutine(req, res, next) {
    try {
      const { role, id } = req.user;
      let routine;
      if (role === "student") {
        routine = await Routine.findAll({
          where: {
            StudentId: id,
          },
          attributes: ["id", "title", "list"],
        });
      } else {
        routine = await Routine.findAll({
          where: {
            TeacherId: id,
          },
          attributes: ["id", "title", "list"],
        });
      }

      routine = routine.map((el) => {
        // return JSON.parse(el.list);
        var modifiedStr = "[" + el.list + "]";
        var parsedArray = JSON.parse(modifiedStr);
        return {
          id: el.id,
          title: el.title,
          list: parsedArray,
        };
      });

      return res.status(200).json({ routine });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateRoutine(req, res, next) {
    try {
      const { title, list } = req.body;

      let temp = [
        { desc: "Jogging", status: false },
        { desc: "Read Book", status: true },
        { desc: "Slep", status: false },
        { desc: "Jogging", status: true },
      ];

      temp = temp.map((el) => {
        return JSON.stringify(el);
      });

      temp = temp.join(",");

      await Routine.update(
        { title, list: temp },
        {
          where: { id: +req.params.id },
        }
      );
      return res.status(202).json({ message: "Update Routine success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async addRoutine(req, res, next) {
    try {
      const { role, id } = req.user;
      const { title, list } = req.body;

      let temp = list;

      temp = temp.map((el) => {
        return JSON.stringify(el);
      });

      temp = temp.join(",");

      if (role === "student") {
        await Routine.create({ title, list: temp, StudentId: id });
      } else {
        await Routine.create({ title, list: temp, TeacherId: id });
      }

      return res.status(201).json({ message: "new Routine has been created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteRoutine(req, res, next) {
    try {
      await Routine.destroy({
        where: { id: +req.params.id },
      });
      return res.status(200).json({ message: "routine deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = NoteController;
