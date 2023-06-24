"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Routine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Routine.belongsTo(models.Teacher);
      Routine.belongsTo(models.Student);
    }
  }
  Routine.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      list: {
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
      modelName: "Routine",
    }
  );
  return Routine;
};
