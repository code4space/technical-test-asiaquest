"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentTasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StudentTasks.belongsTo(models.Task, { foreignKey: "TaskId" });
      StudentTasks.belongsTo(models.Student, { foreignKey: "StudentId" });
    }
  }
  StudentTasks.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "status is required" },
          notNull: { msg: "status is required" },
        },
      },
      answer: {
        type: DataTypes.TEXT,
      },
      answer1: {
        type: DataTypes.BLOB("long"),
      },
      TaskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "TaskId is required" },
          notNull: { msg: "TaskId is required" },
        },
      },
      StudentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "StudentId is required" },
          notNull: { msg: "StudentId is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "StudentTasks",
    }
  );
  return StudentTasks;
};
