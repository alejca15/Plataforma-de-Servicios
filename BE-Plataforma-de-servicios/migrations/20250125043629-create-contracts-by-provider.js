'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contracts_by_providers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      provider_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: "Providers",
          key: "id",
        },
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: "Clients",
          key: "id",
        },
      },
      request_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: "Requests",
          key: "id",
        },
      },
      initial_date: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      final_date: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contracts_by_providers');
  }
};