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
      Task.belongsToMany(models.Student, { through: models.StudentTasks });
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "title is required" },
        notNull: { msg: "title is required" },
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
    TeacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "TeacherId is required" },
          notNull: { msg: "TeacherId is required" },
        },
      },
    GradeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "GradeId is required" },
          notNull: { msg: "GradeId is required" },
        },
      },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};