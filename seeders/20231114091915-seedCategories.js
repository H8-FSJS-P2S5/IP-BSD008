"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        name: "Eta",
        code: "B.1.525",
        description:
          "pertama kali dideteksi di beberapa negara diantaranya Inggris dan Nigeria pada Desember 2020",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Theta",
        code: "P.3",
        description: "dideteksi pertama kali di Filipina pada Januari 2021",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lota",
        code: "B.1.526",
        description:
          "dideteksi pertama kali di Amerika Serikat pada November 2020",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kappa",
        code: "B.1.617",
        description: "dideteksi pertama kali di India pada Oktober 2020",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lambda",
        code: "C.37",
        description: "dideteksi pertama kali di Peru pada Desember 2020",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mu",
        code: "B.1.621",
        description: "dideteksi pertama kali di Kolombia pada Januari 2021",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Alpha",
        code: "B.1.1.7",
        description:
          "varian ini pertama kali dideteksi menyebar secara luas di Inggris pada September 2020",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Beta",
        code: "B.1.31",
        description:
          "varian ini pertama kali dideteksi di Afrika Selatan pada Mei 2020",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gamma",
        code: "P.1",
        description:
          "varian ini pertama kali dideteksi di Brasil pada November 2020",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Delta",
        code: "B.1.617.2",
        description:
          "varian ini pertama kali dideteksi di India pada Oktober 2020",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Omicron",
        code: "B.1.1.529",
        description:
          "varian ini pertama kali dideteksi di Afrika Selatan pada November 2021",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Categories", data, {});
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
    await queryInterface.bulkDelete("Categories", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
