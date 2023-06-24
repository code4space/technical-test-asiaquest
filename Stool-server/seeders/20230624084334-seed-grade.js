'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {grade:'1'},
      {grade:'2'},
      {grade:'3'},
    ]
    data.forEach(el => {
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
    })
    await queryInterface.bulkInsert("Grades", data);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Grades", null, []);
  },
};
