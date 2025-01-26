"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Clients extends Model {
    static associate(models) {
      this.hasMany(models.Users, { foreignKey: "client_id" });
      this.hasMany(models.Messages, { foreignKey: "client_id" });
      this.hasMany(models.Requests, { foreignKey: "client_id" });
      this.hasMany(models.Contracts_by_provider, { foreignKey: "client_id" });
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
    },
    {
      sequelize,
      modelName: "Clients",
    }
  );
  return Clients;
};
