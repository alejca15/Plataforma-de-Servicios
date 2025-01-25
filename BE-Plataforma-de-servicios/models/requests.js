"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Requests extends Model {
    static associate(models) {
      this.belongsTo(models.Services, { foreignKey: "service_id" });
    }
  }
  Requests.init(
    {
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Services",
          key: "id",
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
     initial_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      final_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      state:{
        type:DataTypes.STRING,
        allowNull:false
      }
    },
    {
      sequelize,
      modelName: "Requests",
    }
  );
  return Requests;
};
