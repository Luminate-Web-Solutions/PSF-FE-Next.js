const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js'); // Adjust the path as necessary

const Event = sequelize.define('Event', {
  name: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  heroImage: {
    type: DataTypes.STRING,
  },
  subtitle1: {
    type: DataTypes.STRING,
  },
  subtitle2: {
    type: DataTypes.STRING,
  },
  description1: {
    type: DataTypes.TEXT,
  },
  description2: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATEONLY,
  },
  time: {
    type: DataTypes.STRING, // or DataTypes.TIME if you want stricter format
  },
  status: {
    type: DataTypes.ENUM('upcoming', 'ongoing', 'completed'),
    defaultValue: 'upcoming',
  },
  
});

module.exports = Event;
