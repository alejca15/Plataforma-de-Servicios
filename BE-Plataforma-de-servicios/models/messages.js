"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Messages extends Model {
    static associate(models) {
      this.belongsTo(models.Clients, { foreignKey: "client_id" });
      this.belongsTo(models.Providers, { foreignKey: "provider_id" });
    }
  }
  Messages.init(
    {
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
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
    },
    {
      sequelize,
      modelName: "Messages",
    }
  );
  return Messages;
};
