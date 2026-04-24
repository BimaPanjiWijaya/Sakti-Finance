"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Insight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Insight.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Insight.init(
    {
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Start date is required",
          },
          notNull: {
            msg: "Start date is required",
          },
        },
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "End date is required",
          },
          notNull: {
            msg: "End date is required",
          },
        },
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      spending_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Spending score is required",
          },
          notNull: {
            msg: "Spending score is required",
          },
        },
      },
      status: DataTypes.STRING,
      recommendation: DataTypes.TEXT,
      user_id: {
        type: DataTypes.INTEGER,

        allowNull: false,
        validate: {
          notEmpty: {
            msg: "User ID is required",
          },
          notNull: {
            msg: "User ID is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Insight",
    },
  );
  return Insight;
};
