const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as necessary

const Newsletter = sequelize.define("Newsletter", {
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  file: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Newsletter;
