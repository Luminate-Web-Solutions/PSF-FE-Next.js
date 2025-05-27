const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js'); // Adjust the path as necessary

// Team model
const Team = sequelize.define("Team", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subTitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

// TeamMember model
const TeamMember = sequelize.define("TeamMember", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Define relationship
Team.hasMany(TeamMember);
TeamMember.belongsTo(Team);

module.exports = { Team, TeamMember };
