'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Cities', // name of source model
      'departmentId',
      {
        type: Sequelize.INTEGER, // allowNull = false, probably necessary for logic
        references: {
          model: 'Departments',
          key: 'id'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Cities',
      'departmentId'
    )
  }
};