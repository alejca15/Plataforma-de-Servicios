"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Services extends Model {
    static associate(models) {
      this.belongsTo(models.Providers, { foreignKey: "provider_id" });
      this.hasMany(models.Requests, { foreignKey: "service_id" });
    }
  }
  Services.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      provider_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Providers",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Services",
    }
  );
  return Services;
};
