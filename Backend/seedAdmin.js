require('dotenv').config();
const bcrypt = require('bcrypt');
const sequelize = require('./config/db');
const User = require('./models/User');

async function createAdminUser() {
  try {
    await sequelize.sync(); // Ensure tables exist

    const existingAdmin = await User.findOne({
      where: { emailId: process.env.ADMIN_EMAIL },
    });

    if (existingAdmin) {
      console.log('Admin already exists.');
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const admin = await User.create({
      name: process.env.ADMIN_NAME || 'Admin User',
      emailId: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin user created:', admin.emailId);
  } catch (err) {
    console.error('Error creating admin:', err.message);
  } finally {
    await sequelize.close();
  }
}

createAdminUser();
