'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users', // name of source model
      'city',
      {
        type: Sequelize.STRING, // allowNull = false, probably necessary for logic
        references: {
          model: 'Cities',
          key: 'name'
        },
        onDelete: 'CASCADE',
        onUptade: 'CASCADE',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Users',
      'city'
    )
  }
};