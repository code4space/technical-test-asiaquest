"use strict";
const { hashPassword } = require("../helper/bycrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        fullName: "Dono",
        email: "dono@gmail.com",
        password: hashPassword("12345"),
      },
      {
        fullName: "Ritna",
        email: "Ritna@gmail.com",
        password: hashPassword("12345"),
      },
      {
        fullName: "Siska",
        email: "Siska@gmail.com",
        password: hashPassword("12345"),
      },
    ];
    data.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Teachers", data);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Teachers", null, []);
  },
};
