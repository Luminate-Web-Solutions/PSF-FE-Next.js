const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as necessary

const President = sequelize.define("President", {
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description1: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description2: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description3: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description4: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = President;
