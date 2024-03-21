'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users', // name of source model
      'roleId',
      {
        type: Sequelize.INTEGER, // allowNull = false, probably necessary for logic
        references: {
          model: 'Roles',
          key: 'id'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Users',
      'roleId'
    )
  }
};