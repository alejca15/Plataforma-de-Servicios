"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Providers extends Model {
    static associate(models) {
      this.hasMany(models.Users, { foreignKey: "provider_id" });
      this.hasMany(models.Messages, { foreignKey: "provider_id" });
      this.hasMany(models.Services, { foreignKey: "provider_id" });
    }
  }
  Providers.init(
    {
      name: {
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
      modelName: "Providers",
    }
  );
  return Providers;
};
