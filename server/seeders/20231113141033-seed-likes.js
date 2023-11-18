"use strict";

/** @type {import('sequelize-cli').Migration} */
const fs = require("fs");
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = JSON.parse(fs.readFileSync("./data/likes.json", "utf8"));
    users.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Likes", users, {
      validate: true,
      individualHooks: true,
    });
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Likes", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
