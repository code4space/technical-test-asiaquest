'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.Grade);
      Task.belongsTo(models.Teacher);
    }
  }
  Task.init({
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: "date is required" },
        notNull: { msg: "date is required" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "status is required" },
        notNull: { msg: "status is required" },
      },
    },
    TeacherID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "TeacherID is required" },
          notNull: { msg: "TeacherID is required" },
        },
      },
    GradeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "GradeID is required" },
          notNull: { msg: "GradeID is required" },
        },
      },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};