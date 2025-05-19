// server/controllers/authController.js
import { pool } from "../config/db.js";
import { auth } from "express-oauth2-jwt-bearer";
import crypto from "crypto";

// Auth0 middleware
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: "RS256",
});

// Debug middleware to log token information
const logToken = (req, res, next) => {
  console.log("Auth headers:", req.headers.authorization);
  console.log("Auth object:", req.auth);
  next();
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    // Use req.auth.payload.sub instead of req.auth.sub
    const sub = req.auth?.sub || req.auth?.payload?.sub;
    if (!sub) {
      console.error("Invalid auth object:", req.auth);
      return res.status(401).json({ message: "Invalid authentication token" });
    }

    const userId = sub; // Auth0 user ID from JWT token
    console.log("Looking up user with Auth0 ID:", userId);

    const [users] = await pool.query("SELECT * FROM users WHERE auth0_id = ?", [
      userId,
    ]);

    if (users.length === 0) {
      console.log("User not found in database");
      return res.status(404).json({ message: "User not found" });
    }

    // Convert snake_case to camelCase for frontend
    const user = users[0];
    const formattedUser = {
      id: user.id,
      auth0Id: user.auth0_id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isEmailVerified: user.is_email_verified === 1,
      isPhoneVerified: user.is_phone_verified === 1,
      hasPaid: user.has_paid === 1,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };

    console.log("User found:", formattedUser);
    res.status(200).json(formattedUser);
  } catch (error) {
    console.error("Error getting user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new user
const createUser = async (req, res) => {
  try {
    // Use req.auth.payload.sub instead of req.auth.sub
    const sub = req.auth?.sub || req.auth?.payload?.sub;
    if (!sub) {
      console.error("Invalid auth object:", req.auth);
      return res.status(401).json({ message: "Invalid authentication token" });
    }

    // Use the Auth0 ID from the token, not from the request body
    const auth0Id = sub;
    const { name, email, role } = req.body;

    console.log("Creating new user:", { auth0Id, name, email, role });

    // Check if user already exists
    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE auth0_id = ? OR email = ?",
      [auth0Id, email]
    );

    if (existingUsers.length > 0) {
      console.log("User already exists");

      // Return the existing user instead of an error
      const user = existingUsers[0];
      const formattedUser = {
        id: user.id,
        auth0Id: user.auth0_id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isEmailVerified: user.is_email_verified === 1,
        isPhoneVerified: user.is_phone_verified === 1,
        hasPaid: user.has_paid === 1,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      };

      return res.status(200).json(formattedUser);
    }

    // Create new user
    const [result] = await pool.query(
      `INSERT INTO users (auth0_id, name, email, role, has_paid) 
       VALUES (?, ?, ?, ?, ?)`,
      [auth0Id, name, email, role || "pending", false]
    );

    console.log("User created with ID:", result.insertId);

    // Get the created user
    const [newUsers] = await pool.query("SELECT * FROM users WHERE id = ?", [
      result.insertId,
    ]);

    if (newUsers.length === 0) {
      return res.status(500).json({ message: "Error creating user" });
    }

    // Convert snake_case to camelCase for frontend
    const user = newUsers[0];
    const formattedUser = {
      id: user.id,
      auth0Id: user.auth0_id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isEmailVerified: user.is_email_verified === 1,
      isPhoneVerified: user.is_phone_verified === 1,
      hasPaid: user.has_paid === 1,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };

    res.status(201).json(formattedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify payment and update user role
const verifyPayment = async (req, res) => {
  try {
    // Use req.auth.payload.sub instead of req.auth.sub
    const sub = req.auth?.sub || req.auth?.payload?.sub;
    if (!sub) {
      console.error("Invalid auth object:", req.auth);
      return res.status(401).json({ message: "Invalid authentication token" });
    }

    const userId = sub; // Auth0 user ID from JWT token
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    // Verify payment signature with Razorpay
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // Update order status
    await pool.query(
      `UPDATE orders SET 
       status = ?, 
       payment_id = ?, 
       updated_at = CURRENT_TIMESTAMP 
       WHERE order_id = ?`,
      ["paid", razorpay_payment_id, razorpay_order_id]
    );

    // Update user role and payment status
    await pool.query(
      `UPDATE users SET 
       role = ?, 
       has_paid = ?, 
       updated_at = CURRENT_TIMESTAMP 
       WHERE auth0_id = ?`,
      ["individual member", true, userId]
    );

    // Get the updated user
    const [users] = await pool.query("SELECT * FROM users WHERE auth0_id = ?", [
      userId,
    ]);

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert snake_case to camelCase for frontend
    const user = users[0];
    const formattedUser = {
      id: user.id,
      auth0Id: user.auth0_id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isEmailVerified: user.is_email_verified === 1,
      isPhoneVerified: user.is_phone_verified === 1,
      hasPaid: user.has_paid === 1,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };

    res.status(200).json(formattedUser);
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { checkJwt, logToken, getUserProfile, createUser, verifyPayment };
