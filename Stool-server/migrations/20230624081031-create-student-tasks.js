'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StudentTasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      answer: {
        type: Sequelize.TEXT
      },
      answer1: {
        type: Sequelize.BLOB
      },
      comment: {
        type: Sequelize.TEXT
      },
      TaskId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tasks",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      StudentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Students",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StudentTasks');
  }
};