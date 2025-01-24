"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Users extends Model {
    static associate(models) {
      this.belongsTo(models.Providers, { foreignKey: "provider_id" });
      this.belongsTo(models.Clients, { foreignKey: "client_id" });
    }
  }
  Users.init(
    {
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rol: {
        type: DataTypes.STRING,
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
      modelName: "Users",
    }
  );
  return Users;
};
