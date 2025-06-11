const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Event = sequelize.define('Event', {
  name: {
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Event name cannot be empty'
      },
      len: {
        args: [3, 100],
        msg: 'Event name must be between 3 and 100 characters'
      }
    }
  },
  heroImage: {
    type: DataTypes.STRING,
    validate: {
      isUrl: {
        msg: 'Hero image must be a valid URL or file path'
      }
    }
  },
  subtitle1: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  subtitle2: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  description1: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  description2: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  images: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('images');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      // Validate maximum 15 images before saving
      if (Array.isArray(value) && value.length > 15) {
        throw new Error('Maximum 15 images allowed');
      }
      this.setDataValue('images', JSON.stringify(value));
    },
    validate: {
      validateImages(value) {
        if (value) {
          try {
            const images = JSON.parse(value);
            if (images.length > 15) {
              throw new Error('Maximum 15 images allowed');
            }
          } catch (e) {
            throw new Error('Invalid images format');
          }
        }
      }
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: {
        msg: 'Must be a valid date'
      },
      isAfter: {
        args: new Date().toISOString().split('T')[0],
        msg: 'Event date must be in the future'
      }
    }
  },
  time: {
    type: DataTypes.STRING,
    validate: {
      is: {
        args: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        msg: 'Time must be in HH:MM format'
      }
    }
  },
  status: {
    type: DataTypes.ENUM('upcoming', 'ongoing', 'completed'),
    defaultValue: 'upcoming',
    validate: {
      isIn: {
        args: [['upcoming', 'ongoing', 'completed']],
        msg: 'Status must be upcoming, ongoing, or completed'
      }
    }
  },
  category: {
    type: DataTypes.ENUM(
      'Continuous development program',
      'Personal enablement program',
      'Skills academy',
      'Social service',
      'Job & career guidance',
      'Organization'
    ),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Category cannot be empty'
      }
    }
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  paranoid: true,
  defaultScope: {
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt']
    }
  },
  hooks: {
    beforeValidate: (event) => {
      if (event.images && typeof event.images === 'string') {
        try {
          const images = JSON.parse(event.images);
          if (images.length > 15) {
            throw new Error('Maximum 15 images allowed');
          }
        } catch (e) {
          throw new Error('Invalid images format');
        }
      }
    }
  }
});

// Comment Model (anonymous comments)
const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Comment cannot be empty'
      },
      len: {
        args: [1, 1000],
        msg: 'Comment must be between 1 and 1000 characters'
      }
    }
  },
  commenterName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'Anonymous',
    validate: {
      len: {
        args: [1, 50],
        msg: 'Name must be between 1 and 50 characters'
      }
    }
  }
}, {
  timestamps: true,
  paranoid: true
});

// Define associations
Event.hasMany(Comment, {
  foreignKey: 'eventId',
  as: 'comments',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Event, {
  foreignKey: 'eventId',
  as: 'event'
});

module.exports = { Event, Comment };