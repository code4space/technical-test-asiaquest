'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentTasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudentTasks.init({
    status: DataTypes.STRING,
    answer: DataTypes.STRING,
    answer1: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'StudentTasks',
  });
  return StudentTasks;
};