"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = bcrypt.hashSync("password123", 10);
    await queryInterface.bulkInsert("Users", [
      {
        name: "Bima Panji Wijaya",
        email: "bima@example.com",
        password: hashedPassword,
        salary: 5000000,
        location: "Jakarta",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
