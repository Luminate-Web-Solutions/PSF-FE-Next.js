import Razorpay from "razorpay";
import { pool } from "../config/db.js";
import crypto from "crypto";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a new payment order
const createOrder = async (req, res) => {
  try {
    // Get Auth0 user ID from token
    const sub = req.auth?.sub || req.auth?.payload?.sub;
    if (!sub) {
      return res.status(401).json({ message: "Invalid authentication token" });
    }

    // Look up the internal user ID
    const [users] = await pool.query(
      "SELECT id FROM users WHERE auth0_id = ?",
      [sub]
    );
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const userId = users[0].id;

    const { amount, currency, receipt, notes } = req.body;

    // Create order in Razorpay
    const options = {
      amount,
      currency,
      receipt,
      notes: {
        ...notes,
        userId,
      },
    };

    const order = await razorpay.orders.create(options);

    // Save order in our database
    await pool.query(
      `INSERT INTO orders (order_id, user_id, amount, currency, receipt, status, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        order.id,
        userId,
        order.amount / 100, // Convert from paise to rupees for storage
        order.currency,
        order.receipt,
        order.status,
        JSON.stringify(order.notes),
      ]
    );

    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get payment status
const getPaymentStatus = async (req, res) => {
  try {
    const userId = req.auth.sub; // Auth0 user ID from JWT token
    const { orderId } = req.params;

    const [orders] = await pool.query(
      "SELECT * FROM orders WHERE order_id = ? AND user_id = ?",
      [orderId, userId]
    );

    if (orders.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(orders[0]);
  } catch (error) {
    console.error("Error getting payment status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Webhook handler for Razorpay events
const handleWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];

    // Verify webhook signature
    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== signature) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    const event = req.body;

    // Handle different event types
    if (event.event === "payment.authorized") {
      const paymentId = event.payload.payment.entity.id;
      const orderId = event.payload.payment.entity.order_id;

      // Update order status
      await pool.query(
        `UPDATE orders SET 
         status = ?, 
         payment_id = ?, 
         updated_at = CURRENT_TIMESTAMP 
         WHERE order_id = ?`,
        ["paid", paymentId, orderId]
      );

      // Get user ID from order
      const [orders] = await pool.query(
        "SELECT user_id FROM orders WHERE order_id = ?",
        [orderId]
      );

      if (orders.length > 0) {
        // Update user role and payment status
        await pool.query(
          `UPDATE users SET 
           role = ?, 
           has_paid = ?, 
           updated_at = CURRENT_TIMESTAMP 
           WHERE auth0_id = ?`,
          ["individual member", true, orders[0].user_id]
        );
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { createOrder, getPaymentStatus, handleWebhook };
