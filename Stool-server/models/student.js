"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/bycrypt");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsTo(models.Grade);
      Student.hasMany(models.Note);
      Student.hasMany(models.Todo);
      Student.hasMany(models.Routine);
      Student.belongsToMany(models.Task, { through: models.StudentTasks });
      Student.belongsToMany(models.Notification, { through: models.StudentNotification });
    }
  }
  Student.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "fullName is required" },
          notNull: { msg: "fullName is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "email must be unique" },
        validate: {
          notEmpty: { msg: "email is required" },
          notNull: { msg: "email is required" },
          isEmail: { msg: "Must be email format!" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required" },
          notNull: { msg: "Password is required" },
          len: {
            args: [5],
          },
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
    },
    {
      sequelize,
      modelName: "Student",
    }
  );
  Student.beforeCreate((user, opt) => {
    user.password = hashPassword(user.password);
  });
  return Student;
};
