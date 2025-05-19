import { query } from './db.js';
import { createRsvpTable, createFeedbackTable } from '../models/event-rsvp.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const initializeDatabase = async () => {
  try {
    // Create users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        auth0_id VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20),
        role ENUM('admin', 'member') DEFAULT 'member',
        is_email_verified BOOLEAN DEFAULT false,
        is_phone_verified BOOLEAN DEFAULT false,
        phone_verification_code VARCHAR(6),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create events table
    await query(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        date DATE NOT NULL,
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create RSVP and feedback tables
    await createRsvpTable();
    await createFeedbackTable();

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database tables:', error.message);
    process.exit(1);
  }
};

// Run this script to initialize the database
initializeDatabase();