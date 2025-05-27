const { DataTypes } =require('sequelize');
const sequelize =require('../config/db.js'); // Adjust the path as necessary

const Verticals = sequelize.define(
  'Verticals',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
    subtitle2: {
      type: DataTypes.STRING,
    },
    description2: {
      type: DataTypes.STRING,
    },
    image3: {
      type: DataTypes.STRING,
    },
    subtitle3: {
      type: DataTypes.STRING,
    },
    description3: {
      type: DataTypes.STRING,
    },
    image4: {
      type: DataTypes.STRING,
    },
    subtitle4: {
      type: DataTypes.STRING,
    },
    description4: {
      type: DataTypes.STRING,
    },
    image5: {
      type: DataTypes.STRING,
    },
    subtitle5: {
      type: DataTypes.STRING,
    },
    description5: {
      type: DataTypes.STRING,
    },
  }
);

module.exports = Verticals; 
