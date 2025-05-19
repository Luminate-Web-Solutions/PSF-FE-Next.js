import { query } from '../config/db.js';

export const createRsvpTable = async () => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS event_rsvps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        event_id INT NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        status ENUM('confirmed', 'cancelled', 'attended') DEFAULT 'confirmed',
        feedback_provided BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_rsvp (event_id, user_id),
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
      )
    `);
    
    console.log('RSVP table created successfully');
    return true;
  } catch (error) {
    console.error('Error creating RSVP table:', error);
    throw error;
  }
};

export const createFeedbackTable = async () => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS event_feedback (
        id INT AUTO_INCREMENT PRIMARY KEY,
        event_id INT NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
        comments TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_feedback (event_id, user_id),
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
      )
    `);
    
    console.log('Feedback table created successfully');
    return true;
  } catch (error) {
    console.error('Error creating feedback table:', error);
    throw error;
  }
};