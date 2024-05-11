'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cities', [
      {
        name: 'Cali',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Medellín',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bogotá',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Buga',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Privado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cities', null, {});
  },
};
