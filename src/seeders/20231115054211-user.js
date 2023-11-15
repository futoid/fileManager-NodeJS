"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "admin@admin.com",
          password: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "aliek@admin.com",
          password: "aliek",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "futoid@admin.com",
          password: "futoid",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
