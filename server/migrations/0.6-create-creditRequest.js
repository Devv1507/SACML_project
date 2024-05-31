'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CreditRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      job: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      credit_amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      duration: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      housing: {
        allowNull: false,
        type: Sequelize.STRING
      },
      savings_account: {
        allowNull: false,
        type: Sequelize.STRING
      },
      checking_account: {
        allowNull: false,
        type: Sequelize.STRING
      },
      purpose: {
        allowNull: false,
        type: Sequelize.STRING
      },
      creditHistory: {
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE' // important! this is the way of delete related registries
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'Pendiente'
      },
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
    await queryInterface.dropTable('CreditRequests');
  }
};