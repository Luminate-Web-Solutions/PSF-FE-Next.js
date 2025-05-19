import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "psf_membership",
  port: process.env.DB_PORT || 3306, // <-- Add this line
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Database connection handler
export const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL database connected");
    connection.release();

    // Initialize tables after connection
    await initDb();
  } catch (error) {
    console.error("Error connecting to MySQL database:", error.message);
    process.exit(1);
  }
};

// Database query wrapper
export const query = async (sql, params) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error("Database query error:", error.message);
    throw error;
  }
};

// Initialize database tables
const initDb = async () => {
  try {
    const connection = await pool.getConnection();

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        auth0_id VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20),
        role ENUM('admin', 'individual member', 'pending') DEFAULT 'pending',
        is_email_verified BOOLEAN DEFAULT FALSE,
        is_phone_verified BOOLEAN DEFAULT FALSE,
        has_paid BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create orders table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id VARCHAR(255) NOT NULL UNIQUE,
        user_id VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) NOT NULL,
        receipt VARCHAR(255),
        status ENUM('created', 'paid', 'failed') DEFAULT 'created',
        payment_id VARCHAR(255),
        notes JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    connection.release();
    console.log("Database tables initialized");
    return true;
  } catch (error) {
    console.error("Error initializing database tables:", error);
    return false;
  }
};

// Test connection function
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL database connected successfully");
    connection.release();
    return true;
  } catch (error) {
    console.error("MySQL connection error:", error);
    return false;
  }
};

// Export pool directly for special cases
export { pool };
