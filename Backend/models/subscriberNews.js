const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SubscriberNews = sequelize.define("SubscriberNews", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = SubscriberNews;
