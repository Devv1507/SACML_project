'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'CreditRequests', // name of source model
      'userId',
      {
        type: Sequelize.INTEGER, // allowNull = false, probably necessary for logic
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE' // important! this is the way of delete related registries
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'CreditRequests',
      'userId'
    )
  }
};