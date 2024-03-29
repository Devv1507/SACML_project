'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users', // name of source model
      'email',
      {
        type: Sequelize.STRING,
        unique: true, // allowNull = false, probably necessary for logic
        references: {
          model: 'Accounts',
          key: 'email'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Users',
      'email'
    )
  }
};