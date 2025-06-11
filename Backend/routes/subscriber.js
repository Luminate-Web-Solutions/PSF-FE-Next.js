const express = require("express");
const nodemailer = require("nodemailer");
const SubscriberContact = require("../models/subscriberContact");
const SubscriberNews = require("../models/subscriberNews");
const router = express.Router();

// POST /api/subscribe/contact
router.post("/contact", async (req, res) => {
  const { name, email, number, message } = req.body;

  try {
    const newContact = await SubscriberContact.create({ name, email, number, message });

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting us",
      text: `Hello ${name},\n\nThank you for reaching out to us. We have received your message:\n\n"${message}"\n\nWe will get back to you shortly.\n\nBest regards,\nPSF Team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// POST /api/subscribe/news
router.post("/news", async (req, res) => {
  const { email } = req.body;

  try {
    const newSubscriber = await SubscriberNews.create({ email });

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for subscribing to our newsletter",
      text: `Hello,\n\nThank you for subscribing to our newsletter. You will receive the latest updates and news from PSF.\n\nBest regards,\nPSF Team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(newSubscriber);
  } catch (error) {
    console.error("Error creating news subscriber:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/subscribe/news
router.get("/news", async (req, res) => {
  try {
    const subscribers = await SubscriberNews.findAll();
    res.status(200).json(subscribers);
  } catch (error) {
    console.error("Error fetching news subscribers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/subscribe/contact
router.get("/contact", async (req, res) => {
  try {
    const contacts = await SubscriberContact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contact subscribers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;