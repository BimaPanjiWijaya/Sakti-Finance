"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Insights", "status", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Insights", "recommendation", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Insights", "status");
    await queryInterface.removeColumn("Insights", "recommendation");
  },
};
