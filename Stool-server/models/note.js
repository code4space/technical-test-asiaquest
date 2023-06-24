"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Note.belongsTo(models.Teacher);
      Note.belongsTo(models.Student);
    }
  }
  Note.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      description: {
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
      modelName: "Note",
    }
  );
  return Note;
};
