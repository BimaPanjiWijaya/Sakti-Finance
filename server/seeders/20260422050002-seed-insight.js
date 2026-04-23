"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Insights", [
      {
        start_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        end_date: new Date(),
        summary: "Good spending habit this month",
        spending_score: 85,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Insights", null, {});
  },
};
