const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const testimonial = sequelize.define('testimonial', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = testimonial;
