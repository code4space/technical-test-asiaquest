"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.Teacher);
      Todo.belongsTo(models.Student);
    }
  }
  Todo.init(
    {
      task: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      comment: {
        type: DataTypes.TEXT,
      },
      StudentId: {
        type: DataTypes.INTEGER,
      },
      TeacherId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
