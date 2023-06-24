'use strict';
const { hashPassword } = require("../helper/bycrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {fullName: 'William Wijaya', email: 'William@gmail.com', password: hashPassword('12345'), GradeId: 3},
      {fullName: 'Eko Jo', email: 'Eko@gmail.com', password: hashPassword('12345'), GradeId: 2},
      {fullName: 'Bambang Gaya', email: 'Bambang@gmail.com', password: hashPassword('12345'), GradeId: 3},
    ]
    data.forEach(el => {
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
    })
    await queryInterface.bulkInsert("Students", data);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Students", null, []);
  },
};
