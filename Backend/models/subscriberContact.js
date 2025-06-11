const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SubscriberContact = sequelize.define("SubscriberContact", {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  number: {
    type: DataTypes.STRING,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = SubscriberContact;
