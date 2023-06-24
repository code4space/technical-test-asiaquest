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
      StudentNotification.belongsTo(models.Notification, { foreignKey: "NotificationId" });
      StudentNotification.belongsTo(models.Student, { foreignKey: "StudentId" });
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
      NotificationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "NotificationId is required" },
          notNull: { msg: "NotificationId is required" },
        },
      },
      StudentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "StudentId is required" },
          notNull: { msg: "StudentId is required" },
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
