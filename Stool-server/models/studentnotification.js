"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StudentNotification.belongsTo(models.Notification, { foreignKey: "NotificationID" });
      StudentNotification.belongsTo(models.Student, { foreignKey: "StudentID" });
    }
  }
  StudentNotification.init(
    {
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: { msg: "status is required" },
          notNull: { msg: "status is required" },
        },
      },
      NotificationID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "NotificationID is required" },
          notNull: { msg: "NotificationID is required" },
        },
      },
      StudentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "StudentID is required" },
          notNull: { msg: "StudentID is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "StudentNotification",
    }
  );
  return StudentNotification;
};
