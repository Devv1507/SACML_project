'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        name: 'guest',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
