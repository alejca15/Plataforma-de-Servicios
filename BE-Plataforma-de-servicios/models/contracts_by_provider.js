"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Contracs_by_provider extends Model {
    static associate(models) {
      this.belongsTo(models.Providers, { foreignKey: "provider_id" });
      this.belongsTo(models.Clients, { foreignKey: "client_id" });
      this.belongsTo(models.Requests, { foreignKey: "request_id" });
    }
  }
  Contracs_by_provider.init(
    {
      provider_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Providers",
          key: "id",
        },
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Clients",
          key: "id",
        },
      },
      request_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Clients",
          key: "id",
        },
      },
      initial_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      final_date:{
        type:DataTypes.DATE,
        allowNull:false
      }
    },
    {
      sequelize,
      modelName: "Contracs_by_provider",
    }
  );
  return Contracs_by_provider;
};
