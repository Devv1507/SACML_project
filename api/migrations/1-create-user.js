'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      surname: {
        type: Sequelize.STRING(20)
      },
      address: {
        type: Sequelize.STRING(20)
      },
      phone: {
        type: Sequelize.STRING(10)
      },
/*       email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(20)
      }, */
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};