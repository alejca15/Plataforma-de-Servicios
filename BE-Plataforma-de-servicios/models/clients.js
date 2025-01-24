"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Clients extends Model {
    static associate(models) {
      this.hasMany(models.Users, { foreignKey: "client_id" });
    }
  }
  Clients.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      latitude: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "Clients",
    }
  );
  return Clients;
};
