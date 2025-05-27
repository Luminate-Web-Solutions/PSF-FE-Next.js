const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Testimonial = require('../models/testimonials');

// Ensure uploads folder exists
const uploadDir = 'uploads/testimonials';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// POST - Add new testimonial with avatar upload
router.post('/', upload.single('avatar'), async (req, res) => {
  try {
    const { name, emailId, title, content } = req.body;
    const avatar = req.file ? `/uploads/testimonials/${req.file.filename}` : null;

    const newTestimonial = await Testimonial.create({ name, emailId, avatar, title, content });
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET - Get all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a testimonial by emailId
router.delete('/:emailId', async (req, res) => {
  try {
    const { emailId } = req.params;
    const deleted = await Testimonial.destroy({ where: { emailId } });
    if (deleted) {
      res.status(200).json({ message: 'Testimonial deleted successfully' });
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
