"use strict";
const { hashPassword } = require("../helper/bycrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    static associate(models) {
      Teacher.hasMany(models.Task);
      Teacher.hasMany(models.Note);
      Teacher.hasMany(models.Todo);
      Teacher.hasMany(models.Routine);
    }
  }
  Teacher.init(
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
    },
    {
      sequelize,
      modelName: "Teacher",
    }
  );
  Teacher.beforeCreate((user, opt) => {
    user.password = hashPassword(user.password);
  });
  return Teacher;
};
