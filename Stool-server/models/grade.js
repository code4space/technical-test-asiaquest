"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    static associate(models) {
      Grade.hasMany(models.Student);
      Grade.hasMany(models.Task);
    }
  }
  Grade.init(
    {
      grade: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "grade must be unique" },
        validate: {
          notEmpty: { msg: "grade is required" },
          notNull: { msg: "grade is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Grade",
    }
  );
  return Grade;
};
