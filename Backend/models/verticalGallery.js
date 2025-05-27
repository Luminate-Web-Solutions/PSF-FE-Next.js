const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const VerticalGallery = sequelize.define('VerticalGallery', {
  images: {
    type: DataTypes.TEXT, // use TEXT to allow long JSON string
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('images');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('images', JSON.stringify(value));
    }
  },
}, {
  timestamps: true,
});

module.exports = VerticalGallery;
