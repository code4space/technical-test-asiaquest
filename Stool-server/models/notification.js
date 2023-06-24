"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notification.belongsToMany(models.Student, { through: models.StudentNotification });
    }
  }
  Notification.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "description is required" },
          notNull: { msg: "description is required" },
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
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
