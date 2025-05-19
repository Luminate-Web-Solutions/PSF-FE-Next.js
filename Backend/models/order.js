const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  receipt: {
    type: String,
  },
  status: {
    type: String,
    enum: ["created", "paid", "failed"],
    default: "created",
  },
  paymentId: {
    type: String,
  },
  notes: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Order", orderSchema)
